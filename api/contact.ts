import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      
      const newMessage = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      // Store message in a KV list
      await kv.lpush('portfolio_messages', newMessage);
      
      // SEND EMAIL via Resend
      // I am using your API key from the environment variable RESEND_API_KEY
      if (process.env.RESEND_API_KEY) {
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
                  <h2 style="color: #007acc;">New Contact Form Submission</h2>
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

      console.log(`Contact form submission from ${name} (${email})`);
      
      return res.status(200).json({ 
        success: true, 
        message: "Message received. Sumit will get back to you soon!" 
      });
    } catch (error) {
      console.error('KV Error:', error);
      return res.status(500).json({ error: "Failed to save message" });
    }
  }
  res.status(405).json({ error: "Method not allowed" });
}
