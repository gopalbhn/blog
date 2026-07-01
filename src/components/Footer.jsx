const Footer = () => {
  return (
    <footer className="bg-secondary-hover text-background-light mt-24 rounded-xl p-6 mb-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_1fr_1fr_1fr] gap-10">
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-xs">
            <h2 className="title-font font-semibold text-sm mb-3">
              About Us
            </h2>

            <p className="text-body mb-5">
              A modern blog CMS for publishing articles, tutorials, and
              stories. Built for creators and developers.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-[#1877f2] transition duration-300 hover:drop-shadow-[0_0_10px_#1877f2] hover:scale-110"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.48H15.2c-1.25 0-1.64.78-1.64 1.58v1.9h2.79l-.45 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                </svg>
              </a>

              <a
                href="#"
                className="hover:text-[#e1306c] transition duration-300 hover:drop-shadow-[0_0_10px_#e1306c] hover:scale-110"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm9.5 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_10px_#fff] hover:scale-110"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2H21l-6.52 7.47L22 22h-6.8l-5.3-6.9L3.9 22H1l7.02-8.05L2 2h6.9l4.8 6.32L18.244 2zm-1.2 18h1.9L7.1 3.9H5.1L17.044 20z" />
                </svg>
              </a>
            </div>
          </div>
        </div>


        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-xs">
            <h2 className="title-font font-semibold text-sm mb-3">
              Quick Links
            </h2>

            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-accent hover:underline"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/blog"
                  className="hover:text-accent hover:underline"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:text-accent hover:underline"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>


        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-xs">
            <h2 className="title-font font-semibold text-sm mb-3">
              Category
            </h2>

            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Business
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Technology
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Lifestyle
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Health
                </a>
              </li>
            </ul>
          </div>
        </div>


        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-xs">
            <h2 className="title-font font-semibold text-sm mb-3">
              Company
            </h2>

            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-accent hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="border-t border-background-light/20 mt-8 pt-5">
        <p className="text-center text-sm text-background-light">
          © 2023 Your Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;