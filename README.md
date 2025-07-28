# 🔍 Debug Replay Middleware

**debug-replay-middleware** is an Express middleware that automatically logs HTTP request and response data to the [DebugReplay Dashboard](https://debug-replay.vercel.app/) — enabling developers to easily inspect, search, and monitor API behavior in real-time.

---

## 🚀 Features

- 📦 Plug-and-play Express middleware  
- 📄 Captures request/response data  
- 🕵️ Powerful search and filtering in dashboard  
- 🔐 No setup or API key needed  
- 🖥 View logs on: [https://debug-replay.vercel.app](https://debug-replay.vercel.app)

---

## 📦 Installation

```bash
npm install debug-replay-middleware
🧠 Usage
In your Express app (using TypeScript or JavaScript):

ts
Copy
Edit
import express from 'express';
import debugReplay from 'debug-replay-middleware';

const app = express();

// Use the middleware (should be above your routes)
app.use(debugReplay());

// Your routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello from DebugReplay!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
✅ That's it! All logs will automatically be captured and shown at debug-replay.vercel.app

🔧 How It Works
When added, this middleware:

Captures request method, URL, status, headers, body, and response

Measures duration of each API call

Sends logs automatically to the backend for DebugReplay

Requires no configuration or project key

🧱 Monorepo Structure
This project is built using a monorepo layout with the following folders:

/Frontend – Built in Next.js
TypeScript support

Build: npm run build

Install: npm install

Environment Variable: BACKEND_URL

/Backend – Express + Prisma + Supabase
TypeScript + Prisma setup

Build:

bash
Copy
Edit
npm install && npx prisma generate --schema=src/prisma/schema.prisma && npx tsc
Start:

bash
Copy
Edit
node dist/index.js
Environment Variables:

DATABASE_URL (PostgreSQL via Supabase)

FRONTEND_URL

📡 Logging Destination
All logs are sent to:
🌐 https://debug-replay.vercel.app

From there, users can:

View full request and response payloads

Filter logs by URL, status code, method, etc.

Monitor API behavior in real time

🧪 Example Log Captured
json
Copy
Edit
{
  "method": "POST",
  "url": "/api/users",
  "statusCode": 201,
  "requestBody": { "name": "John" },
  "responseBody": { "id": 1, "name": "John" },
  "headers": { ... },
  "duration": 42
}
🔐 Environment Variables (Backend)
env
Copy
Edit
DATABASE_URL=your_supabase_postgres_url
FRONTEND_URL=https://debug-replay.vercel.app
🔐 Environment Variables (Frontend)
env
Copy
Edit
BACKEND_URL=https://your-backend-url.onrender.com
🛠 Built With
⚙️ Node.js + Express

🌐 Next.js + React

📦 Prisma ORM

🧱 Supabase (PostgreSQL)

☁️ Deployed on Render & Vercel

🧑‍💻 TypeScript everywhere

📃 License
MIT – Free to use, modify, and distribute.

📫 Contributing
Pull requests, feedback, and ideas are welcome. Please open an issue or PR on GitHub.

🔗 Links
🔍 Middleware: npmjs.com/package/debug-replay-middleware

💻 Dashboard: debug-replay.vercel.app

📁 Repo: github.com/OmXDev/DebugReplay

yaml
Copy
Edit
