import { p } from 'framer-motion/client'
import { create } from 'zustand'


const postStore = create((set) => ({
    post: [],
    setPost: (post) => {
        set({ post })
    }

}))


const usePostByCategory = (category) =>{
    const selectedPost = postStore(state=>state.post)
    return selectedPost.filter(p=> p.category == category)
}

// const TravelBlog = postStore(state=>state.post).filter(p=> p.category == "Travel")

export { postStore, usePostByCategory }