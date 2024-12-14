import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Save, ArrowLeft, SubscriptIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useCreateCredMutation } from "@/features/api/userCredApiSlice";

const CredentialFormPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [createCred, { isLoading }] = useCreateCredMutation();
  const location = useLocation();
  const [initialDisplayName, isOthers] = useState(
    location.state?.displayName || ""
  );
  const [showCustomField, setShowCustomField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      category: type,
      data: {
        ...(isBankingForm
          ? { bankName: isOthers ? "Others" : initialDisplayName }
          : { platformName: isOthers ? "Others" : initialDisplayName }),

        ...(isOthers && {
          ...(isBankingForm
            ? { otherBankName: initialDisplayName }
            : { otherPlatformName: initialDisplayName }),
        }),

        ...(type === "others"
          ? { accountType: data.customAccountType }
          : !(type === "entertainmentPlatform")
            ? { accountType: selectedOption }
            : { subscriptionType: selectedOption }),
        userId: data.userId,
        password: data.password,
        additionalInfo: data.additionalInfo || "",
        // ...(data.metaIFSC || data.metaAccountType
        //   ? {
        //       meta: {
        //         ifsc: data.metaIFSC || "",
        //         accountType: data.metaAccountType || "",
        //       },
        //     }
        //   : {}),
      },
    };

    try {
      await createCred(payload).unwrap();
      toast.success("Credential added successfully!");
      navigate(`/credentials/${type}`);
    } catch (error) {
      toast.error("Failed to add credential. Please try again.");
    }
  };

  const getTitle = () => {
    switch (type) {
      case "banking":
        return "Banking Credentials";
      case "investment":
        return "Investment Credentials";
      case "entertenmentPlatform":
        return "Entertainment Platform";
      case "socialMedia":
        return "Social Media Account";
      case "gamingPlatform":
        return "Gaming Platform";
      case "others":
        return "Other Credentials";
      default:
        return "Add New Credentials";
    }
  };

  const isBankingForm = type === "banking";

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Add New {getTitle()}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {type === "banking" ? "Bank Name" : "Platform Name"}
                </label>
                <div className="relative">
                  <input
                    {...register("displayName", {
                      required: "Display name is required",
                    })}
                    value={initialDisplayName}
                    readOnly
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-gray-600 text-gray-400 focus:outline-none cursor-not-allowed"
                    placeholder="Enter a name for this credential"
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    {/* <span className="text-gray-500 text-xs italic">
                      (Read-only)
                    </span> */}
                  </div>
                </div>
                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {type === "banking" ||
                    type === "investment" ||
                    type === "others" ||
                    type === "socialMedia" ||
                    type === "gamingPlatform"
                    ? "Account Type"
                    : "Subscription Type"}
                </label>
                <div className="space-y-4">
                  {/* Dropdown for predefined options */}
                  {type !== "others" && (
                    <select
                      // {...register(
                      //   type === "banking" ||
                      //     type === "investment" ||
                      //     type === "socialMedia" ||
                      //     type === "gamingPlatform"
                      //     ? "accountType"
                      //     : "subscriptionType",
                      //   {
                      //     required: `${
                      //       type === "banking" ||
                      //       type === "investment" ||
                      //       type === "socialMedia" ||
                      //       type === "gamingPlatform"
                      //         ? "Account Type"
                      //         : "Subscription Type"
                      //     } is required`,
                      //   }
                      // )}
                      // onChange={(e) =>
                      //   setShowCustomField(e.target.value === "Other")
                      // }
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {type === "banking" && (
                        <>
                          <option value="Savings A/C">Savings A/C</option>
                          <option value="Current A/C">Current A/C</option>
                          {/* <option value="Salary A/C">Salary A/C</option> */}
                          <option value="Fixed Deposit A/C">
                            Fixed Deposit A/C
                          </option>
                          <option value="Loan A/C">
                            Loan A/C
                          </option>
                          <option value="Others A/C">
                            Others A/C
                          </option>
                          {/* <option value="Recurring Deposit A/C">
                            Recurring Deposit A/C
                          </option> */}
                          {/* <option value="NRI A/C">NRI A/C</option>
                          <option value="Joint A/C">Joint A/C</option> */}
                          {/* <option value="Other">Other</option> */}
                        </>
                      )}
                      {type === "investment" && (
                        <>
                          <option value="Trading">Trading</option>
                          <option value="Demat">Demat</option>
                          <option value="Mutual Fund">Mutual Fund</option>
                          <option value="Pension">Pension</option>
                          {/* <option value="Other">Other</option> */}
                        </>
                      )}
                      {type === "entertainmentPlatform" && (
                        <>
                          <option value="Monthly">Monthly</option>
                          <option value="Annual">Annual</option>
                          <option value="Family Plan">Family Plan</option>
                          {/* <option value="Other">Other</option> */}
                        </>
                      )}
                      {type === "gamingPlatform" && (
                        <>
                          <option value="Main Account">Main Account</option>
                          <option value="Sub Account">Sub Account</option>
                          <option value="Clan/Group ID">Clan/Group ID</option>
                          {/* <option value="Other">Other</option> */}
                        </>
                      )}
                      {type === "socialMedia" && (
                        <>
                          <option value="Personal">Personal</option>
                          <option value="Business">Business</option>
                          {/* <option value="Other">Other</option> */}
                        </>
                      )}
                    </select>
                  )}

                  {/* Custom input field for "Other" */}
                  {(type === "others" || showCustomField) && (
                    <input
                      {...register("customAccountType", {
                        required: "Custom account type is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      placeholder="Enter custom account type"
                    />
                  )}
                </div>
                {errors.accountType && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.accountType.message}
                  </p>
                )}
              </div>

              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  User ID
                </label>
                <input
                  {...register("userId", { required: "User ID is required" })}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Enter user ID"
                />
                {errors.userId && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.userId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Enter password"
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
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {isBankingForm
                    ? "Additional Information"
                    : "Additional Information"}
                </label>
                <textarea
                  {...register("additionalInfo")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder={isBankingForm
                    ? "Secoundary Password/Profile Password/PIN/Bank Link etc"
                    : "Please Add Any Other Additional Information Here"}
                />
              </div>

              {/* Meta Information */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Information (Optional)
                </label>
                <div className="space-y-4">
                  <input
                    {...register("metaIFSC")}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter IFSC code"
                  />
                  <input
                    {...register("metaAccountType")}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    placeholder="Enter account type (e.g., Savings, Current)"
                  />
                </div>
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isLoading ? "Saving..." : <Save className="w-5 h-5 mr-2" />}
                {isLoading ? "" : "Save Credentials"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialFormPage;
