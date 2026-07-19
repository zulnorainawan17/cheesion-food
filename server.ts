import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Paths to our persistent JSON files in src directory
const MENU_FILE_PATH = path.join(process.cwd(), 'src', 'menu_items.json');
const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'src', 'categories.json');
const CONFIG_FILE_PATH = path.join(process.cwd(), 'src', 'restaurant_config.json');

// jsonblob.com IDs for multi-device sync
const MENU_PART1_BLOB_ID = '019f79c9-23e6-7a6c-8d32-10c8dfb49b2c';
const MENU_PART2_BLOB_ID = '019f79c9-256f-74d8-a4ae-9c561a265c03';
const CATEGORIES_BLOB_ID = '019f79c8-4f45-7843-b6f3-9dd630d78fed';
const CONFIG_BLOB_ID = '019f79c8-429e-7c80-959e-ee9a693a5863';

// Helper to load remote data with local file fallback
async function loadData(key: string, localFilePath: string) {
  try {
    if (key === 'menu') {
      const [res1, res2] = await Promise.all([
        fetch(`https://jsonblob.com/api/jsonBlob/${MENU_PART1_BLOB_ID}`),
        fetch(`https://jsonblob.com/api/jsonBlob/${MENU_PART2_BLOB_ID}`)
      ]);
      if (res1.ok && res2.ok) {
        const part1 = await res1.json();
        const part2 = await res2.json();
        if (Array.isArray(part1) && Array.isArray(part2)) {
          const combined = [...part1, ...part2];
          // Save locally to keep in sync
          try {
            fs.writeFileSync(localFilePath, JSON.stringify(combined, null, 2), 'utf-8');
          } catch (err) {
            console.error(`Failed to write local backup for ${key}:`, err);
          }
          return combined;
        }
      }
    } else if (key === 'categories') {
      const res = await fetch(`https://jsonblob.com/api/jsonBlob/${CATEGORIES_BLOB_ID}`);
      if (res.ok) {
        const parsed = await res.json();
        if (Array.isArray(parsed)) {
          try {
            fs.writeFileSync(localFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
          } catch (err) {
            console.error(`Failed to write local backup for ${key}:`, err);
          }
          return parsed;
        }
      }
    } else if (key === 'config') {
      const res = await fetch(`https://jsonblob.com/api/jsonBlob/${CONFIG_BLOB_ID}`);
      if (res.ok) {
        const parsed = await res.json();
        if (parsed && typeof parsed === 'object') {
          try {
            fs.writeFileSync(localFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
          } catch (err) {
            console.error(`Failed to write local backup for ${key}:`, err);
          }
          return parsed;
        }
      }
    }
  } catch (error) {
    console.error(`Failed to fetch ${key} from remote jsonblob:`, error);
  }

  // Fallback to local file if remote is unavailable or empty
  try {
    if (fs.existsSync(localFilePath)) {
      const data = fs.readFileSync(localFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Failed to read local fallback for ${key}:`, error);
  }
  return null;
}

// Helper to save remote data and local file
async function saveData(key: string, data: any, localFilePath: string) {
  // 1. Write locally first to ensure quick feedback/fallback
  try {
    fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to write local file for ${key}:`, error);
  }

  // 2. Write to remote jsonblob for permanent multi-device sync
  try {
    if (key === 'menu' && Array.isArray(data)) {
      const half = Math.ceil(data.length / 2);
      const part1 = data.slice(0, half);
      const part2 = data.slice(half);

      await Promise.all([
        fetch(`https://jsonblob.com/api/jsonBlob/${MENU_PART1_BLOB_ID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(part1)
        }),
        fetch(`https://jsonblob.com/api/jsonBlob/${MENU_PART2_BLOB_ID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(part2)
        })
      ]);
    } else if (key === 'categories') {
      await fetch(`https://jsonblob.com/api/jsonBlob/${CATEGORIES_BLOB_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else if (key === 'config') {
      await fetch(`https://jsonblob.com/api/jsonBlob/${CONFIG_BLOB_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
  } catch (error) {
    console.error(`Failed to push ${key} to remote jsonblob:`, error);
  }
}

// --- Real-Time Update Subscription (SSE) ---
let clients: express.Response[] = [];

app.get('/api/updates', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // Initial connection confirm
  res.write('data: {"type":"ping"}\n\n');

  clients.push(res);

  const pingInterval = setInterval(() => {
    try {
      res.write('data: {"type":"ping"}\n\n');
    } catch (err) {
      // ignore
    }
  }, 30000);

  req.on('close', () => {
    clearInterval(pingInterval);
    clients = clients.filter(c => c !== res);
  });
});

function broadcast(type: string, data: any) {
  const payload = JSON.stringify({ type, data });
  clients.forEach(client => {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch (err) {
      // ignore
    }
  });
}

// --- API Routes ---
app.get('/api/menu', async (req, res) => {
  const data = await loadData('menu', MENU_FILE_PATH);
  if (data) {
    return res.json(data);
  }
  return res.status(404).json({ error: 'Menu data not found' });
});

app.post('/api/menu', async (req, res) => {
  try {
    const menuItems = req.body;
    if (!Array.isArray(menuItems)) {
      return res.status(400).json({ error: 'Invalid menu items' });
    }
    await saveData('menu', menuItems, MENU_FILE_PATH);
    broadcast('menu', menuItems);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save menu items' });
  }
});

app.get('/api/categories', async (req, res) => {
  const data = await loadData('categories', CATEGORIES_FILE_PATH);
  if (data) {
    return res.json(data);
  }
  return res.status(404).json({ error: 'Categories data not found' });
});

app.post('/api/categories', async (req, res) => {
  try {
    const categories = req.body;
    if (!Array.isArray(categories)) {
      return res.status(400).json({ error: 'Invalid categories' });
    }
    await saveData('categories', categories, CATEGORIES_FILE_PATH);
    broadcast('categories', categories);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save categories' });
  }
});

app.get('/api/config', async (req, res) => {
  const data = await loadData('config', CONFIG_FILE_PATH);
  if (data) {
    return res.json(data);
  }
  return res.status(404).json({ error: 'Config data not found' });
});

app.post('/api/config', async (req, res) => {
  try {
    const config = req.body;
    await saveData('config', config, CONFIG_FILE_PATH);
    broadcast('config', config);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save config' });
  }
});

// Vite middleware setup
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
