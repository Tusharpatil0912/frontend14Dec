// import React, { useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";
// import VideoPlayer from "./VideoPlayer";

// const Hero = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuthStore();
//   const controls = useAnimation();
//   const contentControls = useAnimation();

//   const location = useLocation();

//   useEffect(() => {
//     // Scroll to the top whenever the Hero component is rendered or the route changes
//     window.scrollTo(0, 0);
//   }, [location]);

//   const y = useTransform(scrollY, [0, 300], [0, 100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   const handleGetStarted = async () => {
//     if (isAuthenticated) {
//       const featuresSection = document.getElementById("features");
//       if (featuresSection) {
//         featuresSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       await Promise.all([
//         controls.start({
//           y: [0, window.innerHeight],
//           scale: [1, 2],
//           transition: { duration: 1.5, ease: "easeInOut" },
//         }),
//         contentControls.start({
//           opacity: 0,
//           transition: { duration: 0.75, ease: "easeOut" },
//         }),
//       ]);

//       navigate("/signup");
//     }
//   };

//   const titleVariants = {
//     initial: {
//       y: 0,
//       scale: 1,
//     },
//     animate: {
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 1.5,
//       },
//     },
//     exit: {
//       y: window.innerHeight,
//       scale: 2,
//       transition: {
//         duration: 1.5,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const contentVariants = {
//     initial: { opacity: 1 },
//     exit: {
//       opacity: 0,
//       transition: {
//         duration: 0.75,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative min-h-screen bg-dark-100 overflow-hidden md:px-8"
//     >
//       <motion.div
//         style={{ y, opacity }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
//         >
//           <source src="/videos/hero-bg.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-gradient-to-b from-dark-100/80 via-dark-100/60 to-dark-100/80" />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-20 container mx-auto px-6 pt-32"
//       >
//         <div className="text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-3xl md:text-4xl font-light text-white mb-4"
//           >
//             Welcome To
//           </motion.h2>
//           <motion.h1
//             variants={titleVariants}
//             initial="initial"
//             animate={controls}
//             className="text-6xl md:text-8xl font-bold text-white cursor-default"
//           >
//             SacredSecret
//           </motion.h1>
//         </div>

//         <motion.div
//           variants={contentVariants}
//           initial="initial"
//           animate={contentControls}
//           className="grid md:grid-cols-12 gap-12 items-center max-w-8xl mx-auto"
//         >
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="md:col-span-7 text-left"
//           >
//             <div className="space-y-6">
//               <p className="text-xl md:text-3xl leading-relaxed text-white font-semibold md:text-justify">
//                 "SacredSecret empowers individuals with rights over their
//                 assets, both in digital and physical form. The name allows users
//                 to select their nominee according to their wishes and choose who
//                 will inherit or access their assets. 'Sacred' refers to the
//                 sanctity of their will, which is kept a Secret, shared only with
//                 the chosen individual, and independent of defined
//                 societal/system norms."
//               </p>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleGetStarted}
//               className="mt-12 px-12 py-6 text-2xl font-semibold rounded-2xl bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 hover:opacity-90 transition-opacity"
//             >
//               Get Started
//             </motion.button>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="md:col-span-5 relative"
//           >
//             <div className="relative aspect-[5/4] rounded-xl overflow-hidden shadow-2xl">
//               <VideoPlayer
//                 videoUrl="/videos/sacred-secret-intro.mp4"
//                 thumbnailUrl="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80"
//                 title="Welcome to SacredSecret"
//               />
//             </div>
//             <motion.h3
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.8 }}
//               className="text-2xl font-semibold text-center mt-6 text-white"
//             >
//               Let's Hear What Is SacredSecret
//             </motion.h3>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Hero;

// import React, { useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";
// import VideoPlayer from "./VideoPlayer";
// import { useSelector } from "react-redux";

// const Hero = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll();
//   const navigate = useNavigate();
//   // const { isAuthenticated } = useAuthStore();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const controls = useAnimation();
//   const contentControls = useAnimation();

//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   const y = useTransform(scrollY, [0, 300], [0, 100]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//   const handleGetStarted = async () => {
//     if (isAuthenticated) {
//       const featuresSection = document.getElementById("features");
//       if (featuresSection) {
//         featuresSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       await Promise.all([
//         controls.start({
//           y: [0, window.innerHeight],
//           scale: [1, 2],
//           transition: { duration: 1.5, ease: "easeInOut" },
//         }),
//         contentControls.start({
//           opacity: 0,
//           transition: { duration: 0.75, ease: "easeOut" },
//         }),
//       ]);

