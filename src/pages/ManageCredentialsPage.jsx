// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Check, Play } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import FAQ from "../components/FAQ";
// import CredentialTypes from "../components/CredentialTypes";
// import SecurityFeatures from "../components/SecurityFeatures";

// const faqs = [
//   {
//     question: "What types of credentials can I store?",
//     answer:
//       "You can store various types of credentials including banking, investment, entertainment platforms, social media, gaming, and other custom credentials. Each type has specific fields tailored to its requirements.",
//   },
//   {
//     question: "How secure is my data?",
//     answer:
//       "We use military-grade encryption and advanced security measures to protect your data. All credentials are encrypted both in transit and at rest, ensuring maximum security.",
//   },
//   {
//     question: "Can I access my credentials from multiple devices?",
//     answer:
//       "Yes, you can securely access your credentials from any device through our web interface. Multi-factor authentication ensures only you can access your account.",
//   },
//   {
//     question: "How do I share credentials with nominees?",
//     answer:
//       "You can designate trusted nominees and set up specific access rules. Nominees will only gain access according to your predetermined conditions and verification process.",
//   },
//   {
//     question: "What happens if I forget my master password?",
//     answer:
//       "We have a secure recovery process that verifies your identity through multiple factors. Your data remains safe while you regain access to your account.",
//   },
// ];

// const ManageCredentialsPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuthStore();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch((error) => {
//         console.log("Video autoplay failed:", error);
//       });
//     }
//   }, []);

//   const handleGetStarted = () => {
//     if (!isAuthenticated) {
//       navigate("/signin", { state: { from: "/manage-credentials" } });
//       return;
//     }

//     navigate("/payment", {
//       state: {
//         subscription: {
//           id: "starter",
//           title: "Starter Plan",
//           price: 0,
//           features: [
//             "Store unlimited credentials",
//             "Secure encryption",
//             "Multi-factor authentication",
//             "Mobile access",
//             "Email support",
//             "Regular security updates",
//           ],
//         },
//       },
//     });
//   };

//   return (
//     <div className="pt-20 min-h-screen bg-dark-100 md:px-8">
//       {/* Hero Section with Background Video */}
//       <div className="relative overflow-hidden">
//         {/* Background Video */}
//         <div className="absolute inset-0 w-full h-full">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             loop
//             playsInline
//             preload="auto"
//             className="absolute inset-0 w-full h-full object-cover"
//             poster="public/6036407_Document_Businessman_1280x720.mp4"
//           >
//             <source
//               src="/6036407_Document_Businessman_1280x720.mp4"
//               type="video/mp4"
//             />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-b from-dark-100/90 via-dark-100/70 to-dark-100/90" />
//         </div>

//         <div className="container mx-auto px-6 py-10 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-5xl md:text-6xl font-bold text-center mb-16 text-white leading-tight"
//             >
//               Manage Your Credentials
//             </motion.h1>

//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               {/* Text Section */}
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="space-y-6"
//               >
//                 <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed text-justify">
//                   <strong>
//                     Store all your credentials in one centralized location for
//                     easy access, eliminating the need to memorize them. This
//                     provides users with peace of mind regarding where to store
//                     countless credentials, making it easy to access these
//                     details anytime and anywhere, while ensuring security as a
//                     top priority.
//                   </strong>
//                 </p>

//                 <div className="flex space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleGetStarted}
//                     className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold"
//                   >
//                     Start For Free
//                   </motion.button>
//                   {/* <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/features")}
//                     className="px-8 py-4 rounded-lg border border-accent-100 text-accent-100 font-semibold"
//                   >
//                     Learn More
//                   </motion.button> */}
//                 </div>
//               </motion.div>

//               {/* Video Section */}
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="relative -top-5 aspect-[16/10] rounded-xl overflow-hidden glow-box group"
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80"
//                   alt="Credential Management"
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-dark-100/60" />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-accent-100/90 flex items-center justify-center backdrop-blur-sm"
//                 >
//                   <Play className="w-8 h-8 text-dark-100 ml-1" />
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Subscription Section */}
//       <section className="py-20 bg-dark-200">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               Start For Free
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Begin securing your digital assetswith our feature-rich free plan
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="relative p-8 rounded-xl glow-box bg-dark-100">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <span className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 font-semibold text-sm">
//                   MOST POPULAR
//                 </span>
//               </div>

//               <div className="text-center mb-8">
//                 <h3 className="text-3xl font-bold text-white mb-2">
//                   Free Forever
//                 </h3>
//                 <div className="flex justify-center items-baseline mb-4">
//                   <span className="text-5xl font-bold text-accent-100">₹0</span>
//                   <span className="text-xl text-gray-300 ml-2">/month</span>
//                 </div>
//                 <p className="text-gray-300">
//                   Everything you need to get started
//                 </p>
//               </div>

