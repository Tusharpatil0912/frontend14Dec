import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Clock, Heart, Users, Lock, Globe } from "lucide-react";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-dark-200" id="about">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Our Story
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glow-box overflow-hidden"
          >
            <img
              src="/assets/Images/AboutUs (2).jpg"
              alt="Digital Future"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-dark-100/60" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-box p-8"
          >
            <h3 className="text-3xl font-bold mb-6">The Genesis</h3>
            <p className="text-gray-300 mb-8">
              In today's digital age, our lives are increasingly intertwined with technology. From precious memories stored on social media to critical financial information in banking apps and beyond, our digital footprint has become a major part of our daily lives. SacredSecret emerged from the recognition that these digital assets require the same level of protection and careful succession planning as physical assets. We've created a platform that ensures your digital assets remain secure and are only accessible to those you trust, after you're gone.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Personal Touch</h4>
                  <p className="text-gray-300">
                    Built with an understanding of the emotional value of digital memories.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Community Driven
                  </h4>
                  <p className="text-gray-300">
                    Developed based on real needs and feedback from our community.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Privacy First</h4>
                  <p className="text-gray-300">
                    Built on the principles of absolute privacy and security.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: "/assets/logos/logo1.jpeg",
              title: "Security First",
              image: "/assets/Images/security_first.jpg",
              items: [
                "Military-grade encryption",
                "Customizable access controls",
                "Automated security updates",
                "24/7 technical support",
                "Regular security audits",
              ],
            },
            {
              icon: "/assets/logos/logo2.jpeg",
              title: "Global Reach",
              image: "/assets/Images/global_reach.jpg",
              items: [
                "Multi-language support",
                "24/7 customer service",
                "Regional compliance",
                "Local data centers",
                "Global accessibility",
              ],
            },
            {
              icon: "/assets/logos/logo3.jpeg",
              title: "Innovation",
              image: "/assets/Images/Innovation.jpg",
              items: [
                "Cutting-edge technology",
                "Regular feature updates",
                "User-driven development",
                "Advanced automation",
                "Future-proof design",
              ],
            },
          ].map(({ icon, title, image, items }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-xl shadow-lg group hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-40 group-hover:opacity-50"
                style={{ backgroundImage: `url(${image})` }}
              ></div>

              {/* Dark Overlay for Stronger Fade */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative p-8 z-10 text-left">
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6">
                  <img
                    src={icon}
                    alt={`${title} icon`}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-100 transition-colors duration-300">
                  {title}
                </h4>

                {/* List Items */}
                <ul className="space-y-4 text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-2 h-2 rounded-full bg-accent-100 group-hover:bg-accent-200 transition-colors duration-300 mt-1"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
