import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid'
import axios from 'axios'


dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello dalle Router')
})

router.route('/').post(async (req, res) => {
  try {

    const { prompt } = req.body;
    const traceId = uuid();
    const arr = [];
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        arr[i] = parseInt(Math.random() * 9 + 1)
      } else {
        arr[i] = parseInt(10 * Math.random());
      }
    }
    const seed = parseInt(arr.join(""));

    const data = {
      "prompt": prompt,
      "negativePrompt": ",lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      "steps": 28,
      "scale": 12,
      "seed": seed,
      "sampler": "DPM++ 2M Karras",
      "width": 512,
      "height": 512,
      "traceId": traceId,
      "model": "anything-v4.0-fp16-default"
    }

    const config = {
      method: 'post',
      url: 'https://p0.kamiya.dev/api/image/generate',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.DALL_E_TOKEN,
        'Accept': '*/*',
        'Host': 'p0.kamiya.dev',
        'Connection': 'keep-alive'
      },
      data
    }


    const response = await axios(config);

    res.send(JSON.stringify(response.data));

  } catch (error) {

  }
})

export default router;