//               <div className="space-y-4 mb-8">
//                 {[
//                   "Store unlimited credentials",
//                   "Secure encryption",
//                   "Multi-factor authentication",
//                   "Mobile access",
//                   "Email support",
//                   "Regular security updates",
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center">
//                     <Check className="w-5 h-5 text-accent-100 mr-3" />
//                     <span className="text-gray-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleGetStarted}
//                 className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Get Started Now
//               </motion.button>

//               <p className="text-center text-sm text-gray-400 mt-4">
//                 No credit card required
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 bg-dark-200">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               Start For Free
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Begin securing your digital assetswith our feature-rich free plan
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="relative p-8 rounded-xl glow-box bg-dark-100">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <span className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 font-semibold text-sm">
//                   MOST POPULAR
//                 </span>
//               </div>

//               <div className="text-center mb-8">
//                 <h3 className="text-3xl font-bold text-white mb-2">
//                   Free Forever
//                 </h3>
//                 <div className="flex justify-center items-baseline mb-4">
//                   <span className="text-5xl font-bold text-accent-100">₹0</span>
//                   <span className="text-xl text-gray-300 ml-2">/month</span>
//                 </div>
//                 <p className="text-gray-300">
//                   Everything you need to get started
//                 </p>
//               </div>

//               <div className="space-y-4 mb-8">
//                 {[
//                   "Store unlimited credentials",
//                   "Secure encryption",
//                   "Multi-factor authentication",
//                   "Mobile access",
//                   "Email support",
//                   "Regular security updates",
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center">
//                     <Check className="w-5 h-5 text-accent-100 mr-3" />
//                     <span className="text-gray-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleGetStarted}
//                 className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Get Started Now
//               </motion.button>

//               <p className="text-center text-sm text-gray-400 mt-4">
//                 No credit card required
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Credential Types Section */}
//       <CredentialTypes />

//       {/* Security Features Section */}
//       <SecurityFeatures />

//       {/* FAQ Section */}
//       <FAQ faqs={faqs} />
//     </div>
//   );
// };

// export default ManageCredentialsPage;

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Play, Check } from "lucide-react";
// import useAuthStore from "../store/authStore";
// import FAQ from "../components/FAQ";
// import CredentialTypes from "../components/CredentialTypes";
// import SecurityFeatures from "../components/SecurityFeatures";
// import Footer from "../components/Footer";
// import { useSelector } from "react-redux";
// import VideoPlayer from "@/components/VideoPlayer";

// const faqs = [
//   {
//     question: "What types of credentials can I store?",
//     answer:
//       "You can store various types of credentials, including banking, investment, entertainment platforms, social media, gaming, and other platform credentials such as job portals, eCommerce, workplace accounts, etc. Each type has specific fields tailored to its requirements.",
//   },
//   {
//     question: "How secure is my data?",
//     answer:
//       "We use military-grade encryption and advanced security measures to protect your data. All credentials are encrypted both in transit and at rest, ensuring maximum security.",
//   },
//   {
//     question: "Can I access my credentials from multiple devices?",
//     answer:
//       "Yes, you can securely access your credentials from any device through our web interface. Multi-factor authentication ensures that only you can access your account.",
//   },
//   {
//     question: "How do I share credentials with nominees?",
//     answer:
//       "You can designate trusted nominees and set specific access rules. Nominees will only gain access based on your predetermined conditions and verification process.",
//   },
//   {
//     question: "What happens if I forget my master password?",
//     answer:
//       "We have a secure recovery process that verifies your identity through multiple factors. Your data remains safe while you regain access to your account.",
//   },
// ];

// const ManageCredentialsPage = () => {
//   const navigate = useNavigate();
//   // const { isAuthenticated } = useAuthStore();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   const handleGoToDown = () => {
//     if (isAuthenticated) {
//       const goToStartForFree = document.getElementById("gotostartforfree");
//       if (goToStartForFree) {
//         goToStartForFree.scrollIntoView({ behavior: "smooth" });
//       }
//     } else navigate("/signup");
//   };

//   const handleGetStarted = () => {
//     if (!isAuthenticated) {
//       navigate("/signin", { state: { from: "/payment" } });
//       return;
//     }

//     // navigate("/payment", {
//     //   state: {
//     //     subscription: {
//     //       id: "starter",
//     //       title: "Free Forever Plan",
//     //       price: 0,
//     //       features: [
//     //         "Store unlimited credentials",
//     //         "Secure encryption",
//     //         "Multi-factor authentication",
//     //         "Mobile access",
//     //         "Email support",
//     //         "Regular security updates",
//     //       ],
//     //     },
//     //   },
//     // });
//     navigate("/payment/success", {
//       state: {
//         subscription: {
//           id: "starter",
//           title: "Free Forever Plan",
//           price: 0,
//           features: [
//             "Store unlimited credentials",
//             "Secure encryption",
//             "Multi-factor authentication",
//             "Mobile access",
//             "Email support",
//             "Regular security updates",
//           ],
//         },
//         orderId: "free_" + Math.random().toString(36).substr(2, 9),
//       },
//     });
//   };

