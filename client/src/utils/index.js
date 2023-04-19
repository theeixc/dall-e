import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

// 获取随机的 prompt
export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  // 防止两次 prompt 相同
  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
}

// 下载图片功能
export const downloadImage = async (_id, photo) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}