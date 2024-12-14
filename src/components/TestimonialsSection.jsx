import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Digital Asset Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content:
      "Over Rs 82,000 crore in unclaimed assets are lying in forgotten investments, including dormant bank accounts, insurance policy maturity income, and life savings in inactive Provident Fund accounts.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    content:
      "With 700 million Indians using smartphones, the average individual has at least 30-50 online accounts registered through email IDs, phone numbers, or both.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Financial Advisor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    content:
      "Globally, SaaS waste (Software as a Service being bought but not used) increases by 80% annually, while abandoned subscriptions rise by as much as 100%.",
    rating: 5,
  },
];

// const TestimonialsSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [ref, inView] = useInView({
//     triggerOnce: false,
//     threshold: 0.2,
//   });

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   const paginate = (newDirection) => {
//     setDirection(newDirection);
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex + newDirection + testimonials.length) % testimonials.length
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (inView) {
//         paginate(1);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [inView]);

//   return (
//     <motion.section
//       ref={ref}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: inView ? 1 : 0 }}
//       transition={{ duration: 0.8 }}
//       className="py-20 bg-dark-100 overflow-hidden"
//       id="testimonials"
//     >
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             What Our Users Say
//           </h2>
//         </motion.div>

//         <div className="relative max-w-4xl mx-auto">
//           <div className="relative h-[400px]">
//             <AnimatePresence initial={false} custom={direction}>
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 },
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);
//                   if (swipe < -swipeConfidenceThreshold) {
//                     paginate(1);
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     paginate(-1);
//                   }
//                 }}
//                 className="absolute w-full"
//               >
//                 <motion.div
//                   className="glow-box p-8"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="flex flex-col items-center">
//                     <motion.img
//                       src={testimonials[currentIndex].image}
//                       alt={testimonials[currentIndex].name}
//                       className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-accent-100"
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     />
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="flex mb-4"
//                     >
//                       {[...Array(testimonials[currentIndex].rating)].map(
//                         (_, i) => (
//                           <Star
//                             key={i}
//                             className="w-5 h-5 text-accent-100 fill-current"
//                           />
//                         )
//                       )}
//                     </motion.div>
//                     <motion.blockquote
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                       className="text-xl text-gray-300 text-center mb-6 italic"
//                     >
//                       "{testimonials[currentIndex].content}"
//                     </motion.blockquote>
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <h4 className="text-lg font-semibold text-white">
//                         {testimonials[currentIndex].name}
//                       </h4>
//                       <p className="text-accent-100">
//                         {testimonials[currentIndex].role}
//                       </p>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <motion.div
//             className="absolute left-0 right-0 bottom-0 flex justify-center space-x-2 mt-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setDirection(index > currentIndex ? 1 : -1);
//                   setCurrentIndex(index);
//                 }}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex
//                     ? "bg-accent-100 scale-125"
//                     : "bg-dark-300 hover:bg-accent-100/50"
//                 }`}
//               />
//             ))}
//           </motion.div>

//           <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => paginate(-1)}
//               className="p-3 rounded-full bg-dark-200/50 text-accent-100 pointer-events-auto hover:bg-dark-200 transition-colors"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => paginate(1)}
//               className="p-3 rounded-full bg-dark-200/50 text-accent-100 pointer-events-auto hover:bg-dark-200 transition-colors"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (inView) {
        paginate(1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-dark-100 relative overflow-hidden"
      id="testimonials"
    // style={{
    //   backgroundImage: "url('/path-to-your-bg-image.jpg')",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    // }}
    >
      {/* Dark Faded Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="container mx-auto max-w-4xl px-6 py-12 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            News Articles
          </h2>
        </motion.div>

        {/* Slider Content */}
        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <motion.div className="absolute left-0 z-10 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-dark-200/50 text-accent-100 pointer-events-auto hover:bg-dark-200 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Card */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full max-w-lg"
            >
              <motion.div
                className="p-6 rounded-lg shadow-lg bg-cover bg-center relative"
                style={{
                  backgroundImage: "url()",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Dark Overlay for Text */}
                <div className="absolute inset-0 bg-black/70 rounded-lg"></div>

                {/* Card Content */}
                <div className="relative z-10 text-white text-center p-6">
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl italic mb-4"
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.blockquote>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl font-bold"
                  >
                    {testimonials[currentIndex].title}
                  </motion.h3>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right Button */}
          <motion.div className="absolute right-0 z-10 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-dark-200/50 text-accent-100 pointer-events-auto hover:bg-dark-200 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <motion.div
          className="mt-6 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-accent-100 scale-125"
                  : "bg-dark-300 hover:bg-accent-100/50"
                }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
export default TestimonialsSection;
