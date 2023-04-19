import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/posts.js'

dotenv.config();

const router = express.Router();

// 连接至 cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOND_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT
})

// 获取所有的 Post
router.route('/').get(async (req, res) => {

  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

// 创建 Post
router.route('/').post(async (req, res) => {

  try {
    const { name, prompt, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo)

    // 在 mongoBD 中创建 Post
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({ success: false, menubar: error })
  }
})


export default router;