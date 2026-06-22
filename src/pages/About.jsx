import {
    Users,
    FileText,
    Globe,
    Quote,
} from "lucide-react";
import img from "../assets/Blog-post-bro.png"
import Footer from "@/components/Footer";
export default function AboutPage() {
    const stats = [
        {
            title: "Active Users",
            value: "300+",
            icon: <Users size={28} />,
        },
        {
            title: "Blogs Posted",
            value: "50+",
            icon: <FileText size={28} />,
        },
        {
            title: "Languages",
            value: "2",
            icon: <Globe size={28} />,
        },
    ];

    const testimonials = [
        {
            name: "John Doe",
            text: "An amazing CMS that made managing our content effortless.",
        },
        {
            name: "Sarah Smith",
            text: "Simple, fast, and perfect for teams working together.",
        },
        {
            name: "Michael Brown",
            text: "The best blogging platform we've used so far.",
        },
    ];

    return (
        <section className="bg-background-light h-screen px-10">
            <div className=" mx-auto bg-background-light  overflow-hidden">
                {/* Hero */}
                <div className="px-8 md:px-16 py-16 text-center">
                    <p className="text-primary font-medium mb-2">About Us</p>

                    <h1 className="text-4xl md:text-5xl font-bold text-secondary max-w-4xl mx-auto leading-tight">
                        Simplifying blog management for creators, teams, and brands.
                    </h1>

                    <p className="mt-6 text-secondary/70 text-lg max-w-2xl mx-auto">
                        Our CMS helps writers and organizations publish, manage, and
                        collaborate effortlessly while focusing on creating meaningful
                        content.
                    </p>
                </div>

                {/* Goals Section */}
                <div className="grid md:grid-cols-2 gap-12 px-8 md:px-16 pb-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-6">
                            Our Goals
                        </h2>

                        <p className="text-secondary/80 leading-relaxed">
                            We built this platform to remove the complexity of content
                            management. Whether you're a solo creator, a startup, or an
                            enterprise team, our goal is to provide a modern and intuitive
                            blogging experience.
                        </p>

                        <p className="text-secondary/80 leading-relaxed mt-4">
                            From publishing workflows to team collaboration, every feature is
                            designed to help you grow your audience and manage content with
                            confidence.
                        </p>
                    </div>

                    <div>
                        <div className="aspect-square bg-primary max-w-sm mx-auto rounded-[30px] border-2 border-secondary bg-background-light flex items-center justify-center">
                            <img
                                src={img}
                                alt="About CMS"
                                className="w-full h-full object-cover rounded-[28px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="px-8 md:px-16 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <div
                                key={stat.title}
                                className="rounded-xl  bg-background-light p-6 text-center shadow-lg"
                            >
                                <div className="flex justify-center text-primary mb-4">
                                    {stat.icon}
                                </div>

                                <h3 className="font-semibold text-secondary">
                                    {stat.title}
                                </h3>

                                <p className="text-3xl font-bold text-primary mt-2">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="px-8 md:px-16 pb-20">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-10">
                        Testimonials
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-background-light p-6 text-center shadow-lg"
                            >
                                <div className="w-16 h-16 rounded-full bg-background-light border border-secondary mx-auto flex items-center justify-center mb-4">
                                    <Quote size={24} className="text-primary" />
                                </div>

                                <div className="text-accent text-lg mb-2">★★★★★</div>

                                <p className="text-secondary/80 mb-4">
                                    {item.text}
                                </p>

                                <h4 className="font-semibold text-secondary">
                                    {item.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    );
}