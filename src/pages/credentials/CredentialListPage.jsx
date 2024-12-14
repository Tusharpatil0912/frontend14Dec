import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { dummyBankingCredentials } from "../../data/dummyCredentials";
import {
  useGetAllCredsQuery,
  useGetCredQuery,
  useUpdateCredMutation,
  useDeleteCredMutation,
} from "@/features/api/userCredApiSlice";
import {
  useVerifyCodeMutation,
  useCodeMutation,
} from "@/features/api/userApiSlice";
import { useSelector } from "react-redux";

// Simulated encryption function
const decryptData = (data) => {
  // In production, use proper decryption
  return {
    userId: "john.doe",
    password: "securePass123",
    additionalInfo: "Primary account for savings",
  };
};
// const OTP_TIMEOUT = 0; // 1 hour in milliseconds

const OTP_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const getLastVerifiedTime = (credentialName) => {
  const sessions = JSON.parse(sessionStorage.getItem("otpSessions")) || {};
  return sessions[credentialName] || null;
};

// Function to set the last verified time for a specific credential
const setLastVerifiedTime = (credentialName) => {
  const sessions = JSON.parse(sessionStorage.getItem("otpSessions")) || {};
  sessions[credentialName] = new Date().getTime();
  sessionStorage.setItem("otpSessions", JSON.stringify(sessions));
};
// const VerificationModal = ({ isOpen, onClose, onVerified }) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setLoading(true);
//     try {
//       // Simulate OTP verification
//       setTimeout(() => {
//         const isValid = otp.join("") === "123456";
//         if (isValid) {
//           toast.success("Verification successful");
//           onVerified();
//           onClose();
//         } else {
//           toast.error("Invalid verification code");
//         }
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       toast.error("Verification failed");
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-white">Verify Access</h3>
//           <button onClick={onClose}>
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <p className="text-gray-300 mb-6">
//           Enter the verification code sent to your email and phone
//         </p>

//         <div className="flex justify-between mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => {
//                 const newOtp = [...otp];
//                 newOtp[index] = e.target.value;
//                 setOtp(newOtp);

//                 if (e.target.value && index < 5) {
//                   document.getElementById(`otp-${index + 1}`)?.focus();
//                 }
//               }}
//               id={`otp-${index}`}
//               className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-300 border border-dark-400 text-white"
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleVerify}
//           disabled={loading || otp.some((d) => !d)}
//           className="w-full py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold disabled:opacity-50"
//         >
//           {loading ? "Verifying..." : "Verify"}
//         </button>
//       </div>
//     </div>
//   );
// };

