// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='mt-10 h-40 w-full bg-background-light px-10 border-t border-secondary'>
//       <div className='h-full w-full flex items-center justify-between'>
//         <div className='h-full w-2/3 flex flex-col items-center justify-center'>
//           <h1 className='text-xl font-semibold mb-2'>About Us</h1>
//           <p>A modern blog CMS for publishing articles, tutorials, and stories. Built for creators and developers.</p>
//         </div>

//         <div className='h-vull w-full flex flex-col items-center justify-center'>
//           <h1 className='text-xl font-semibold mb-2 text-secondary'>Quick Links</h1>
//           <a className='hover:text-accent hover:underline' href="#">Home</a>
//           <a className='hover:text-accent hover:underline' href="#">About</a>
//           <a className='hover:text-accent hover:underline' href="#">Blog</a>
//         </div>
//         <div className='h-full w-full flex flex-col items-center justify-center '>
//           <h1 className='text-xl font-semibold mb-2 text-secondary'>Follow Us</h1>
//           <div className='flex gap-4'>
//             <a className='hover:text-accent hover:underline' href="#">Facebook</a>
//             <a className='hover:text-accent hover:underline' href="#">Twitter</a>
//             <a className='hover:text-accent hover:underline' href="#">Instagram</a>
//           </div>

//         </div>

//       </div>
//     </div>

//   );
// };

// export default Footer;

const Footer = () => {
  return (

    <footer class="text-gray-600 border border-secondary mt-10 rounded-xl p-3 mb-4 ">
      <div class="container mx-auto grid grid-cols-3">
        <div class="w-64  md:mx-0 mx-auto text-center md:text-left">
          <div className='h-full  flex flex-col items-center justify-center'>
            <h2 class="title-font font-semibold text-gray-900 text-sm mb-3 ">About Us</h2>
            <p className="text-body text-center mb-5">A modern blog CMS for publishing articles, tutorials, and stories. Built for creators and developers.</p>
            <div className='flex justify-center gap-4 w-full'>
              <a href="#"
                class="hover:text-[#1877f2] transition duration-300
              hover:drop-shadow-[0_0_10px_#1877f2]
              hover:drop-shadow-[0_0_20px_#1877f2]
              hover:scale-110">

                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.48H15.2c-1.25 0-1.64.78-1.64 1.58v1.9h2.79l-.45 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                </svg>
              </a>
              <a href="#"
                class="hover:text-[#e1306c] transition duration-300
              hover:drop-shadow-[0_0_10px_#e1306c]
              hover:drop-shadow-[0_0_20px_#e1306c]
              hover:scale-110">

                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm9.5 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>
              <a href="#"
                class="hover:text-white transition duration-300
              hover:drop-shadow-[0_0_10px_#ffffff]
              hover:drop-shadow-[0_0_20px_#ffffff]
              hover:scale-110
              ">

                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2H21l-6.52 7.47L22 22h-6.8l-5.3-6.9L3.9 22H1l7.02-8.05L2 2h6.9l4.8 6.32L18.244 2zm-1.2 18h1.9L7.1 3.9H5.1L17.044 20z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="flex justify-center md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div class=" w-fit">
            <h2 class="title-font font-semibold text-gray-900 text-sm mb-3">Quick Links</h2>
            <nav class="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-primary hover:underline" href="/">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-primary hover:underline" href="/blog">Blog</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-primary hover:underline" href="/about">About Us</a>
              </li>

            </nav>
          </div>
        </div>
        <div className="flex flex-wrap justify-center  md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">

          <div className='w-fit'>
            <h2 className='title-font font-semibold mb-3 text-secondary text-sm'>Category</h2>
            <div className='flex flex-col'>
              <li className="list-none">
                <a href="#" className="text-gray-600 hover:text-primary hover:underline">Buisness</a>
              </li>
              <li className="list-none">
                <a href="#" className="text-gray-600 hover:text-primary hover:underline">Technology</a>
              </li>
              <li className="list-none">
                <a href="#" className="text-gray-600 hover:text-primary hover:underline">Lifestyle</a>
              </li>
              <li className="list-none">
                <a href="#" className="text-gray-600 hover:text-primary hover:underline">Health</a>
              </li>

            </div>
          </div>

        </div>

      </div>
      <div className="mt-5">
        <p className="text-center text-gray-600">
          Copyright © 2023 Your Blog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer