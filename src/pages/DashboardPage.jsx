import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Bell,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Settings,
  CreditCard,
  History,
  FileText,
  HelpCircle,
  X,
  CheckCircle,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import Footer from "../components/Footer";
import DashboardCredentials from "../components/dashboard/DashboardCredentials";
import DashboardNotifications from "../components/dashboard/DashboardNotifications";
import DashboardNominee from "../components/dashboard/DashboardNominee";

const features = [
  {
    id: "credentials",
    title: "Manage Credentials",
    icon: Shield,
    status: "Active",
    nextBilling: "2024-03-15",
    price: "₹0.00/month",
    description: "Securely Store and Manage all your Digital Credentials in One Place",
    color: "from-blue-500 to-indigo-500",
    bgImage:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    component: DashboardCredentials,
  },
  {
    id: "notifications",
    title: "Smart Notifications",
    icon: Bell,
    status: "Trial",
    nextBilling: "2024-03-10",
    price: "₹0.00/month",
    description: "Stay informed with intelligent alerts and updates",
    color: "from-purple-500 to-pink-500",
    bgImage:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    component: DashboardNotifications,
  },
  {
    id: "nominee",
    title: "Choose Nominee",
    icon: Users,
    status: "Inactive",
    price: "₹0.00/month",
    description: "Select and manage trusted nominees",
    color: "from-green-500 to-teal-500",
    bgImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    component: DashboardNominee,
  },
];

const SettingsModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-dark-200 rounded-xl w-full max-w-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Settings</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-300 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <CreditCard className="w-5 h-5 text-accent-100" />
              <span className="text-white">Purchase History</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <History className="w-5 h-5 text-accent-100" />
              <span className="text-white">Subscription Management</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <FileText className="w-5 h-5 text-accent-100" />
              <span className="text-white">Account Settings</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors">
              <HelpCircle className="w-5 h-5 text-accent-100" />
              <span className="text-white">Help & Support</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="relative p-6 rounded-lg bg-gradient-to-br from-dark-300 to-dark-400 shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend !== undefined && (
        <div
          className={`flex items-center text-sm font-medium ${
            trend > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          <TrendingUp
            className={`w-4 h-4 mr-1 ${trend > 0 ? "rotate-0" : "rotate-180"}`}
          />
          <span>
            {trend > 0 ? "+" : "-"}
            {Math.abs(trend)}%
          </span>
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h4 className="text-base font-medium text-gray-400">{title}</h4>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

// const StatCard = ({ icon: Icon, title, value, trend }) => (
//   <motion.div
//     whileHover={{ scale: 1.03 }}
//     className="relative p-6 rounded-lg bg-gradient-to-br from-dark-300 to-dark-400 shadow-md hover:shadow-xl transition-all duration-300"
//   >
//     {/* Icon positioned outside the card */}
//     <div className="absolute -top-6 left-4 p-4 w-14 h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-lg flex items-center justify-center rounded-md">
//       <Icon className="w-8 h-8 text-white" />
//     </div>

//     {/* Card Content */}
//     <div className="pt-10 flex items-center justify-between">
//       <div>
//         <h4 className="text-base font-medium text-gray-400">{title}</h4>
//         <p className="text-3xl font-extrabold text-white">{value}</p>
//       </div>
//       {trend !== undefined && (
//         <div
//           className={`flex items-center text-sm font-medium ${
//             trend > 0 ? "text-green-400" : "text-red-400"
//           }`}
//         >
//           <TrendingUp
//             className={`w-4 h-4 mr-1 ${trend > 0 ? "rotate-0" : "rotate-180"}`}
//           />
//           <span>
//             {trend > 0 ? "+" : "-"}
//             {Math.abs(trend)}%
//           </span>
//         </div>
//       )}
//     </div>
//   </motion.div>
// );

const FeatureCard = ({ feature, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
      isActive ? "ring-2 ring-accent-100" : ""
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute inset-0">
      <img
        src={feature.bgImage}
        alt={feature.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}
      />
    </div>

    <div className="relative p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
            feature.status === "Active"
              ? "bg-green-500/20 text-green-100"
              : feature.status === "Trial"
              ? "bg-yellow-500/20 text-yellow-100"
              : "bg-red-500/20 text-red-100"
          }`}
        >
          {feature.status}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
      <p className="text-sm mb-4 text-white/80">{feature.description}</p>
      <p className="text-lg font-bold text-white">{feature.price}</p>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [activeFeature, setActiveFeature] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const ActiveFeatureComponent = activeFeature
    ? features.find((f) => f.id === activeFeature)?.component
    : null;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back, {user?.fullName}
              </h1>
              <p className="text-gray-400 text-lg">
                Your personal dashboard to manage your digital assets
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-md hover:shadow-xl transition-all"
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Stats Overview */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={Shield}
              title="Total Credentials"
              value="17"
              trend={5}
            />
            <StatCard
              icon={Activity}
              title="Active Services"
              value="8"
              trend={2}
            />
            <StatCard icon={Clock} title="Last Update" value="2h ago" />
            <StatCard icon={CheckCircle} title="Today's Activity" value="2" />
          </div>

          {!activeFeature ? (
            /* Main Features Grid */
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                />
              ))}
            </div>
          ) : (
            /* Active Feature Component */
            <div className="mb-12">
              {ActiveFeatureComponent && <ActiveFeatureComponent />}
            </div>
          )}
        </motion.div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <Footer />
    </div>
  );
};

export default DashboardPage;
