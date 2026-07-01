import BlogCard from '@/components/BlogCard'
import React, { useEffect, useState } from 'react'
import { LucideListFilter } from 'lucide-react'
import Footer from '@/components/Footer'
import { postStore, usePostByCategory } from '@/store/postStore'
import Button from '@/components/ui/button'

const Blog = () => {

  const [category, setCategory] = useState(null)
  const [filter, setFilter] = useState(false)
  const [searchedPost, setSearchedPost] = useState([])
  const [visible, setVisible] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(4);
  const post = postStore(state => state.post)
  const travel = usePostByCategory("Travel").slice(0, 4)
  const technology = usePostByCategory("Technology").slice(0, 4)
  const health = usePostByCategory("Health").slice(0, 4)
  const science = usePostByCategory("Science").slice(0, 4)
  const buisness = usePostByCategory("Business").slice(0, 4)
  console.log(travel)
  console.log(currentIndex)
  console.log(category)



  var categoryList = Array.from(new Set(post.map(blog => blog.category)));
  categoryList.push("All")
  console.log(post)



  const loadMore = () => {
    setCurrentIndex(currentIndex + 4);
  };

  async function fetchSearchItem(value) {
    console.log(value)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/search?keyword=${value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: 'include'
    })

    const data = await res.json();
    if (data.success) {
      setSearchedPost(data.post)
      setVisible('search')

    } else {
      setVisible('search')
      console.log(data.success)
      setSearchedPost([])
    }

  }



  let searchId;
  console.log(searchId)
  function handleSearch(e) {

    const value = e.target.value;
    if (value.trim().length < 3) {
      setVisible('all')
      return
    }


    if (searchId) {
      clearTimeout(searchId)

    }


    searchId = setTimeout(() => {
      fetchSearchItem(value);
    }, 300)

  }
  if (!post) {
    return <div className='h-screen w-full flex items-center justify-center'>
      <div className='h-20 w-20 border-4 border-accent border-t-transparent rounded-full animate-spin'></div>
    </div>
  }

  return (

    <div className='h-full w-full px-4 md:px-6 lg:px-10'>

      <div className='h-30 mt-15  w-full flex flex-col items-center justify-center lg:mt-5'>
        <h1 className=' font-heading font-bold text-header text-center'>Discover Our Latest News </h1>
        <p className='text-body font-sans text-center  '>Stay informed with the latest news, insightful articles, and expert perspectives from our blog. <br />Explore trending topics, industry updates, and valuable stories designed to keep you connected and inspired.</p>
      </div>

      <div className=" h-30 lg:h-20 w-full mt-15 lg:mt-5 flex items-center justify-center">
        <div className=" h-full w-[90%] lg:w-[70%] max-w-2xl flex items-center gap-3 flex-col lg:flex-row  transition-all duration-300">


          <div className="relative flex items-center  h-17 lg:h-12 flex-1 bg-background-light border border-secondary/20 rounded-xl shadow-sm group transition-all duration-300 focus-within:flex-[2]">

            <div className="absolute left-4 text-secondary/50 group-focus-within:text-secondary transition-colors duration-300">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.602Z" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search by title"
              className="h-full w-full pl-12 pr-4 bg-transparent rounded-xl outline-none placeholder:text-secondary/40"
              onChange={(e) => handleSearch(e)}
            />
          </div>


          <div className="relative transition-all duration-300">
            <button
              onClick={() => setFilter(!filter)}
              className="h-12 w-24 rounded-xl bg-primary hover:bg-primary/90 text-background-light flex items-center gap-1.5 justify-center"
            >
              <LucideListFilter />
              filter
            </button>

            {filter && (
              <ul className="absolute right-0 top-14 w-24 rounded-xl bg-background-light py-3 shadow-sm z-10">
                {categoryList.map((item) => (
                  <li
                    key={item}
                    className="text-center py-2 hover:bg-[#CFCBC9] cursor-pointer"
                    onClick={() => {

                      setFilter(false);
                      if (item == "All") {
                        setVisible("all")
                        return
                      }
                      setVisible('filter')
                      setCategory(item);
                      setCurrentIndex(4);
                      
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
      {visible == "all" && (
        <div>
          <section className='h-full w-full mt-10 '>
            <div className='w-full flex justify-between '>
              <h3 className='text-title  font-bold text-secondary capitalize'>Science</h3>

            </div>
            <div className=' grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10'>

              {science.map(blog => (
                <BlogCard key={blog.title} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />
              ))}

            </div>
          </section>


          <section className='h-full w-full mt-10 '>
            <div className='w-full flex justify-between '>
              <h3 className='text-title  font-bold text-secondary capitalize'>Travel</h3>

            </div>
            <div className='h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>

              {travel.map(blog => (
                <BlogCard key={blog.title} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />

              ))}

            </div>
          </section>
          <section className='h-full w-full mt-10 '>
            <div className='w-full flex justify-between '>
              <h3 className='text-title  font-bold text-secondary capitalize'>Technology</h3>

            </div>
            <div className='h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>

              {technology.map(blog => (
                <BlogCard key={blog.title} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />

              ))}

            </div>
          </section>
          <section className='h-full w-full mt-10 '>
            <div className='w-full flex justify-between '>
              <h3 className='text-title  font-bold text-secondary capitalize'>Buisness</h3>

            </div>
            <div className='h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>

              {buisness.map(blog => (
                <BlogCard key={blog.title} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />

              ))}

            </div>
          </section>
          <section className='h-full w-full mt-10 '>
            <div className='w-full flex justify-between '>
              <h3 className='text-title  font-bold text-secondary capitalize'>Health</h3>

            </div>
            <div className='h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>

              {health.map(blog => (
                <BlogCard key={blog.title} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />

              ))}

            </div>
          </section>


        </div>
      )}
      {visible == "filter" &&
        (
          <div className='  w-full mt-10   '>
            <h1 className='text-title font-bold text-secondary capitalize'>Category : {category}</h1>
            <div className='h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-x-5 gap-y-10  mt-10'>
              {post.filter(blog => category === blog.category).slice(0, currentIndex).map(blog => (


                <BlogCard key={blog._id} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />


              ))}
            </div>
            <div className='flex items-center justify-center mt-10'>
              {currentIndex < 8 && (
                <Button onClick={loadMore} className='rounded-xl' variant='shiny' height={50} width={120}>
                  Load More
                </Button>
              )}
            </div>
          </div>
        )}
      {visible == "search" &&
        (
          <div className='  w-full mt-10   '>
            {searchedPost.length == 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold">No posts found</h2>
                <p className="text-gray-500 mt-2">
                  Try searching with a different keyword.
                </p>
              </div>
            ) : (
              <div className='h-full w-full grid grid-cols lg:grid-cols-4 gap-x-5 gap-y-10  mt-10'>
                {searchedPost.map(blog => (


                  <BlogCard key={blog._id} title={blog.title} image={blog.image} category={blog.category} author={blog.author} excerpt={blog.description} publishedAt={blog.createdAt} id={blog._id} />


                ))}
              </div>
            )}
            <div className='flex items-center justify-center mt-10'>
              {currentIndex < 8 && visible !== "search" && (
                <Button onClick={loadMore} className='rounded-xl' variant='shiny' height={50} width={120}>
                  Load More
                </Button>
              )}
            </div>
          </div>
        )}
      <Footer />
    </div>


  )
}

export default Blog