import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  Tv,
  Share2,
  Gamepad2,
  FolderLock,
} from "lucide-react";

const credentialTypes = [
  {
    title: "Banking Credentials",
    icon: CreditCard,
    // image: '/images/banking.jpg',
    image: "/assets/Images/Banking_credentials.jpg",
    description: "Securely Manage your Banking User Id/Password and other Credentials",
  },
  {
    title: "Investment Credentials",
    icon: TrendingUp,
    // image: "/images/investment.jpg",
    image: "/assets/Images/Investment_credneitals.jpg",

    description: "Keep your Investment Platform access Secure",
  },
  {
    title: "Entertainment Platform Credentials",
    icon: Tv,
    // image: "/images/entertainment.jpg",
    image: "/assets/Images/Entertainment.jpg",

    description: "Store your Streaming and Entertainment Login details",
  },
  {
    title: "Social Media Credentials",
    icon: Share2,
    image: "/assets/Images/SocialMedia.jpg",
    description: "Manage your Social Media account access",
  },
  {
    title: "Gaming Platform Credentials",
    icon: Gamepad2,
    image: "/assets/Images/gaming_credentials.jpg",
    description: "Keep your Gaming Accounts secure",
  },
  {
    title: "Others",
    icon: FolderLock,
    image: "/assets/Images/others.jpg",
    description: "Store and Manage Credentials for any other Platforms and Portals",
  },
];

const CredentialTypes = () => {
  return (
    <section className="py-20 bg-dark-200">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
        >
          Store All Your Credentials
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {credentialTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl glow-box group"
            >
              <div className="absolute inset-0">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark-100/80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              <div className="relative p-8">
                <type.icon className="w-12 h-12 text-accent-100 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {type.title}
                </h3>
                <p className="text-gray-300">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialTypes;
