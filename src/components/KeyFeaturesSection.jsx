// import React from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import {
//   Shield,
//   Key,
//   Lock,
//   FileCheck,
//   Cloud,
//   Database,
//   Server,
// } from "lucide-react";

// const bigFeatures = [
//   {
//     title: "Advanced Encryption",
//     description: "Military-grade encryption for all your sensitive data",
//     icon: Shield,
//     image:
//       "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Biometric Authentication",
//     description: "Multi-factor authentication with biometric security",
//     icon: Lock,
//     image:
//       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80",
//   },
//   {
//     title: "Smart Contracts",
//     description: "Automated and secure asset transfer protocols",
//     icon: FileCheck,
//     image:
//       "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
//   },
// ];

// const smallFeatures = [
//   {
//     title: "Cloud Backup",
//     description: "Redundant backup systems",
//     icon: Cloud,
//   },
//   {
//     title: "Data Recovery",
//     description: "Advanced recovery options",
//     icon: Database,
//   },
//   {
//     title: "API Security",
//     description: "Secure API endpoints",
//     icon: Server,
//   },
//   {
//     title: "Access Control",
//     description: "Granular permissions",
//     icon: Key,
//   },
// ];

// const KeyFeaturesSection = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section className="py-20 bg-dark-200" id="key-features">
//       <div className="container mx-auto px-6">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             Key Features
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Experience unparalleled security and control with our advanced
//             feature set
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-8 mb-12">
//           {bigFeatures.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="glow-box"
//             >
//               <div className="aspect-video w-full overflow-hidden">
//                 <img
//                   src={feature.image}
//                   alt={feature.title}
//                   className="w-full h-full object-cover"
//                   loading={index === 0 ? "eager" : "lazy"}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
//               </div>
//               <div className="p-6 relative">
//                 <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-300">{feature.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {smallFeatures.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
//               className="glow-box p-6"
//             >
//               <feature.icon className="w-6 h-6 text-accent-100 mb-3" />
//               <h4 className="text-lg font-semibold mb-1 text-white">
//                 {feature.title}
//               </h4>
//               <p className="text-sm text-gray-300">{feature.description}</p>
//               <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500 transition-colors duration-300"></div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default KeyFeaturesSection;

// new UI
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Key,
  Lock,
  FileCheck,
  Cloud,
  Database,
  Server,
} from "lucide-react";

const bigFeatures = [
  {
    title: "Advanced Encryption",
    description: "Military-grade encryption to protect all your sensitive data",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
  },
  {
    title: "Biometric Authentication",
    description: "Multi-factor authentication with biometric security features",
    icon: Lock,
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80",
  },
  {
    title: "Smart Contracts",
    description: "Automated and secure asset transfer protocols in place",
    icon: FileCheck,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  },
];

const smallFeatures = [
  {
    title: "Cloud Backup",
    description: "Redundant backup systems",
    icon: Cloud,
    image: "/assets/Images/cloud-backup.jpg",
  },
  {
    title: "Data Recovery",
    description: "Advanced recovery options",
    icon: Database,
    image: "/assets/Images/data_recovery.jpg",
  },
  {
    title: "API Security",
    description: "Secure API endpoints",
    icon: Server,
    image: "/assets/Images/API_security.jpg",
  },
  {
    title: "Access Control",
    description: "Granular permissions",
    icon: Key,
    image: "/assets/Images/Access_Contrl.jpg",
  },
];

const KeyFeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-dark-200" id="key-features">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent py-2">
            Key Features
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience unmatched security and control with our advanced set of features
          </p>
        </motion.div>

        {/* <motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
  className="relative text-center mb-16 p-8 bg-gradient-to-br from-dark-700 to-dark-900 rounded-xl border border-accent-100 shadow-lg"
>

  <div className="absolute inset-0 bg-gradient-to-r from-accent-100 to-accent-200 opacity-30 blur-md rounded-xl"></div>

  <div className="relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-100 to-accent-200">
      Key Features
    </h2>
    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Explore our advanced features that provide exceptional security,
      convenience, and unparalleled control.
    </p>
  </div>
</motion.div> */}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {bigFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white cursor-pointer group"
            >
              {/* Background Image */}
              <div className="relative aspect-video">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {/* Icon at Top Right */}
                <div className="absolute top-4 right-4 bg-accent-100 text-dark-100 rounded-full p-2 shadow-md">
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {smallFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
              className="relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-dark-800 via-dark-700 to-dark-900 shadow-lg group hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{ backgroundImage: `url(${feature.image})` }}
              />

              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-opacity duration-300"></div>

              {/* Icon with Gradient Background */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-accent-100 to-accent-200 shadow-md group-hover:shadow-lg transition-all duration-300 z-10">
                <feature.icon className="w-6 h-6 text-dark-900" />
              </div>

              {/* Content Section */}
              <div className="relative mt-10 text-center z-10">
                {/* Title */}
                <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-accent-100 transition-colors duration-300">
                  {feature.title}
                </h4>
                {/* Description */}
                <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-100/10 via-accent-200/10 to-transparent opacity-100 group-hover:from-accent-100/30 group-hover:via-accent-200/30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
