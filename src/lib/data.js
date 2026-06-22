
import {
  UsersRound,
  ShieldPlus,
  FileText,
  User,
} from "lucide-react";
export const features = [
  {
    icon: UsersRound,
    title: "Role-Based Access Control",
    description:
      "Securely manage user permissions and restrict access based on assigned roles.",
  },
  {
    icon: ShieldPlus,
    title: "Profile Management",
    description:
      "Enable users to update personal details and manage account settings effortlessly.",
  },
  {
    icon: FileText,
    title: "Rich Text Editor",
    description:
      "Create, edit, and format content with support for rich styling and media.",
  },
  {
    icon: User,
    title: "Admin Dashboard",
    description:
      "Monitor, manage, and configure users and content from one central panel.",
  },
];

export const faq = [
  {
    question: "How can I read blog posts on the website?",
    answer:
      "As a Reader, you can browse all published blog posts, search for articles by keyword, and view content by category or tag. Creating an account may be required for commenting or subscribing to updates.",
  },
  {
    question: "How do Authors create and publish blog posts?",
    answer:
      "Authors can log in to the CMS dashboard, create a new post, add content, images, and tags, then save it as a draft or submit it for review. Depending on permissions, they may be able to publish posts directly.",
  },
  {
    question: "Can Authors edit or delete their blog posts?",
    answer:
      "Yes. Authors can edit their own posts to update content, correct errors, or add new information. They may also delete drafts or published posts if their role permissions allow it.",
  },
  {
    question: "What can an Admin do in the Blog CMS?",
    answer:
      "Admins have full control over the system. They can manage users, approve or reject posts, create categories and tags, moderate comments, configure site settings, and monitor website activity.",
  },
  {
    question: "How does the post approval process work?",
    answer:
      "When an Author submits a post, it may enter a review queue. An Admin reviews the content for quality and compliance, then approves, rejects, or requests revisions before publication.",
  },
];

export const blogs = [
  // Technology (4)
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    category: "Technology",
    title: "The Future of Artificial Intelligence in Everyday Life",
    excerpt: "Discover how AI is transforming industries, homes, and personal productivity in ways we never imagined.",
    author: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    publishedAt: "5 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Technology",
    title: "How Quantum Computing Could Change the World",
    excerpt: "A beginner-friendly look at quantum computers and their potential applications.",
    author: "Daniel Lee",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    publishedAt: "6 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    category: "Technology",
    title: "Cybersecurity Trends Every Business Should Know",
    excerpt: "Emerging threats and the best practices to keep your data safe in 2025.",
    author: "Emma Davis",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    publishedAt: "7 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    category: "Technology",
    title: "The Rise of Smart Cities and Connected Living",
    excerpt: "How IoT devices are making urban environments more efficient and sustainable.",
    author: "Ryan Walker",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    publishedAt: "5 min read"
  },

  // Science (4)
  {
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e",
    category: "Science",
    title: "The Search for Life Beyond Earth",
    excerpt: "Scientists are discovering new exoplanets that may support life.",
    author: "Sophia Green",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    publishedAt: "8 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
    category: "Science",
    title: "CRISPR and the Future of Genetic Engineering",
    excerpt: "Understanding the revolutionary gene-editing technology changing medicine.",
    author: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    publishedAt: "6 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    category: "Science",
    title: "Climate Change Innovations Offering Hope",
    excerpt: "From carbon capture to renewable energy breakthroughs, science is fighting back.",
    author: "Natalie Brooks",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    publishedAt: "7 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
    category: "Science",
    title: "Why Deep Ocean Exploration Matters",
    excerpt: "The mysteries of Earth's oceans could unlock discoveries about life itself.",
    author: "Ethan Cooper",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    publishedAt: "5 min read"
  },

  // Business (4)
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Business",
    title: "Remote Work Strategies That Actually Increase Productivity",
    excerpt: "Practical tips for teams and individuals looking to thrive in a distributed work environment.",
    author: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    publishedAt: "6 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    category: "Business",
    title: "Startup Lessons from Successful Entrepreneurs",
    excerpt: "Key insights from founders who built companies from scratch.",
    author: "Laura Adams",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    publishedAt: "5 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Business",
    title: "Understanding Modern Consumer Behavior",
    excerpt: "What drives purchasing decisions in today's digital marketplace.",
    author: "Robert King",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    publishedAt: "7 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
    category: "Business",
    title: "The Growing Impact of Sustainable Investing",
    excerpt: "Why ESG-focused investments are attracting global attention.",
    author: "Grace Hill",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    publishedAt: "6 min read"
  },

  // Travel (4)
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    category: "Travel",
    title: "10 Hidden Destinations You Should Visit This Year",
    excerpt: "Explore breathtaking locations away from the crowds and experience authentic local culture.",
    author: "David Miller",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    publishedAt: "7 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    category: "Travel",
    title: "A Complete Guide to Solo Travel Adventures",
    excerpt: "How to travel safely, confidently, and enjoyably on your own.",
    author: "Hannah Scott",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    publishedAt: "6 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
    category: "Travel",
    title: "Budget-Friendly Trips That Feel Luxurious",
    excerpt: "Affordable travel experiences without compromising comfort.",
    author: "Jason Reed",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    publishedAt: "5 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    category: "Travel",
    title: "The World's Most Stunning Coastal Escapes",
    excerpt: "Discover beaches and coastal towns that belong on every traveler's list.",
    author: "Mia Thompson",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    publishedAt: "8 min read"
  },

  // Health (4)
  {
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    category: "Health",
    title: "Simple Daily Habits for Better Mental Wellbeing",
    excerpt: "Small lifestyle changes can have a significant impact on stress management and happiness.",
    author: "Olivia Wilson",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    publishedAt: "3 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    category: "Health",
    title: "The Benefits of Regular Exercise Beyond Fitness",
    excerpt: "Physical activity improves mental health, productivity, and longevity.",
    author: "Noah Evans",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    publishedAt: "5 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    category: "Health",
    title: "Nutrition Myths You Should Stop Believing",
    excerpt: "Separating fact from fiction when it comes to healthy eating.",
    author: "Ava Mitchell",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    publishedAt: "4 min read"
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    category: "Health",
    title: "Mindfulness Techniques for Busy Professionals",
    excerpt: "Practical methods to stay calm and focused during demanding workdays.",
    author: "Benjamin Clark",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    publishedAt: "6 min read"
  }
];