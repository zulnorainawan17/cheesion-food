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

// Remote KVDB setup for permanent persistence
const BUCKET_ID = 'kv_chession_0295768f_e443_440a_90fd_6b875f8426ae';
const KVDB_BASE_URL = `https://kvdb.io/${BUCKET_ID}`;

// Helper to load remote data with local file fallback
async function loadData(key: string, localFilePath: string) {
  try {
    const res = await fetch(`${KVDB_BASE_URL}/${key}`);
    if (res.ok) {
      const text = await res.text();
      if (text && (text.trim().startsWith('[') || text.trim().startsWith('{'))) {
        const parsed = JSON.parse(text);
        // Save locally to keep in sync
        try {
          fs.writeFileSync(localFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
        } catch (err) {
          console.error(`Failed to write local backup for ${key}:`, err);
        }
        return parsed;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch ${key} from remote KVDB:`, error);
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
  // 1. Write locally first
  try {
    fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Failed to write local file for ${key}:`, error);
  }

  // 2. Write to remote KVDB for permanent multi-device sync
  try {
    await fetch(`${KVDB_BASE_URL}/${key}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Failed to push ${key} to remote KVDB:`, error);
  }
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
