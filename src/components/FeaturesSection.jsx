// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Shield, Bell, Users } from "lucide-react";
// import useScrollReveal from "../hooks/useScrollReveal";

// const features = [
//   {
//     title: "Manage Your Credentials",
//     description:
//       "Securely store and manage all your digital credentials in one place.",
//     icon: Shield,
//     image:
//       "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800",
//     hoverEffect: "hover-float",
//     path: "/manage-credentials",
//   },
//   {
//     title: "Smart Notifications",
//     description: "Stay informed with intelligent alerts and timely updates.",
//     icon: Bell,
//     image:
//       "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
//     hoverEffect: "hover-scale",
//     path: "/smart-notifications",
//   },
//   {
//     title: "Choose Your Nominee",
//     description: "Select and manage trusted nominees for your digital legacy.",
//     icon: Users,
//     image:
//       "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
//     hoverEffect: "hover-tilt",
//     path: "/choose-nominee",
//   },
// ];

// const FeatureCard = ({ feature, index }) => {
//   const ref = useScrollReveal({
//     threshold: 0.2,
//     rootMargin: "-50px",
//   });
//   const navigate = useNavigate();

//   const handleFeatureClick = () => {
//     navigate(feature.path);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       ref={ref}
//       onClick={handleFeatureClick}
//       className={`scroll-reveal glow-box ${feature.hoverEffect} overflow-hidden cursor-pointer group`}
//     >
//       <div className="aspect-video relative overflow-hidden">
//         <img
//           src={feature.image}
//           alt={feature.title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           loading={index === 0 ? "eager" : "lazy"}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
//       </div>

//       <div className="p-6 relative">
//         <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
//         <h3 className="text-xl font-semibold mb-2 text-white">
//           {feature.title}
//         </h3>
//         <p className="text-gray-300">{feature.description}</p>
//       </div>
//     </div>
//   );
// };

// const FeaturesSection = () => {
//   const headerRef = useScrollReveal({
//     threshold: 0.5,
//   });

//   return (
//     <section
//       className="py-20 bg-gradient-to-b from-dark-100 via-dark-200 to-dark-100"
//       id="features"
//     >
//       <div className="container mx-auto px-6">
//         <div ref={headerRef} className="scroll-reveal text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
//             Features & Services
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Discover how SacredSecret empowers you to manage and protect your
//             digital legacy
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard key={feature.title} feature={feature} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

// new UI
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, Users } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const features = [
  {
    title: "Manage Your Credentials",
    description:
      "Securely store and manage all your digital credentials in one place.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800",
    path: "/manage-credentials",
  },
  {
    title: "Smart Notifications",
    description: "Stay informed with intelligent alerts and timely updates.",
    icon: Bell,
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    path: "/smart-notifications",
  },
  {
    title: "Choose Your Nominee",
    description: "Select and manage trusted nominees for your digital legacy.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    path: "/choose-nominee",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useScrollReveal({
    threshold: 0.2,
    rootMargin: "-50px",
  });
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    navigate(feature.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      onClick={handleFeatureClick}
      className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 bg-white"
    >
      {/* Background Image */}
      <div className="relative aspect-w-16 aspect-h-9">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        {/* Icon at Top Right */}
        <div className="absolute top-4 right-4 bg-accent-100 text-dark-100 rounded-full p-2 shadow-lg">
          <feature.icon className="w-6 h-6" />
        </div>
      </div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
        <p className="text-sm text-gray-300">{feature.description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const headerRef = useScrollReveal({
    threshold: 0.5,
  });

  return (
    <section
      className="py-20 bg-gradient-to-b from-dark-100 via-dark-200 to-dark-100"
      id="features"
    >
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="scroll-reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Features & Services
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover how SacredSecret empowers you to Manage and Protect your Digital Assets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
