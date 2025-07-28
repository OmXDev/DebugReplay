import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logRoutes from './routes/log.routes';


dotenv.config();

const app = express()
const PORT = process.env.PORT 

app.use(cors({
  origin: (process.env.FRONTEND_URL as string) || 'http://localhost:3001',

  credentials: true, // Optional, only if you're using cookies/auth
}));


app.use(cors());
app.use(express.json());

app.use('/api/logs',logRoutes)

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})