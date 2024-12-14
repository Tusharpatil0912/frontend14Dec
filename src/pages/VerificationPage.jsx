// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAuth } from "../hooks/useAuth";
// import useAuthStore from "../store/authStore";
// import { authImages } from "../assets/images/auth";
// import { authContent } from "../assets/content/auth";
// import { useSelector } from "react-redux";
// import { useVerifyMutation } from "@/features/api/userApiSlice";

// const VerificationPage = () => {
//   const navigate = useNavigate();
//   const { verify, resendVerificationCode, loading } = useAuth();
//   const verificationEmail = useAuthStore((state) => state.verificationEmail);
//   const verificationUsername = useSelector(
//     (state) => state.auth.loginIdUsername
//   );
//   const [verifyCode, { isLoading }] = useVerifyMutation();

//   const [verificationCode, setVerificationCode] = useState([
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//   ]);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
//   const inputs = Array(6).fill(0);
//   const content = authContent.verification;

//   // useEffect(() => {
//   //   if (!verificationEmail) {
//   //     navigate("/signup");
//   //     return;
//   //   }

//   useEffect(() => {
//     if (!verificationUsername) {
//       navigate("/signup");
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [verificationEmail, navigate]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleChange = (index, value) => {
//     if (value.length <= 1) {
//       const newCode = [...verificationCode];
//       newCode[index] = value;
//       setVerificationCode(newCode);

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.querySelector(
//           `input[name=code-${index + 1}]`
//         );
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
//       const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const code = verificationCode.join("");
//   //   if (code.length === 6) {
//   //     try {
//   //       await verify({ email: verificationEmail, code });
//   //     } catch (error) {
//   //       console.error("Verification error:", error);
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const code = verificationCode.join(""); // Combine the 6-digit code into a string

//     if (code.length === 6) {
//       try {
//         const response = await verifyCode({
//           loginId: verificationUsername,
//           code,
//         }).unwrap();

//         console.log(
//           "Verification response:",
//           response.success,
//           response.ok,
//           response.status == 200,
//           response.message?.includes("successfully")
//         );

//         if (response.message?.includes("successfully")) {
//           toast.success("Verification successful!");
//           navigate("/verification-success");
//         } else {
//           toast.error(response.message || "Verification failed.");
//         }
//       } catch (error) {
//         console.error("Verification error:", error);
//         toast.error(
//           error?.data?.message || "Error verifying the code. Please try again."
//         );
//       }
//     }
//   };

//   const handleResendCode = async () => {
//     if (timeLeft === 0) {
//       try {
//         await resendVerificationCode(verificationEmail);
//         setTimeLeft(300); // Reset timer to 5 minutes
//       } catch (error) {
//         console.error("Resend code error:", error);
//       }
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
//         <div className="max-w-md mx-auto">
//           <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
//             {content.title}
//           </h2>
//           <p className="text-gray-300 mb-8">
//             {content.subtitle} {verificationEmail}
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex justify-between">
//               {inputs.map((_, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name={`code-${index}`}
//                   maxLength={1}
//                   value={verificationCode[index]}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
//                 />
//               ))}
//             </div>

//             <div className="text-center">
//               <p className="text-gray-300 mb-4">
//                 Time remaining:{" "}
//                 <span className="text-accent-100">{formatTime(timeLeft)}</span>
//               </p>
//               <button
//                 type="button"
//                 onClick={handleResendCode}
//                 disabled={timeLeft > 0 || loading}
//                 className="text-accent-100 hover:text-accent-200 transition-colors disabled:opacity-50"
//               >
//                 Resend Code
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading || verificationCode.some((v) => !v)}
//               className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
//             >
//               {isLoading ? "Verifying..." : "Verify"}
//             </button>
//           </form>
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
//             src={authImages.verification}
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

// export default VerificationPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useVerifyMutation,
  useCodeMutation,
} from "@/features/api/userApiSlice";
import { authImages } from "../assets/images/auth";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { setCredentials } from "@/features/auth/authSlice";

const VerificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API hooks for verifying and resending the code
  const [verifyCode, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendCode, { isLoading: isResending }] = useCodeMutation();
  const verificationData = useSelector((state) => state.auth.loginIdUsername);

  // States for verification code, timer, and user info
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true); // Initially disabled

  const inputs = Array(6).fill(0);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false); // Enable resend button after timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name=code-${index + 1}]`
        );
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join(""); // Combine the 6-digit code into a string

    if (code.length === 6) {
      try {
        const response = await verifyCode({
          loginId: verificationData,
          code,
        }).unwrap();

        if (response.message?.includes("successfully")) {
          toast.success("Verification successful!");
          if (response.token) {
            dispatch(setCredentials({ token: response.token }));
            navigate("/verification-success");
          } else navigate("/signin");
        } else {
          toast.error(response.message || "Verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(
          error?.data?.message || "Error verifying the code. Please try again."
        );
      }
    }
  };

  const handleResendCode = async () => {
    if (!resendDisabled) {
      try {
        const response = await resendCode({
          loginId: verificationData,
        }).unwrap();
        toast.success("Verification code resent successfully!");
        setVerificationCode(["", "", "", "", "", ""]); // Clear previous inputs
        setTimeLeft(300); // Reset timer to 5 minutes
        setResendDisabled(true); // Disable the resend button again
      } catch (error) {
        console.error("Resend code error:", error);
        toast.error(
          error?.data?.message || "Error resending the code. Please try again."
        );
      }
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
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Verify Your Email
          </h2>
          <p className="text-gray-300 mb-8">
            Please enter the 6-digit code sent to your registered email address.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {inputs.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Time remaining:{" "}
                <span className="text-accent-100">{formatTime(timeLeft)}</span>
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendDisabled || isResending}
                className="text-accent-100 hover:text-accent-200 transition-colors disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isVerifying || verificationCode.some((v) => !v)}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </form>
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
            src={authImages.verification}
            alt="Verification"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;
