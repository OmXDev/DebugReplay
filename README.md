
# 🔍 Debug Replay Middleware

**`debug-replay-middleware`** is an Express middleware that automatically logs HTTP request and response data to the [DebugReplay Dashboard](https://debug-replay.vercel.app). It allows developers to easily inspect, search, and monitor API behavior in real-time — with **zero config**.

---

## ✨ Features

* **Plug-and-play Express middleware**: Simple integration into your existing Express applications.
* **Captures comprehensive data**: Logs request and response details including body, headers, status code, and duration.
* **No project key or authentication required**: Get started immediately without complex setup.
* **Searchable logs**: Easily find specific requests in your private dashboard.
* **Real-time monitoring**: View API activity as it happens.
* **Hosted Dashboard**: Access your logs conveniently at [debug-replay.vercel.app](https://debug-replay.vercel.app).

---

## 📦 Installation

To install the middleware, use npm:

```bash
npm install debug-replay-middleware
````

-----

## 🧠 Quick Usage

Integrate `debug-replay-middleware` into your Express application with just a few lines of code.

### 1\. Import Dependencies

```javascript
import express from 'express';
import debugReplay from 'debug-replay-middleware';
```

### 2\. Initialize Express and Middleware

```javascript
const app = express();

// Important: Add this middleware before your routes
app.use(express.json()); // For parsing JSON request bodies
app.use(debugReplay());
```

### 3\. Define Your Routes (Example)

```javascript
app.get('/', (req, res) => {
  res.send({ message: 'Hello from DebugReplay!' });
});
```

### 4\. Start Your Server

```javascript
app.listen(3000, () => console.log('Server running on port 3000'));
```

### ✅ That's it\!

Once your application is running, logs will automatically appear on your dashboard:
🌐 **[https://debug-replay.vercel.app](https://www.google.com/url?sa=E&source=gmail&q=https://debug-replay.vercel.app)**

-----

## 🧩 How It Works

Once added to your Express application, the `debug-replay-middleware` automatically handles the following:

1.  **Captures HTTP Request & Response Data**: Intercepts incoming requests and outgoing responses.
2.  **Tracks Execution Duration**: Measures the time taken for each request to be processed.
3.  **Sends Log Data to the DebugReplay Backend**: Securely transmits the captured information to our centralized logging service.
4.  **Displays Logs in a Web Dashboard**: Presents the data in an intuitive, searchable interface at [debug-replay.vercel.app](https://www.google.com/url?sa=E&source=gmail&q=https://debug-replay.vercel.app), requiring no additional setup or keys from your end.

-----

## 🏗️ Monorepo Project Structure

This project is organized as a monorepo, containing the following key components:

  * ### `/Frontend` – Next.js App

      * **Description**: Built with TypeScript, serving as the user interface for the DebugReplay Dashboard.
      * **Installation**: `npm install`
      * **Build**: `npm run build`
      * **Environment Variables**:
          * `BACKEND_URL`: URL to the backend service.

  * ### `/Backend` – Express + Prisma + Supabase

      * **Description**: Written in TypeScript, responsible for receiving and logging incoming request data from the middleware.
      * **Installation & Build**:
        ```bash
        npm install && npx prisma generate --schema=src/prisma/schema.prisma && npx tsc
        ```
      * **Start**:
        ```bash
        node dist/index.js
        ```
      * **Environment Variables**:
          * `DATABASE_URL`: Your Supabase PostgreSQL connection URL.
          * `FRONTEND_URL`: The URL of the DebugReplay frontend (e.g., `https://debug-replay.vercel.app`).

-----

## 📤 Logging Destination

All captured logs are securely sent to:

🔗 **[https://debug-replay.vercel.app](https://www.google.com/url?sa=E&source=gmail&q=https://debug-replay.vercel.app)**

On the dashboard, you can:

  * Search logs by HTTP method, URL, and status code.
  * Inspect detailed request and response payloads.
  * View real-time API activity.

-----

## 🧪 Example Log Payload

Here's an example of the structured data captured and displayed for each request:

```json
{
  "method": "POST",
  "url": "/api/users",
  "statusCode": 201,
  "requestBody": { "name": "John" },
  "responseBody": { "id": 1, "name": "John" },
  "headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.29.0",
    // ... other headers
  },
  "duration": 42 // in milliseconds
}
```

-----

## 🔐 Environment Variables

Ensure the following environment variables are set for the respective services:

**Backend**

  * `DATABASE_URL=your_supabase_postgres_url`
  * `FRONTEND_URL=https://debug-replay.vercel.app`

**Frontend**

  * `BACKEND_URL=https://your-backend-url.onrender.com` (Replace with your actual Render backend URL)

-----

## 🛠 Built With

  * ⚙️ **Node.js + Express**: For the robust backend API.
  * 🌐 **Next.js + React**: Powering the dynamic frontend dashboard.
  * 📦 **Prisma ORM**: For seamless database interaction.
  * 🧱 **Supabase (PostgreSQL)**: Providing a powerful and scalable database solution.
  * ☁️ **Deployed on Render & Vercel**: Leveraging modern cloud platforms for deployment.
  * 🧑‍💻 **TypeScript**: Ensuring type safety and better developer experience end-to-end.

-----

## 📜 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE) – Free to use, modify, and distribute.

-----

## 🤝 Contributing

Contributions, ideas, and feedback are highly welcome\!

  * Feel free to [open an issue](https://www.google.com/search?q=https://github.com/OmXDev/DebugReplay/issues) to report bugs, suggest features, or ask questions.
  * Submit a [Pull Request](https://www.google.com/search?q=https://github.com/OmXDev/DebugReplay/pulls) with improvements or new functionalities.


```
```