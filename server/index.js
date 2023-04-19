import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

// 获取 .env 中所有的环境变量
dotenv.config();

const app = express();

// 跨域、允许 json
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
  res.send('Hello dall-e');
})

const startServer = () => {

  try {
    // 连接 mongoDB
    connectDB(process.env.MONGODB_URL)

    // 启动应用
    app.listen(8080, () => console.log('Server is running ai port 8080'));

  } catch (error) {
    console.log(error);
  }

}

startServer();
