import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormField, Loader } from '../components'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })

  // 是否正在生成图片
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  // 表单上传的回调
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        })

        const data = await response.json();
        console.log(data);

        navigate('/');

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("请输入 Prompt 生成图片")
    }
  }

  // 表单项改变的回调
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 点击生成随机prompt的回调
  const handleClickRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  // 点击生成是的回调
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setIsGenerating(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: 'POST',
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: data.image })

      } catch (error) {
      } finally {
        setIsGenerating(false);
      }
    }
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/* 信息展示 */}
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>图像生成</h1>
        <p className='mt-2 ml-2 text-[#666e75] text-[18px] max-w-[500px]'>
          创建并分享由<a href='https://www.kamiya.dev/' className='text-purple-600'>众神之谷</a>API生成的AI图像
        </p>
      </div>

      {/* 表单 */}
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} >
        <div className='flex flex-col gap-5'>
          {/* 用户名 */}
          <FormField
            labelName='Your name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          />

          {/* 提示词 */}
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='1girl,beautiful,shin_skin'
            value={form.prompt}
            handleChange={handleChange}
            isRandomPrompt
            handleClickRandomPrompt={handleClickRandomPrompt}
          />

          {/* 图片预览区 */}
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-96  p-3 h-96 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {/* 图片正在生成的效果 */}
            {isGenerating && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-l-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* 按钮：生成图片以及上传 */}
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center"
            onClick={generateImage}
          >
            {isGenerating ? '生成中...' : '图像生成'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75 text-[14px]]'>满意的图片可以分享到社区中！</p>
          <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full px-5 py-3 text-center'>
            {loading ? "上传中..." : "分享到社区"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost