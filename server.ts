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

// --- API Routes ---
app.get('/api/menu', (req, res) => {
  try {
    if (fs.existsSync(MENU_FILE_PATH)) {
      const data = fs.readFileSync(MENU_FILE_PATH, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.status(404).json({ error: 'Menu file not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read menu file' });
  }
});

app.post('/api/menu', (req, res) => {
  try {
    const menuItems = req.body;
    if (!Array.isArray(menuItems)) {
      return res.status(400).json({ error: 'Invalid menu items' });
    }
    fs.writeFileSync(MENU_FILE_PATH, JSON.stringify(menuItems, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save menu items' });
  }
});

app.get('/api/categories', (req, res) => {
  try {
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const data = fs.readFileSync(CATEGORIES_FILE_PATH, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.status(404).json({ error: 'Categories file not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read categories file' });
  }
});

app.post('/api/categories', (req, res) => {
  try {
    const categories = req.body;
    if (!Array.isArray(categories)) {
      return res.status(400).json({ error: 'Invalid categories' });
    }
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save categories' });
  }
});

app.get('/api/config', (req, res) => {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      return res.json(JSON.parse(data));
    }
    return res.status(404).json({ error: 'Config file not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to read config file' });
  }
});

app.post('/api/config', (req, res) => {
  try {
    const config = req.body;
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
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
