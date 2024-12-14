// import React from "react";
// import { motion } from "framer-motion";
// import { Shield, Lock, Key, Database, Bell, Users } from "lucide-react";
// import PricingSection from "./PricingSection";

// const features = [
//   {
//     title: "Advanced Protection",
//     icon: Shield,
//     description: "Best-in-class security to safeguard your digital assets",
//     details: [
//       "Military-grade encryption",
//       "Secure data transmission",
//       "Protected storage",
//       "Regular security updates",
//     ],
//   },
//   {
//     title: "Smart Authentication",
//     icon: Lock,
//     description: "Multiple layers of security for your peace of mind",
//     details: [
//       "Fingerprint verification",
//       "Face recognition support",
//       "Two-factor authentication",
//       "Secure password policies",
//     ],
//   },
//   {
//     title: "Privacy Controls",
//     icon: Key,
//     description: "You have complete control over your data",
//     details: [
//       "Customizable privacy settings",
//       "Granular access controls",
//       "Data ownership rights",
//       "Consent management",
//     ],
//   },
//   {
//     title: "Data Protection",
//     icon: Database,
//     description: "Your information is always protected and available",
//     details: [
//       "Encrypted storage",
//       "Automatic backups",
//       "Data recovery options",
//       "Zero-knowledge security",
//     ],
//   },
//   {
//     title: "Smart Alerts",
//     icon: Bell,
//     description: "Stay informed about your digital assets",
//     details: [
//       "Security notifications",
//       "Access alerts",
//       "Update reminders",
//       "Activity monitoring",
//     ],
//   },
//   {
//     title: "Nominee Management",
//     icon: Users,
//     description: "Secure access delegation to your trusted nominees",
//     details: [
//       "Nominee verification",
//       "Access scheduling",
//       "Permission management",
//       "Secure handover process",
//     ],
//   },
// ];

// const SecurityFeatures = () => {
//   return (
//     <>
//       <section className="py-20 bg-dark-100">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent py-2">
//               Uncompromising Security
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Your digital assetsdeserves the highest level of protection.
//               We've built our platform with security at its core, ensuring your
//               data remains private, protected, and accessible only to those you
//               trust.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="bg-dark-200 rounded-xl p-8 hover:bg-dark-300 transition-colors"
//               >
//                 <feature.icon className="w-12 h-12 text-accent-100 mb-6" />
//                 <h3 className="text-xl font-bold mb-4 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-300 mb-6">{feature.description}</p>
//                 <ul className="space-y-2">
//                   {feature.details.map((detail, idx) => (
//                     <li key={idx} className="flex items-center text-gray-400">
//                       <div className="w-1.5 h-1.5 rounded-full bg-accent-100 mr-2" />
//                       {detail}
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SecurityFeatures;

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Key, Database, Bell, Users } from "lucide-react";

const features = [
  {
    title: "Advanced Protection",
    icon: Shield,
    description: "Best-in-class security to safeguard your digital assets",
    image: "/assets/Images/Advanced_Protection.jpg",
    details: [
      "Military-grade encryption",
      "Secure data transmission",
      "Protected storage",
      "Regular security updates",
    ],
  },
  {
    title: "Smart Authentication",
    icon: Lock,
    description: "Multiple layers of security for your peace of mind",
    image: "/assets/Images/smart_authentication.jpg",

    details: [
      "Fingerprint verification",
      "Face recognition support",
      "Two-factor authentication",
      "Secure password policies",
    ],
  },
  {
    title: "Privacy Controls",
    icon: Key,
    description: "You have complete control over your data",
    image: "/assets/Images/privacy_control.jpg",

    details: [
      "Customizable privacy settings",
      "Granular access controls",
      "Data ownership rights",
      "Consent management",
    ],
  },
  {
    title: "Data Protection",
    icon: Database,
    description: "Your information is always protected and available",
    image: "/assets/Images/Data_protection.jpg",

    details: [
      "Encrypted storage",
      "Automatic backups",
      "Data recovery options",
      "Zero-knowledge security",
    ],
  },
  {
    title: "Smart Alerts",
    icon: Bell,
    description: "Stay informed about your digital assets",
    image: "/assets/Images/smart_alerts.jpg",

    details: [
      "Security notifications",
      "Access alerts",
      "Update reminders",
      "Activity monitoring",
    ],
  },
  {
    title: "Nominee Management",
    icon: Users,
    description: "Securely delegate access to your trusted nominees",
    details: [
      "Nominee verification",
      "Access scheduling",
      "Permission management",
      "Secure handover process",
    ],
  },
];

const SecurityFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent py-2">
            Uncompromising Security
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your digital assets deserve the highest level of protection. We've built our platform with security at its core, ensuring that your data remains private, protected, and accessible only to you and those you trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 rounded-xl shadow-md bg-dark-900 group overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {/* Background Image with Subtle Zoom Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-50"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-opacity duration-300"></div>

              {/* Icon Section */}
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 shadow-md mb-6">
                <feature.icon className="w-8 h-8 text-dark-900" />
              </div>

              {/* Feature Title */}
              <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-accent-100 transition-all duration-300 relative z-10">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-sm text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 relative z-10">
                {feature.description}
              </p>

              {/* Details List */}
              <ul className="space-y-2 relative z-10">
                {feature.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-400 group-hover:text-white transition-colors duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-100 mr-3 group-hover:bg-accent-200 transition-all duration-300" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Border and Glow Effects */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent-200 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
