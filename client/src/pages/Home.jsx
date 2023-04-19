import React, { useState, useEffect, useRef } from 'react'
import { Card, Loader, FormField } from '../components'


const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    )
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
      {title}
    </h2>
  )

}

// 主页
const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState(null);
  const timer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {

        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.ok) {
          const data = await response.json();
          setAllPosts(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

  }, [])


  // 搜索关键字改变的回调
  const handleSearchChange = (e) => {
    // 进行了防抖处理
    clearTimeout(timer.current);
    setSearchText(e.target.value);
    timer.current = setTimeout(() => {
      const searchResults = allPosts?.filter((item) => item.name.includes(searchText) || item.prompt.includes(searchText));

      setSearchResults(searchResults);
    }, 1000);
  }


  return (
    <section className='max-w-7xl mx-auto'>
      {/* 上方的信息展示 */}
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>社区案例</h1>
        <p className='mt-2 ml-2 text-[#666e75] text-[18px] max-w-[500px]'>
          浏览由<a href='https://www.kamiya.dev/' className='text-purple-600'>众神之谷</a>API生成的AI图像
        </p>
      </div>

      {/* 搜索框 */}
      <div className='mt-16'>
        <FormField
          labelName='Search Posts'
          type='text'
          name='text'
          placeholder='Input Search key word'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      {/* 展示区 */}
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'><Loader /> </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                正在搜索有关<span className='text-red-500'>{searchText}</span>的图片...
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={searchResults} title='未找到结果' />
              ) : (
                <RenderCards data={allPosts} title='结果不存在' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home