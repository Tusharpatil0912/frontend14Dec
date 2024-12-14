// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
// import { useForm } from "react-hook-form";
// import useAuth from "../hooks/useAuth";
// import { authImages } from "../assets/images/auth";
// import { authContent } from "../assets/content/auth";

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { register: registerUser, loading } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const content = authContent.signUp;

//   const password = watch("password", "");

//   const passwordCriteria = [
//     { label: "At least 8 characters", test: (value) => value.length >= 8 },
//     {
//       label: "Contains uppercase letter",
//       test: (value) => /[A-Z]/.test(value),
//     },
//     {
//       label: "Contains lowercase letter",
//       test: (value) => /[a-z]/.test(value),
//     },
//     { label: "Contains number", test: (value) => /\d/.test(value) },
//     {
//       label: "Contains special character",
//       test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
//     },
//   ];

//   const onSubmit = async (data) => {
//     try {
//       await registerUser(data);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
//       >
//         <div className="pt-16">
//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </button>

//           <div className="max-w-md mx-auto">
//             <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//               {content.title}
//             </h2>
//             <p className="text-gray-300 mb-8">{content.subtitle}</p>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   {...register("fullName", {
//                     required: "Full name is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="John Doe"
//                 />
//                 {errors.fullName && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.fullName.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="john@example.com"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   {...register("phone", {
//                     required: "Phone number is required",
//                   })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="+1 (555) 000-0000"
//                 />
//                 {errors.phone && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.phone.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Country
//                 </label>
//                 <input
//                   {...register("country", { required: "Country is required" })}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="United States"
//                 />
//                 {errors.country && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.country.message}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Password
//                 </label>
//                 <input
//                   {...register("password", {
//                     required: "Password is required",
//                     validate: (value) => {
//                       const failedCriteria = passwordCriteria.filter(
//                         (c) => !c.test(value)
//                       );
//                       return (
//                         failedCriteria.length === 0 ||
//                         "Password must meet all criteria below"
//                       );
//                     },
//                   })}
//                   type={showPassword ? "text" : "password"}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Enter password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 text-gray-400 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password criteria checklist */}
//               <div className="space-y-2 p-4 bg-dark-200 rounded-lg">
//                 <p className="text-sm font-medium text-gray-300 mb-2">
//                   Password must contain:
//                 </p>
//                 {passwordCriteria.map((criteria, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     {criteria.test(password) ? (
//                       <Check className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <X className="w-4 h-4 text-red-500" />
//                     )}
//                     <span
//                       className={`text-sm ${
//                         criteria.test(password)
//                           ? "text-green-500"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {criteria.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Confirm Password
//                 </label>
//                 <input
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   })}
//                   type={showConfirmPassword ? "text" : "password"}
//                   className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                   placeholder="Confirm password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-9 text-gray-400 hover:text-white"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-400">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//               >
//                 {loading ? "Creating Account..." : "Register"}
//               </button>

//               <p className="text-center text-gray-300">
//                 Already have an account?{" "}
//                 <Link
//                   to="/signin"
//                   className="text-accent-100 hover:text-accent-200 transition-colors"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="hidden md:block w-1/2 relative"
//       >
//         <div className="absolute inset-0">
//           <img
//             src={authImages.signUp}
//             alt={content.imageAlt}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center p-8">
//               <h2 className="text-4xl font-bold mb-4 text-white">
//                 {content.rightPanelTitle}
//               </h2>
//               <p className="text-xl text-gray-300">{content.rightPanelText}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { authImages } from "../assets/images/auth";
import { authContent } from "../assets/content/auth";
import { useRegisterMutation } from "@/features/api/userApiSlice";
import toast from "react-hot-toast";
import { setloginId } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { register: registerUser, loading } = useAuth();
  const [registerUser, { isLoading: loading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const content = authContent.signUp;

  const password = watch("password", "");

  const passwordCriteria = [
    { label: "At least 8 characters", test: (value) => value.length >= 8 },
    {
      label: "Contains uppercase letter",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      label: "Contains lowercase letter",
      test: (value) => /[a-z]/.test(value),
    },
    { label: "Contains number", test: (value) => /\d/.test(value) },
    {
      label: "Contains special character",
      test: (value) => /[!@#$%^&*(),.?\":{}|<>]/.test(value),
    },
  ];

  const onSubmit = async (data) => {
    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        password: data.password,
      };

      const response = await registerUser(userData).unwrap();

      if (response.user && response.user.id) {
        toast.success(
          "Registration successful! Please check your email for verification code."
        );
        dispatch(
          setloginId({
            email: response.user.email,
            username: response.user.username,
          })
        );
        navigate("/verify");
      } else {
        toast.error(response.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error?.data?.error || "Error registering user. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
      >
        <div className="px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              {content.title}
            </h2>
            <p className="text-gray-300 mb-8">{content.subtitle}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="1234567784"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      const failedCriteria = passwordCriteria.filter(
                        (c) => !c.test(value)
                      );
                      return (
                        failedCriteria.length === 0 ||
                        "Password must meet all criteria below"
                      );
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Enter password"
                  onFocus={() => setShowPasswordTooltip(true)}
                  onBlur={() => setShowPasswordTooltip(false)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
                {/* Tooltip for password criteria */}
                {showPasswordTooltip && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-dark-200 border border-dark-300 rounded-lg shadow-lg p-4 z-10">
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Password must contain:
                    </p>
                    {passwordCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {criteria.test(password) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm ${
                            criteria.test(password)
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {criteria.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

              <p className="text-center text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-accent-100 hover:text-accent-200 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block w-1/2 relative"
      >
        <div className="absolute inset-0">
          <img
            src={authImages.signUp}
            alt={content.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {content.rightPanelTitle}
              </h2>
              <p className="text-xl text-gray-300">{content.rightPanelText}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
