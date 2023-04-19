import React from 'react'

import { logo } from './assets'
import { Home, CreatePost } from './pages'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      {/* 头部导航区 */}
      <header
        className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'
      >
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt="logo" className='h-10 object-contain' />
          <span className='font-bold'>众神之谷</span>
        </Link>

        <Link
          to='/create-post'
          className='font-inter font-medium bg-[#6469ff] text-white px-8 py-2 rounded-md'
        >
          上传
        </Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create-post' element={<CreatePost />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App