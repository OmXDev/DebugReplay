
---

````markdown
# 🔍 Debug Replay Middleware

**`debug-replay-middleware`** is an Express middleware that automatically logs HTTP request and response data to the [DebugReplay Dashboard](https://debug-replay.vercel.app). It allows developers to easily inspect, search, and monitor API behavior in real time — with **zero config**.

---

## ✨ Features

- ✅ Plug-and-play Express middleware
- 🔎 Captures request and response data (body, headers, status, duration)
- 🔐 No project key or auth required
- 📊 Searchable logs in your private dashboard
- 🖥️ Hosted dashboard: [debug-replay.vercel.app](https://debug-replay.vercel.app)

---

## 📦 Installation

```bash
npm install debug-replay-middleware
````

---

## 🧠 Quick Usage

```ts
import express from 'express';
import debugReplay from 'debug-replay-middleware';

const app = express();

app.use(express.json());
app.use(debugReplay()); // Add this before your routes

app.get('/', (req, res) => {
  res.send({ message: 'Hello from DebugReplay!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

✅ **That's it!** Logs will appear on your dashboard:
🌐 [https://debug-replay.vercel.app](https://debug-replay.vercel.app)

---

## 🧩 How It Works

Once added, the middleware:

* Captures HTTP request & response data
* Tracks execution duration
* Sends log data to the DebugReplay backend
* Displays logs in a web dashboard — no setup or keys needed

---

## 🏗️ Monorepo Project Structure

This project is organized as a monorepo with the following folders:

### `/Frontend` – Next.js App

* Written in TypeScript
* Used for dashboard UI
* **Install**: `npm install`
* **Build**: `npm run build`
* **Env**: `BACKEND_URL` (URL to backend)

### `/Backend` – Express + Prisma + Supabase

* Written in TypeScript

* Logs incoming requests

* **Install & Build**:

  ```bash
  npm install && npx prisma generate --schema=src/prisma/schema.prisma && npx tsc
  ```

* **Start**:

  ```bash
  node dist/index.js
  ```

* **Env**:

  ```env
  DATABASE_URL=your_supabase_postgres_url
  FRONTEND_URL=https://debug-replay.vercel.app
  ```

---

## 📤 Logging Destination

Logs are sent to:

> 🔗 [https://debug-replay.vercel.app](https://debug-replay.vercel.app)

Where you can:

* Search logs by method, URL, status
* Inspect request/response payloads
* View real-time activity

---

## 🧪 Example Log Payload

```json
{
  "method": "POST",
  "url": "/api/users",
  "statusCode": 201,
  "requestBody": { "name": "John" },
  "responseBody": { "id": 1, "name": "John" },
  "headers": { ... },
  "duration": 42
}
```

---

## 🔐 Environment Variables

### Backend

```env
DATABASE_URL=your_supabase_postgres_url
FRONTEND_URL=https://debug-replay.vercel.app
```

### Frontend

```env
BACKEND_URL=https://your-backend-url.onrender.com
```

---

## 🛠 Built With

* ⚙️ Node.js + Express
* 🌐 Next.js + React
* 📦 Prisma ORM
* 🧱 Supabase (PostgreSQL)
* ☁️ Deployed on Render & Vercel
* 🧑‍💻 TypeScript end-to-end

---

## 📜 License

**MIT** – Free to use, modify, and distribute.

---

## 🤝 Contributing

Pull requests and ideas are welcome!
Open an issue or PR at [GitHub](https://github.com/OmXDev/DebugReplay).

---

## 🔗 Useful Links

* 📦 NPM: [npmjs.com/package/debug-replay-middleware](https://www.npmjs.com/package/debug-replay-middleware)
* 🖥️ Dashboard: [debug-replay.vercel.app](https://debug-replay.vercel.app)
* 📁 Source Code: [github.com/OmXDev/DebugReplay](https://github.com/OmXDev/DebugReplay)

```

---