//       navigate("/signup");
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative min-h-screen bg-dark-100 overflow-hidden md:px-8"
//     >
//       <motion.div
//         style={{ y, opacity }}
//         className="absolute inset-0 w-full h-full"
//       >
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           // poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
//         >
//           <source src="/assets/Images/Grandpa_Gathering.mp4" type="video/mp4" />
//         </video>
//         {/* Enhanced gradient overlay for more fade */}
//         <div className="absolute inset-0 bg-gradient-to-b from-dark-100/95 via-dark-100/75 to-dark-100/95" />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-20 container mx-auto px-6 pt-32"
//       >
//         <div className="text-center mb-16">
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-3xl md:text-4xl font-light text-white mb-4"
//           >
//             Welcome To
//           </motion.h2>
//           <motion.h1
//             initial="initial"
//             animate={controls}
//             className="text-5xl md:text-7xl font-bold text-white cursor-default"
//           >
//             SacredSecret
//           </motion.h1>
//         </div>

//         {/* Content Section */}
//         <motion.div
//           initial="initial"
//           animate={contentControls}
//           className="grid md:grid-cols-2 gap-12 items-start auto-rows-auto max-w-7xl mx-auto"
//         >
//           {/* Text Block */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-left flex items-center"
//           >
//             <div className="space-y-6">
//               <p
//                 className="text-xl md:text-2xl leading-relaxed text-white font-semibold"
//                 style={{ fontSize: "1.6rem", lineHeight: "2.2rem" }}
//               >
//                 SacredSecret empowers individuals with rights over their assets,
//                 both in digital and physical form. The name allows users to
//                 select their nominee according to their wishes and choose who
//                 will inherit or access their assets. 'Sacred' refers to the
//                 sanctity of their will, which is kept a Secret, shared only with
//                 the chosen individual, and independent of defined
//                 societal/system norms.
//               </p>
//             </div>
//           </motion.div>

//           {/* Video Player */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex items-center"
//           >
//             <div className="relative w-full max-h-[320px] rounded-xl overflow-hidden shadow-2xl">
//               <VideoPlayer
//                 videoUrl="/invideo-ai-720 Manage Your Credentials with Ease! 2024-12-02.mp4"
//                 thumbnailUrl="/thumbnail1.jpeg"
//                 title="Welcome to SacredSecret"
//               />
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Get Started Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="grid md:grid-cols-2 gap-12 items-start auto-rows-auto max-w-7xl mx-auto"
//         >
//           <div className="w-full flex justify-start mt-8">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleGetStarted}
//               className="px-8 py-4 text-lg md:text-xl font-semibold rounded-2xl bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 hover:opacity-90 transition-opacity"
//             >
//               Get Started
//             </motion.button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Hero;

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const controls = useAnimation();
  const contentControls = useAnimation();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      await Promise.all([
        controls.start({
          y: [0, window.innerHeight],
          scale: [1, 2],
          transition: { duration: 1.5, ease: "easeInOut" },
        }),
        contentControls.start({
          opacity: 0,
          transition: { duration: 0.75, ease: "easeOut" },
        }),
      ]);

      navigate("/signup");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-dark-100 overflow-hidden px-4 lg:p-12 xl:p-12"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/Images/Grandpa_Gathering.mp4" type="video/mp4" />
        </video>
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/95 via-dark-100/75 to-dark-100/95" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 max-w-6xl mx-auto py-16"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-light text-white mb-4"
          >
            Welcome To
          </motion.h2>
          <motion.h1
            initial="initial"
            animate={controls}
            className="text-5xl md:text-7xl font-bold text-white cursor-default"
          >
            SacredSecret
          </motion.h1>
        </div>

        <motion.div
          initial="initial"
          animate={contentControls}
          className="grid md:grid-cols-2 gap-12 items-stretch max-w-7xl mx-auto"
        >
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-left flex flex-col justify-between"
          >
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white font-semibold">
              SacredSecret empowers individuals with rights over their assets,
              both in digital and physical form. The name allows users to select
              their nominee according to their wishes and choose who will
              inherit or access their assets. 'Sacred' refers to the sanctity of
              their will, which is kept a Secret, shared only with the chosen
              individual, and independent of defined societal/system norms.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative flex justify-center items-stretch"
          >
            <div className="relative w-full h-full max-h-[600px] aspect-auto rounded-xl overflow-hidden shadow-xl">
              <VideoPlayer
                videoUrl="/invideo-ai-720 Manage Your Credentials with Ease! 2024-12-02.mp4"
                thumbnailUrl="/thumbnail1.jpeg"
               // title="Welcome to SacredSecret"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-start mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="px-8 py-4 text-lg md:text-xl font-semibold rounded-2xl bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 hover:opacity-90 transition-opacity"
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
