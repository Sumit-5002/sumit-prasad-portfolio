import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  const STATS_FILE = path.join(process.cwd(), "stats.json");

  // Initialize stats file if it doesn't exist
  try {
    await fs.access(STATS_FILE);
  } catch {
    await fs.writeFile(STATS_FILE, JSON.stringify({ visits: 0, commands: [], locations: {} }));
  }

  // API Routes
  app.get("/api/stats", async (req, res) => {
    try {
      const statsExist = await fs.access(STATS_FILE).then(() => true).catch(() => false);
      if (!statsExist) {
        await fs.writeFile(STATS_FILE, JSON.stringify({ visits: 0, commands: [], locations: {} }));
      }
      const raw = await fs.readFile(STATS_FILE, "utf-8");
      const data = JSON.parse(raw || '{"visits":0,"commands":[],"locations":{}}');
      res.json(data);
    } catch (error) {
      console.error("Stats API error:", error);
      res.status(500).json({ error: "Failed to read stats" });
    }
  });

  app.post("/api/visit", async (req, res) => {
    try {
      const data = JSON.parse(await fs.readFile(STATS_FILE, "utf-8"));
      data.visits += 1;
      
      // Basic location tagging (mocking for simplicity)
      const mockLocations = ["US", "IN", "UK", "DE", "CA", "FR"];
      const loc = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      data.locations[loc] = (data.locations[loc] || 0) + 1;

      await fs.writeFile(STATS_FILE, JSON.stringify(data, null, 2));
      res.json({ success: true, visits: data.visits });
    } catch (error) {
      console.error("Visit tracker error:", error);
      res.status(500).json({ error: "Failed to update stats" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const MESSAGES_FILE = path.join(process.cwd(), "messages.json");
      let messages = [];
      try {
        messages = JSON.parse(await fs.readFile(MESSAGES_FILE, "utf-8"));
      } catch {
        messages = [];
      }
      messages.push({ ...req.body, timestamp: new Date().toISOString() });
      await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

      // SEND EMAIL via Resend (Local Dev)
      if (process.env.RESEND_API_KEY) {
        const { name, email, message } = req.body;
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Portfolio <onboarding@resend.dev>',
              to: 'sumitboy2005@gmail.com',
              subject: `Portfolio Message from ${name}`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #007acc;">New Contact Form Submission (Local)</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message}</p>
                </div>
              `
            })
          });
        } catch (mailError) {
          console.error('Email Error:', mailError);
        }
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Read index.html
        let template = await fs.readFile(path.join(process.cwd(), "index.html"), "utf-8");
        // Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);
        // Send the transformed HTML
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