//   return (
//     <div className=" min-h-screen bg-dark-100">
//       {/* Hero Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-6 py-20 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-5xl md:text-6xl font-bold text-center mb-16 text-white leading-tight"
//             >
//               Manage Your Credentials
//             </motion.h1>

//             <div className="grid md:grid-cols-2 gap-12 items-center px-4">
//               {/* Text Section */}
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="space-y-6"
//               >
//                 <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
//                   <strong>
//                     Store all your credentials in one centralized location for
//                     easy access, eliminating the need to memorize them. This
//                     provides users with peace of mind regarding where to store
//                     countless credentials, making it easy to access these
//                     details anytime and anywhere, while ensuring security as a
//                     top priority.
//                   </strong>
//                 </p>

//                 <div className="flex space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     // onClick={handleGetStarted}
//                     onClick={handleGoToDown}
//                     className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold"
//                   >
//                     Start For Free
//                   </motion.button>
//                   {/* <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/features")}
//                     className="px-8 py-4 rounded-lg border border-accent-100 text-accent-100 font-semibold"
//                   >
//                     Learn More
//                   </motion.button> */}
//                 </div>
//               </motion.div>

//               {/* Video Section */}
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="relative top-0 md:-top-10 aspect-[11/6] rounded-xl overflow-hidden glow-box group"
//               >
//                 {/* <img
//                   src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80"
//                   alt="Credential Management"
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 /> */}
//                 <div className="absolute inset-0 bg-dark-100/60" />
//                 <VideoPlayer
//                   videoUrl="/assets/Images/Manageyourcredentials_video.mp4"
//                   thumbnailUrl="/assets/Images/managecredentials_thumbnail.jpg"
//                   title="Welcome to SacredSecret"
//                 />
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Credential Types Section */}
//       <CredentialTypes />

//       {/* Security Features Section */}
//       <SecurityFeatures />

//       {/* Subscription Section */}
//       {/* <section className="py-20 bg-dark-200">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               Start For Free
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Begin securing your digital assetswith our feature-rich free plan
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="relative p-8 rounded-xl glow-box bg-dark-100">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <span className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 font-semibold text-sm">
//                   MOST POPULAR
//                 </span>
//               </div>

//               <div className="text-center mb-8">
//                 <h3 className="text-3xl font-bold text-white mb-2">
//                   Free Forever
//                 </h3>
//                 <div className="flex justify-center items-baseline mb-4">
//                   <span className="text-5xl font-bold text-accent-100">₹0</span>
//                   <span className="text-xl text-gray-300 ml-2">/month</span>
//                 </div>
//                 <p className="text-gray-300">
//                   Everything you need to get started
//                 </p>
//               </div>

//               <div className="space-y-4 mb-8">
//                 {[
//                   "Store unlimited credentials",
//                   "Secure encryption",
//                   "Multi-factor authentication",
//                   "Mobile access",
//                   "Email support",
//                   "Regular security updates",
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center">
//                     <Check className="w-5 h-5 text-accent-100 mr-3" />
//                     <span className="text-gray-300">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleGetStarted}
//                 className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Get Started Now
//               </motion.button>

//               <p className="text-center text-sm text-gray-400 mt-4">
//                 No credit card required
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section> */}

//       <section className="py-20 bg-gradient-to-b from-dark-800 via-dark-700 to-dark-900">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2
//               className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
//               id="gotostartforfree"
//             >
//               Start For Free
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Begin securing your digital assets with our feature-rich free
//               plan.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="relative p-8 rounded-xl bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 shadow-md border border-dark-600 hover:shadow-xl hover:border-accent-100 transition-all duration-300">
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                 <span className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold text-sm shadow-md">
//                   MOST POPULAR
//                 </span>
//               </div>

//               <div className="text-center mb-8">
//                 <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
//                   Free Forever
//                 </h3>
//                 <div className="flex justify-center items-baseline mb-4">
//                   <span className="text-5xl font-extrabold text-accent-100">
//                     ₹0
//                   </span>
//                   <span className="text-xl text-gray-300 ml-2">/month</span>
//                 </div>
//                 <p className="text-gray-300 text-lg">
//                   Everything you need to get started.
//                 </p>
//               </div>

//               <div className="space-y-4 mb-8">
//                 {[
//                   "Store unlimited credentials",
//                   "Secure encryption",
//                   "Multi-factor authentication",
//                   "Mobile access",
//                   "Email support",
//                   "Regular security updates",
//                 ].map((feature, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center text-gray-300 hover:text-white transition-colors"
//                   >
//                     <Check className="w-6 h-6 text-accent-100 mr-3" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{
//                   scale: 1.03,
//                   backgroundColor: "#2C2F33",
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleGetStarted}
//                 className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-bold text-lg hover:opacity-90 transition-all"
//               >
//                 Get Started Now
//               </motion.button>