const VerificationModal = ({
  isOpen,
  selectedCredential,
  onClose,
  onVerified,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP fields
  const [loading, setLoading] = useState(false); // Loading state for verification
  const [verifyCode] = useVerifyCodeMutation(); // Mutation for verifying code
  const verificationData = useSelector((state) => state.auth.loginIdUsername); // Login data from Redux store

  const handleVerify = async () => {
    setLoading(true);
    setOtp(["", "", "", "", "", ""]);
    try {
      const response = await verifyCode({
        loginId: verificationData,
        code: otp.join(""), // Join OTP array into a single string
      }).unwrap();

      if (response.message?.includes("successfully")) {
        toast.success("Verification successful");
        if (selectedCredential) {
          setLastVerifiedTime(selectedCredential.displayName); // Save last verified time
        }
        onVerified(); // Notify parent of successful verification
        onClose(); // Close the modal
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      toast.error(error?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Return nothing if the modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Verify Access</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Enter the verification code sent to your email for{" "}
          {selectedCredential?.displayName}.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[index] = e.target.value;
                setOtp(newOtp);

                if (e.target.value && index < 5) {
                  document.getElementById(`otp-${index + 1}`)?.focus();
                }
              }}
              id={`otp-${index}`}
              className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-300 border border-dark-400 text-white"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.some((d) => !d)}
          className="w-full py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

// const CredentialDetailsModal = ({ credential, onClose, onEdit, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(decryptData(credential));
//   const { data, isLoading, isError } = useGetCredQuery(credential?.id);
//   console.log(credential);
//   const handleSave = () => {
//     // In production, implement actual save logic
//     toast.success("Changes saved successfully");
//     setIsEditing(false);
//   };

//   if (!credential) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-2xl font-bold text-white">{credential.title}</h3>
//           <button onClick={onClose}>
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {isEditing ? (
//             // Edit Form
//             <>
//               <div>
//                 <label className="text-sm text-gray-400">User ID</label>
//                 <input
//                   type="text"
//                   value={editedData.userId}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, userId: e.target.value })
//                   }
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">Password</label>
//                 <input
//                   type="text"
//                   value={editedData.password}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, password: e.target.value })
//                   }
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">
//                   Additional Information
//                 </label>
//                 <textarea
//                   value={editedData.additionalInfo}
//                   onChange={(e) =>
//                     setEditedData({
//                       ...editedData,
//                       additionalInfo: e.target.value,
//                     })
//                   }
//                   rows={4}
//                   className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                 />
//               </div>
//             </>
//           ) : (
//             // View Mode
//             <>
//               <div>
//                 <label className="text-sm text-gray-400">User ID</label>
//                 <p className="text-white">{editedData.userId}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">Password</label>
//                 <p className="text-white">{editedData.password}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-400">
//                   Additional Information
//                 </label>
//                 <p className="text-white">{editedData.additionalInfo}</p>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="flex justify-between mt-6 space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 py-3 rounded-lg border border-accent-100 text-accent-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold flex items-center justify-center"
//               >
//                 <Save className="w-5 h-5 mr-2" />
//                 Save Changes
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={onDelete}
//                 className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CredentialDetailsModal = ({
//   credential,
//   onClose,
//   onEdit,
//   triggerDelete,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const { data, isLoading, isError } = useGetCredQuery(credential?.id);
//   const [updateCred, { isLoading: isUpdating }] = useUpdateCredMutation();
//   const { type } = useParams();
//   const isBankingForm = type === "banking";
//   // const handleSave = () => {
//   //   toast.success("Changes saved successfully");
//   //   setIsEditing(false);
//   // };
//   const [editedData, setEditedData] = useState(() => ({
//     displayName: data?.resource?.displayName || "",
//     platformName: data?.resource?.platformName || "",
//     bankName: data?.resource?.bankName || "",
//     userId: data?.resource?.userId || "",
//     password: data?.resource?.password || "",
//     additionalInfo: data?.resource?.additionalInfo || "",
//   }));
//   useEffect(() => {
//     if (data?.cred?.data) {
//       setEditedData({
//         displayName: data.resource?.displayName || "",
//         platformName: data.resource?.platformName || "",
//         bankName: data.resource?.bankName || "",
//         userId: data.resource?.userId || "",
//         password: data.resource?.password || "",
//         additionalInfo: data.resource?.additionalInfo || "",
//       });
//     }
//   }, [data]);
//   const handleSave = async () => {
//     try {
//       const updatedCredential = {
//         category: type || "others",
//         data: {
//           displayName: editedData.displayName,
//           ...(isBankingForm
//             ? { bankName: editedData.bankName }
//             : { platformName: editedData.platformName }),
//           userId: editedData.userId,
//           password: editedData.password,
//           additionalInfo: editedData.additionalInfo,
//         },
//       };

//       await updateCred({
//         creds: updatedCredential,
//         credId: credential.id,
//       }).unwrap();
//       toast.success("Credential updated successfully!");
//       setIsEditing(false);
//       onEdit && onEdit(updatedCredential); // Optionally call onEdit callback
//     } catch (error) {
//       toast.error("Failed to update credential.");
//     }
//   };

//   if (!credential) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg overflow-hidden">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-2xl font-bold text-white truncate">
//             {data?.resource?.displayName || "Credential Details"}
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-200 transition duration-300"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {isLoading ? (
//           <p className="text-gray-300">Loading credential details...</p>
//         ) : isError ? (
//           <p className="text-red-400">Failed to load details.</p>
//         ) : (
//           <div className="h-96 overflow-y-auto pr-2 space-y-4">
//             <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//               <p className="text-gray-400 text-sm font-medium">
//                 {data.resource?.bankName ? "Bank Name" : "Platform Name"}
//               </p>
//               <p className="text-white">
//                 {data.resource?.bankName || data.resource?.platformName}
//               </p>
//             </div>

//             {isEditing ? (
//               <>
//                 <div>
//                   <label className="text-sm text-gray-400">User ID</label>
//                   <input
//                     type="text"
//                     value={editedData.userId}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, userId: e.target.value })
//                     }
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-400">Password</label>
//                   <input
//                     type="text"
//                     value={editedData.password}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, password: e.target.value })
//                     }
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-400">
//                     Additional Information
//                   </label>
//                   <textarea
//                     value={editedData.additionalInfo}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         additionalInfo: e.target.value,
//                       })
//                     }
//                     rows={4}
//                     className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">User ID</p>
//                   <p className="text-white">{data.resource?.userId}</p>
//                 </div>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">Password</p>
//                   <p className="text-white">{data.resource?.password}</p>
//                 </div>
//                 <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                   <p className="text-gray-400 text-sm font-medium">
//                     Additional Information
//                   </p>
//                   <p className="text-white">
//                     {data.resource?.additionalInfo || "N/A"}
//                   </p>
//                 </div>
//               </>
//             )}

//             {/* {data.resource?.meta && (
//               <div className="p-4 bg-dark-300 rounded-lg shadow-md">
//                 <p className="text-gray-400 text-sm font-medium">
//                   Meta Details
//                 </p>
//                 <div className="space-y-2">
//                   <p className="text-white">
//                     <span className="font-medium text-gray-400">IFSC: </span>
//                     {data.resource?.meta.ifsc || "N/A"}
//                   </p>
//                   <p className="text-white">
//                     <span className="font-medium text-gray-400">
//                       Account Type:{" "}
//                     </span>
//                     {data.resource?.meta.accountType || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             )} */}
//           </div>
//         )}

//         <div className="flex justify-between mt-6 space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 py-3 rounded-lg border border-accent-100 text-accent-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold flex items-center justify-center"
//               >
//                 <Save className="w-5 h-5 mr-2" />
//                 {isUpdating ? "Saving..." : "Save Changes"}
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex-1 py-3 rounded-lg bg-accent-100 text-dark-100 font-semibold"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={triggerDelete}
//                 className="flex-1 py-3 rounded-lg bg-red-500 text-white font-semibold"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const CredentialDetailsCard = ({
  credential,
  onClose,
  onEdit,
  triggerDelete,
  // isOthers,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeEditingId, setActiveEditingId] = useState(null); // Track which card is being edited
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { type } = useParams();
  const { data, isLoading, isError, refetch } = useGetCredQuery(credential);
  const isOthers = JSON.parse(localStorage.getItem("isOthers"));
  const initialDisplayName = localStorage.getItem("initialDisplayName");
  const [updateCred, { isLoading: isUpdating }] = useUpdateCredMutation();
  const [deleteCred, { isLoading: isDeleting }] = useDeleteCredMutation();
  const [editedData, setEditedData] = useState({
    displayName: "",
    platformName: "",
    bankName: "",
    accountType: "",
    subscriptionType: "",
    userId: "",
    password: "",
    additionalInfo: "",
  });
  console.log(isOthers);
  useEffect(() => {
    if (data?.resources && activeEditingId) {
      const resource = data.resources.find((res) => res.id === activeEditingId);
      if (resource) {
        setEditedData({
          displayName: resource.displayName || "",
          platformName: resource.platformName || "",
          bankName: resource.bankName || "",
          subscriptionType: resource.subscriptionType || "",
          accountType: resource.accountType || "",
          userId: resource.userId || "",
          password: resource.password || "",
          additionalInfo: resource.additionalInfo || "",
        });
      }
    }
  }, [data, activeEditingId]);

  const handleSave = async (id) => {
    try {
      const updatedCredential = {
        category: type,
        data: {
          // ...(type === "banking"
          //   ? { bankName: editedData.bankName }
          //   : { platformName: editedData.platformName }),

          ...(type === "banking"
            ? { bankName: isOthers ? "Others" : editedData.bankName }
            : { platformName: isOthers ? "Others" : editedData.platformName }),

          ...(isOthers && {
            ...(type === "banking"
              ? { otherBankName: initialDisplayName }
              : { otherPlatformName: initialDisplayName }),
          }),

          ...(!(type === "entertainmentPlatform")
            ? { accountType: editedData.accountType }
            : { subscriptionType: editedData.subscriptionType }),
          userId: editedData.userId,
          password: editedData.password,
          additionalInfo: editedData.additionalInfo,
        },
      };

      console.log(updatedCredential);
      await updateCred({
        creds: updatedCredential,
        credId: id,
      }).unwrap();
      toast.success("Credential updated successfully!");
      refetch();
      setIsEditing(false);
      setActiveEditingId(null);
      onEdit && onEdit(updatedCredential);
    } catch (error) {
      toast.error("Failed to update credential.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCred(id).unwrap();
      toast.success("Credential deleted successfully!");
      setConfirmDeleteId(null); // Close confirmation dialog
      refetch(); // Refresh the data
    } catch (error) {
      toast.error("Failed to delete credential.");
    }
  };

  if (!credential) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        <p className="text-gray-300">Loading credential details...</p>
      ) : isError ? (
        <p className="text-red-400">No account resourses found.</p>
      ) : (
        data.resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-dark-300 rounded-lg shadow-md p-6 transition hover:shadow-lg hover:bg-dark-400"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveEditingId(resource.id);
                    setIsEditing(true);
                  }}
                  className="p-2 rounded-full bg-dark-200 hover:bg-dark-500"
                >
                  <Edit className="w-5 h-5 text-accent-100" />
                </button>
                <button
                  onClick={() => setConfirmDeleteId(resource.id)}
                  className="p-2 rounded-full bg-dark-200 hover:bg-red-500"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-gray-400">
                  {!(type === "entertainmentPlatform")
                    ? "Account Type"
                    : "Subscription Type"}
                </p>
                <p className="text-white font-semibold">
                  {!(type === "entertainmentPlatform")
                    ? resource.accountType
                    : resource.subscriptionType}
                </p>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-gray-400">User ID</p>
                <p className="text-white font-semibold">{resource.userId}</p>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-gray-400">Password</p>
                <p className="text-white font-semibold">{resource.password}</p>
              </div>

              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <p className="text-sm font-medium text-gray-400">
                  Additional Info
                </p>
                <p className="text-white font-semibold">
                  {resource.additionalInfo || "N/A"}
                </p>
              </div>
            </div>

            {isEditing && activeEditingId === resource.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-dark-200 rounded-xl w-full max-w-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Edit Credential
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">User ID</label>
                      <input
                        type="text"
                        value={editedData.userId}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            userId: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white focus:ring focus:ring-accent-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Password</label>
                      <input
                        type="text"
                        value={editedData.password}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            password: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white focus:ring focus:ring-accent-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">
                        Additional Info
                      </label>
                      <textarea
                        value={editedData.additionalInfo}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            additionalInfo: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2 mt-1 rounded-lg bg-dark-300 border border-dark-400 text-white focus:ring focus:ring-accent-100"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setActiveEditingId(null);
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(resource.id)}
                      className="px-4 py-2 bg-accent-100 text-dark-100 rounded-lg hover:bg-accent-200 flex items-center justify-center transition"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      <ConfirmDialog
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => handleDelete(confirmDeleteId)}
        message="Are you sure you want to delete this credential?"
      />
    </div>
  );
};

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-dark-200 rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold text-white mb-4">Confirmation</h3>
        <p className="text-gray-300 mb-6">{message || "Are you sure?"}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const CredentialListPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  // const [credentials] = useState(dummyBankingCredentials);
  const [showVerification, setShowVerification] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const verificationData = useSelector((state) => state.auth.loginIdUsername);
  const { data, isLoading, isError } = useGetAllCredsQuery(type);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteCred, { isLoading: isDeleting }] = useDeleteCredMutation();
  const [credentials, setCredentials] = useState([]);
  const [sendCode, { isLoading: isSending }] = useCodeMutation();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [customField, setCustomField] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);

  // Update state when API data changes
  // Dropdown options
  const dropdownOptions = {
    banking: [
      "State Bank of India (SBI)",
      "AXIS Bank",
      "HDFC Bank",
      "ICIC Bank",
      "Punjab National Bank (PNB)",
      "Bank of Baroda (BoB)",
      "Others",
    ],
    investment: [
      "Zerodha",
      "Groww",
      "Upstox",
      "ICICI Direct",
      "HDFC Securities",
      "Others",
    ],
    entertainmentPlatform: [
      "Netflix",
      "Amazon Prime",
      "Disney+ Hotstar",
      "Apple TV",
      "Spotify",
      "Others",
    ],
    gamingPlatform: [
      "Steam",
      "Epic Games",
      "Xbox Live",
      "PlayStation Network",
      "PUBG",
      "Valorant",
      "Others",
    ],
    socialMedia: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "WhatsApp",
      "Telegram",
      "Others",
    ],
    others: [
      "Email Accounts",
      "e-Commerce Accounts",
      "Educational Platforms",
      "Others",
    ],
  };

  const isBanking = type === "banking";

  // Handle dropdown selection and dynamic field
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedDropdownValue(value);
    setShowCustomField(value === "Others");
  };


  const placeholderText = {
    banking: "Select Your Bank Name",
    investment: "Select Your Investment Type",
    entertainmentPlatform: "Select Your Entertainment Platform ",
    socialMedia: "Select Your Social Media Platform",
    gamingPlatform: "Select Your Gaming Platform",
    others: "Select Your Platform Name"
  };
  //sssssssssssssssssssssssssssssssssssssssss

  const customFieldPlaceholderText = {
    banking: "Enter Your Bank Name",
    investment: "Enter Your Investment Type",
    entertainmentPlatform: "Enter Your Entertainment Platform",
    socialMedia: "Enter Your Social Media Platform",
    gamingPlatform: "Enter Your Gaming Platform",
    others: "Enter Your Platform Name"
  };

  //ssssssssssssssssssssssssssssssssssssssssssssssssssss

  useEffect(() => {
    if (data?.resources) {
      const mappedCredentials = data.resources.map((cred) => ({
        // id: cred.id,
        displayName: isBanking ? cred.bankName : cred.platformName,

        lastUpdatedAt: new Date(cred.lastUpdated).toLocaleDateString(), // Format date
      }));
      setCredentials(mappedCredentials);

      // console.log("Mapped Credentials:", mappedCredentials); // Debugging
    }
  }, [data]);

  // const handleView = (credential) => {
  //   setSelectedCredential(credential);
  //   setShowVerification(true);
  // };

  // const handleView = async (credential) => {
  //   const now = new Date().getTime();
  //   const lastVerifiedTime = sessionStorage.getItem("lastVerifiedTime");
  //   console.log(credential);
  //   const isOtpValid =
  //     lastVerifiedTime && now - Number(lastVerifiedTime) < OTP_TIMEOUT;

  //   if (!isOtpValid) {
  //     try {
  //       await sendCode({ loginId: verificationData }).unwrap();
  //       toast.success("Verification code sent");
  //       setSelectedCredential(credential);
  //       setShowVerification(true);
  //     } catch (error) {
  //       toast.error("Failed to send verification code");
  //     }
  //   } else {
  //     setSelectedCredential(credential);
  //     setShowDetails(true);
  //   }
  // };

  const handleView = async (credential) => {
    const now = new Date().getTime();
    const lastVerifiedTime = getLastVerifiedTime(credential.displayName);
    const isOtpValid =
      lastVerifiedTime && now - Number(lastVerifiedTime) < OTP_TIMEOUT;

    setSelectedCredential(credential); // Set the credential being worked on

    if (!isOtpValid) {
      try {
        await sendCode({ loginId: verificationData }).unwrap(); // Trigger OTP send
        toast.success("Verification code sent");
        setShowVerification(true); // Open the verification modal
        setShowDetails(false); // Ensure details page is hidden until verification
      } catch (error) {
        toast.error("Failed to send verification code");
      }
    } else {
      setShowDetails(true); // Directly show details if OTP is valid
    }
  };

  // const handleVerified = () => {
  //   const now = new Date().getTime();
  //   sessionStorage.setItem("lastVerifiedTime", now);
  //   setShowDetails(true);
  // };

  const handleVerified = () => {
    if (selectedCredential) {
      setLastVerifiedTime(selectedCredential.displayName); // Save verified timestamp
    }
    setShowVerification(false); // Close verification modal
    setShowDetails(true); // Show details page
  };

  const filteredCredentials = credentials.filter(
    (cred) =>
      cred.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cred.userId &&
        cred.userId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatCamelCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (char) => char.toUpperCase());
  };

  // const triggerDelete = () => {
  //   setShowDetails(false); // Close the details modal
  //   setConfirmDelete(true); // Open the confirm dialog
  // };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <div className="w-12 h-12 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-lg font-semibold text-gray-200 animate-pulse">
            Loading your credentials...
          </p>
        </div>
      )}

      {isError && (
        <div className="text-center py-12">
          <p className="text-red-400">
            Failed to load credentials. Please try again.
          </p>
        </div>
      )}
      {isSending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center bg-dark-300 p-8 rounded-xl shadow-xl space-y-6">
            <div className="relative flex justify-center items-center">
              <div className="absolute w-16 h-16 border-4 border-accent-100 border-t-transparent rounded-full animate-spin"></div>

              <div className="w-8 h-8 bg-dark-300 rounded-full"></div>
            </div>

            <p className="text-lg font-medium text-accent-100 text-center">
              Sending OTP to your registered email...
            </p>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="container mx-auto px-6 ">
          {selectedCredential && showDetails ? (
            <>
              <div className="container mx-auto px-6 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => {
                      setSelectedCredential(null);
                      setShowDetails(false); // Reset details view
                    }}
                    className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Credentials
                  </button>
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                      {/* {type.charAt(0).toUpperCase() + type.slice(1)} Credentials */}
                      {formatCamelCase(selectedCredential.displayName)}{" "}
                      Credentials
                    </h1>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const displayName = formatCamelCase(
                          selectedCredential.displayName
                        );

                        navigate(`/credentials/${type}/add`, {
                          state: { displayName },
                        });
                      }}
                      // disabled={!selectedDropdownValue && !customField}
                      className={`flex items-center px-4 py-2 rounded-lg 
                     
                          bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors
                          
                      `}
                    >
                      Add
                    </motion.button>
                  </div>

                  {/* Credential Details Card */}

                  <CredentialDetailsCard
                    credential={selectedCredential?.displayName}
                    isOthers={selectedDropdownValue === "Others"}
                    onEdit={(updatedCredential) => {
                      // Handle edit callback if needed
                    }}
                  // triggerDelete={triggerDelete}
                  />
                </motion.div>
              </div>
            </>
          ) : (
            <div className="container mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </button>

                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-white">
                    {/* {type.charAt(0).toUpperCase() + type.slice(1)} Credentials */}
                    {formatCamelCase(type)} Credentials
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const displayName =
                        selectedDropdownValue === "Others"
                          ? customField
                          : selectedDropdownValue;
                      const isOthers = selectedDropdownValue === "Others";
                      localStorage.setItem(
                        "isOthers",
                        JSON.stringify(isOthers)
                      );
                      localStorage.setItem("initialDisplayName", displayName);
                      navigate(`/credentials/${type}/add`, {
                        state: { displayName, isOthers },
                      });
                    }}
                    disabled={!selectedDropdownValue && !customField}
                    className={`flex items-center px-4 py-2 rounded-lg ${selectedDropdownValue || customField
                      ? "bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Go
                  </motion.button>
                </div>

                {dropdownOptions[type] ? (
                  <div className="relative mb-6">
                    {/* <label className="block text-sm font-medium text-gray-300 mb-2 mx-auto">
                      Please Select A {type === "banking" ? "Bank" : "Platform"} From The Drop Down List And Click On GO 
                    </label> */}
                    <select
                      value={selectedDropdownValue}
                      onChange={handleDropdownChange}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    >
                      <option value="">
                        {placeholderText[type] || placeholderText.default}
                      </option>
                      {dropdownOptions[type]?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {showCustomField && (
                      <input
                        type="text"
                        placeholder={customFieldPlaceholderText[type] || customFieldPlaceholderText.default}
                        value={customField}
                        onChange={(e) => setCustomField(e.target.value)}
                        className="w-full px-4 py-3 mt-4 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      />
                    )}
                  </div>///////////////////////////////////////////////////////////////////////
                ) : (
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search credentials..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-6 justify-left">
                  {filteredCredentials.map((credential) => (
                    <motion.div
                      key={credential.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-gradient-to-br from-dark-800 via-dark-700 to-dark-900 rounded-lg p-6 shadow-lg hover:shadow-xl border border-dark-700 hover:border-accent-100 transition-all duration-300 flex flex-col justify-between w-[280px]"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-accent-100/10 to-accent-200/10 opacity-0 hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Title */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white">
                          {credential.displayName}
                        </h3>
                      </div>

                      {/* Last Updated */}
                      {/* <div className="mb-4">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium text-gray-300">
                            Last updated:
                          </span>{" "}
                          {new Date(
                            credential.lastUpdatedAt
                          ).toLocaleDateString()}
                        </p>
                      </div> */}

                      {/* Action Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleView(credential)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-accent-100 to-accent-200 text-dark-900 rounded-lg shadow hover:shadow-lg hover:opacity-90 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {/* No Credentials Found */}
                  {filteredCredentials.length === 0 && (
                    <div className="text-center mx-auto py-12">
                      <p className="text-gray-400">No credentials found</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Verification Modal */}
          <VerificationModal
            isOpen={showVerification}
            onClose={() => setShowVerification(false)}
            onVerified={handleVerified}
            selectedCredential={selectedCredential}
          />

          {/* Credential Details Modal */}
          {/* {showDetails && (
            <CredentialDetailsModel
              credential={selectedCredential}
              onClose={() => setShowDetails(false)}
              // onDelete={handleDelete}
              triggerDelete={triggerDelete}
            />
          )} */}
        </div>
      )}
    </div>
  );
};

export default CredentialListPage;
