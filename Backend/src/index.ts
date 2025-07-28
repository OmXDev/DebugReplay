import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logRoutes from './routes/log.routes';


dotenv.config();

const app = express()
const PORT = process.env.PORT 


app.use(cors({
  origin: 'http://localhost:3001',  // your frontend port
}))

app.use(cors());
app.use(express.json());

app.use('/api/logs',logRoutes)

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})