//               {/* <p className="text-center text-sm text-gray-400 mt-6">
//                 No credit card required.
//               </p> */}

//               {/* Persistent Glow Effect */}
//               <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-accent-100/10 to-accent-200/10 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <FAQ faqs={faqs} />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ManageCredentialsPage;

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import FAQ from "../components/FAQ";
import CredentialTypes from "../components/CredentialTypes";
import SecurityFeatures from "../components/SecurityFeatures";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";

const faqs = [
  {
    question: "What types of credentials can I store?",
    answer:
      "You can store various types of credentials, including banking, investment, entertainment platforms, social media, gaming, and other platform credentials such as job portals, eCommerce, workplace accounts, etc.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use military-grade encryption and advanced security measures to protect your data. All credentials are encrypted both in transit and at rest, ensuring maximum security.",
  },
  {
    question: "Can I access my credentials from multiple devices?",
    answer:
      "Yes, you can securely access your credentials from any device through our web interface. Multi-factor authentication ensures that only you can access your account.",
  },
  {
    question: "How do I share credentials with nominees?",
    answer:
      "You can designate trusted nominees and set specific access rules. Nominees will only gain access based on your predetermined conditions and verification process.",
  },
  {
    question: "What happens if I forget my master password?",
    answer:
      "We have a secure recovery process that verifies your identity through multiple factors. Your data remains safe while you regain access to your account.",
  },
];

const ManageCredentialsPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const videoRef = useRef(null);

  const handleGoToDown = () => {
    if (isAuthenticated) {
      const goToStartForFree = document.getElementById("gotostartforfree");
      if (goToStartForFree) {
        goToStartForFree.scrollIntoView({ behavior: "smooth" });
      }
    } else navigate("/signup");
  };

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/payment" } });
      return;
    }

    navigate("/payment/success", {
      state: {
        subscription: {
          id: "starter",
          title: "Free Forever Plan",
          price: 0,
          features: [
            "Store unlimited credentials",
            "Secure encryption",
            "Multi-factor authentication",
            "Mobile access",
            "Email support",
            "Regular security updates",
          ],
        },
        orderId: "free_" + Math.random().toString(36).substr(2, 9),
      },
    });
  };

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-screen-xl px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-center mb-16 text-white leading-tight"
            >
              Manage Your Credentials
            </motion.h1>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              style={{ alignItems: "stretch" }}
            >
              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-8 flex flex-col justify-center"
              >
                <p className="text-2xl md:text-2xl text-gray-300 leading-relaxed">
                  <strong>
                    Store all your credentials in one centralized location for
                    easy access, eliminating the need to memorize them. This
                    provides users with peace of mind regarding where to store
                    countless credentials, making it easy to access these
                    details anytime and anywhere, while ensuring security as a
                    top priority.
                  </strong>
                </p>

                <div className="flex space-x-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoToDown}
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold"
                  >
                    Start For Free
                  </motion.button>
                </div>
              </motion.div>

              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-8 flex justify-center items-center"
              >
                <div
                  className="w-full rounded-lg overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <VideoPlayer
                    videoUrl="/assets/Images/managecredentials.mp4"
                    thumbnailUrl="/assets/Images/managecredentials_thumbnail.jpg"
                    title="Welcome to SacredSecret"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credential Types Section */}
      <CredentialTypes />

      {/* Security Features Section */}
      <SecurityFeatures />

      {/* Subscription Section */}
      <section className="py-20 bg-gradient-to-b from-dark-800 via-dark-700 to-dark-900">
        <div className="container mx-auto max-w-screen-xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
              id="gotostartforfree"
            >
              Start For Free
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Begin securing your digital assets with our feature-rich free
              plan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative p-8 rounded-xl bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 shadow-md border border-dark-600 hover:shadow-xl hover:border-accent-100 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold text-sm shadow-md">
                  MOST POPULAR
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
                  Free Forever
                </h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-accent-100">
                    ₹0
                  </span>
                  <span className="text-xl text-gray-300 ml-2">/month</span>
                </div>
                <p className="text-gray-300 text-lg">
                  Everything you need to get started.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Store unlimited credentials",
                  "Secure encryption",
                  "Multi-factor authentication",
                  "Mobile access",
                  "Email support",
                  "Regular security updates",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Check className="w-6 h-6 text-accent-100 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetStarted}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-bold text-lg hover:opacity-90 transition-all"
              >
                Get Started Now
              </motion.button>

              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-accent-100/10 to-accent-200/10 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageCredentialsPage;
