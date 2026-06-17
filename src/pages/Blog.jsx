import BlogCard from '@/components/BlogCard'
import React from 'react'
import { blogs } from '@/lib/data.js'
const Blog = () => {



  return (
    <div>
      <div className='h-screen w-full px-10'>
        <div className='grid grid-cols-4 gap-5 mt-10'>
          {blogs.map(blog => (

            <BlogCard title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.excerpt} publishedAt={blog.publishedAt} avatar={blog.avatar} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog