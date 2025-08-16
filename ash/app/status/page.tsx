"use client";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Activity, ArrowLeft, FileImage, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Image from "next/image";

const StatusPage = () => {
  const [frontLicense, setFrontLicense] = useState<File | null>(null);
  const [backLicense, setBackLicense] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-6 pb-4">
          <Button
            variant="ghost"
            size="sm"
            //   onClick={onBack}
            className="p-2 rounded-full hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-3 items-center">
            {/* <Logo variant="default" size="md" /> */}

            <Image src="/logo.svg" width={40} height={40} alt="logo" />
            <p className="text-gray-600 text-[18px] mt-1">Status</p>
          </div>
        </div>

        <form
          //   onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter the same details used during encryption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  // {...register("fullName")}
                  // className={`bg-gray-50 border-gray-200 rounded-xl h-12 ${
                  //   errors.fullName ? "border-red-300" : ""
                  // }`}
                />
                {/* {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )} */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  // {...register("address")}
                  // className={`bg-gray-50 border-gray-200 rounded-xl min-h-20 resize-none ${
                  //   errors.address ? "border-red-300" : ""
                  // }`}
                />
                {/* {errors.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )} */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  // {...register("phoneNumber")}
                  // className={`bg-gray-50 border-gray-200 rounded-xl h-12 ${
                  //   errors.phoneNumber ? "border-red-300" : ""
                  // }`}
                />
                {/* {errors.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )} */}
              </div>
            </CardContent>
          </Card>

          {/* License Upload */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FileImage className="h-4 w-4 text-white" />
                </div>
                Driver's License
              </CardTitle>
              <CardDescription className="text-gray-600">
                Upload the same license used during encryption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Front License */}
              <div className="space-y-2">
                <Label className="text-gray-700">Front Side</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
                  <input
                    id="frontLicense"
                    type="file"
                    //   onChange={(e) => handleFileUpload(e, "front")}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="frontLicense"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {frontLicense ? frontLicense.name : "Upload front side"}
                    </span>
                    <span className="text-sm text-gray-500">
                      JPG, PNG up to 10MB
                    </span>
                  </label>
                </div>
              </div>

              {/* Back License */}
              <div className="space-y-2">
                <Label className="text-gray-700">Back Side</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
                  <input
                    id="backLicense"
                    type="file"
                    //   onChange={(e) => handleFileUpload(e, "back")}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="backLicense"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">
                      {backLicense ? backLicense.name : "Upload back side"}
                    </span>
                    <span className="text-sm text-gray-500">
                      JPG, PNG up to 10MB
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-4 -mx-4">
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-gray-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Checking Status..." : "Check Status"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusPage;

// import { Activity, ArrowLeft, FileImage, Upload } from "lucide-react";
// import Image from "next/image";
// import React from "react";

// const StatusPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
//       <div className="max-w-md mx-auto p-4 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-4 pt-6 pb-4">
//           <button
//             // variant="ghost"
//             // size="sm"
//             // onClick={onBack}
//             className="p-2 rounded-full hover:bg-white/50"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <div className="flex items-center gap-3">
//             {/* <Logo variant="default" size="md" /> */}
//             <Image src="/logo.svg" width={20} height={20} alt="logo" />
//             <p className="text-gray-600 text-sm mt-1">
//               View your encryption status
//             </p>
//           </div>
//         </div>

//         <form
//           // onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6"
//         >
//           {/* Personal Information */}
//           <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <span className="pb-4">
//               <span className="flex items-center gap-2 text-lg text-gray-800">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                   <Activity className="h-4 w-4 text-white" />
//                 </div>
//                 Personal Information
//               </span>
//               <span className="text-gray-600">
//                 Enter the same details used during encryption
//               </span>
//             </span>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label htmlFor="fullName" className="text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   placeholder="Enter your full name"
//                   //   {...register("fullName")}
//                   //   className={`bg-gray-50 border-gray-200 rounded-xl h-12
//                   //     ${
//                   //     errors.fullName ? "border-red-300" : ""
//                   //   }
//                   //   `}
//                 />
//                 {/* {errors.fullName && (
//                   <p className="text-sm text-red-500">
//                     {errors.fullName.message}
//                   </p>
//                 )} */}
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="address" className="text-gray-700">
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   placeholder="Enter your complete address"
//                   //   {...register("address")}
//                   //   className={`bg-gray-50 border-gray-200 rounded-xl min-h-20 resize-none ${
//                   //     errors.address ? "border-red-300" : ""
//                   //   }`}
//                 />
//                 {/* {errors.address && (
//                   <p className="text-sm text-red-500">
//                     {errors.address.message}
//                   </p>
//                 )} */}
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="phoneNumber" className="text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   id="phoneNumber"
//                   placeholder="Enter your phone number"
//                   //   {...register("phoneNumber")}
//                   //   className={`bg-gray-50 border-gray-200 rounded-xl h-12 ${
//                   //     errors.phoneNumber ? "border-red-300" : ""
//                   //   }`}
//                 />
//                 {/* {errors.phoneNumber && (
//                   <p className="text-sm text-red-500">
//                     {errors.phoneNumber.message}
//                   </p>
//                 )} */}
//               </div>
//             </div>
//           </div>

//           {/* License Upload */}
//           <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <span className="pb-4">
//               <span className="flex items-center gap-2 text-lg text-gray-800">
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
//                   <FileImage className="h-4 w-4 text-white" />
//                 </div>
//                 Driver's License
//               </span>
//               <span className="text-gray-600">
//                 Upload the same license used during encryption
//               </span>
//             </span>
//             <div className="space-y-4">
//               {/* Front License */}
//               <div className="space-y-2">
//                 <label className="text-gray-700">Front Side</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
//                   <input
//                     id="frontLicense"
//                     type="file"
//                     // onChange={(e) => handleFileUpload(e, "front")}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                   <label
//                     htmlFor="frontLicense"
//                     className="cursor-pointer flex flex-col items-center gap-2"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
//                       <Upload className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-medium text-gray-700">
//                       {/* {frontLicense ? frontLicense.name : "Upload front side"} */}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       JPG, PNG up to 10MB
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Back License */}
//               <div className="space-y-2">
//                 <label className="text-gray-700">Back Side</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
//                   <input
//                     id="backLicense"
//                     type="file"
//                     // onChange={(e) => handleFileUpload(e, "back")}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                   <label
//                     htmlFor="backLicense"
//                     className="cursor-pointer flex flex-col items-center gap-2"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
//                       <Upload className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-medium text-gray-700">
//                       {/* {backLicense ? backLicense.name : "Upload back side"} */}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       JPG, PNG up to 10MB
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-4 -mx-4">
//             <button
//               type="submit"
//               className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-0"
//               //   disabled={isSubmitting}
//             >
//               {/* {isSubmitting ? "Checking Status..." : "🔍 Check Status"} */}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StatusPage;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Textarea } from "../components/ui/textarea";
// import { ArrowLeft, Upload, FileImage, Search, Activity } from "lucide-react";
// import Image from "next/image";
// // import { Logo } from "./Logo";
// // import { Card } from "../components/ui/card";

// const checkStatusSchema = z.object({
//   fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   address: z.string().min(10, "Please enter a complete address"),
//   phoneNumber: z
//     .string()
//     .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
//     .min(10, "Phone number must be at least 10 digits"),
// });

// type CheckStatusFormData = z.infer<typeof checkStatusSchema>;

// interface CheckStatusPageProps {
//   onBack: () => void;
//   onShowStatus: (
//     type: "success" | "error",
//     message: string,
//     statusData?: any
//   ) => void;
// }

// export function CheckStatusPage({
//   onBack,
//   onShowStatus,
// }: CheckStatusPageProps) {
//   const [frontLicense, setFrontLicense] = useState<File | null>(null);
//   const [backLicense, setBackLicense] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckStatusFormData>({
//     resolver: zodResolver(checkStatusSchema),
//   });

//   const handleFileUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: "front" | "back"
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (type === "front") {
//         setFrontLicense(file);
//       } else {
//         setBackLicense(file);
//       }
//     }
//   };

//   const onSubmit = async (data: CheckStatusFormData) => {
//     if (!frontLicense || !backLicense) {
//       onShowStatus(
//         "error",
//         "Please upload both front and back of your driver's license"
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       console.log("Check status data:", data);
//       console.log("Front license:", frontLicense);
//       console.log("Back license:", backLicense);
//       setIsSubmitting(false);

//       // Random status responses for demo
//       const statuses = [
//         {
//           type: "success",
//           message: "Encryption Status Found",
//           data: {
//             status: "Active",
//             encrypted: "2024-01-15",
//             expires: "2025-01-15",
//             security: "High",
//           },
//         },
//         {
//           type: "success",
//           message: "Encryption Status Found",
//           data: {
//             status: "Pending",
//             encrypted: null,
//             expires: null,
//             security: "Processing",
//           },
//         },
//         {
//           type: "error",
//           message: "No encryption record found for the provided information",
//         },
//       ];

//       const randomStatus =
//         statuses[Math.floor(Math.random() * statuses.length)];
//       onShowStatus(
//         randomStatus.type as "success" | "error",
//         randomStatus.message,
//         randomStatus.data
//       );
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
//       <div className="max-w-md mx-auto p-4 space-y-6">
//         {/* Header */}
//         <div className="flex items-center gap-4 pt-6 pb-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onBack}
//             className="p-2 rounded-full hover:bg-white/50"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <div>
//             {/* <Logo variant="default" size="md" /> */}

//             <Image src="/logo.svg" width={20} height={20} alt="logo" />
//             <p className="text-gray-600 text-sm mt-1">
//               View your encryption status
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Personal Information */}
//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                   <Activity className="h-4 w-4 text-white" />
//                 </div>
//                 Personal Information
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Enter the same details used during encryption
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName" className="text-gray-700">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="fullName"
//                   placeholder="Enter your full name"
//                   {...register("fullName")}
//                   className={`bg-gray-50 border-gray-200 rounded-xl h-12 ${
//                     errors.fullName ? "border-red-300" : ""
//                   }`}
//                 />
//                 {errors.fullName && (
//                   <p className="text-sm text-red-500">
//                     {errors.fullName.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="address" className="text-gray-700">
//                   Address
//                 </Label>
//                 <Textarea
//                   id="address"
//                   placeholder="Enter your complete address"
//                   {...register("address")}
//                   className={`bg-gray-50 border-gray-200 rounded-xl min-h-20 resize-none ${
//                     errors.address ? "border-red-300" : ""
//                   }`}
//                 />
//                 {errors.address && (
//                   <p className="text-sm text-red-500">
//                     {errors.address.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phoneNumber" className="text-gray-700">
//                   Phone Number
//                 </Label>
//                 <Input
//                   id="phoneNumber"
//                   placeholder="Enter your phone number"
//                   {...register("phoneNumber")}
//                   className={`bg-gray-50 border-gray-200 rounded-xl h-12 ${
//                     errors.phoneNumber ? "border-red-300" : ""
//                   }`}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="text-sm text-red-500">
//                     {errors.phoneNumber.message}
//                   </p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* License Upload */}
//           <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
//                 <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
//                   <FileImage className="h-4 w-4 text-white" />
//                 </div>
//                 Driver's License
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Upload the same license used during encryption
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {/* Front License */}
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Front Side</Label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
//                   <input
//                     id="frontLicense"
//                     type="file"
//                     onChange={(e) => handleFileUpload(e, "front")}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                   <label
//                     htmlFor="frontLicense"
//                     className="cursor-pointer flex flex-col items-center gap-2"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
//                       <Upload className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-medium text-gray-700">
//                       {frontLicense ? frontLicense.name : "Upload front side"}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       JPG, PNG up to 10MB
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               {/* Back License */}
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Back Side</Label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-gray-50/50">
//                   <input
//                     id="backLicense"
//                     type="file"
//                     onChange={(e) => handleFileUpload(e, "back")}
//                     className="hidden"
//                     accept="image/*"
//                   />
//                   <label
//                     htmlFor="backLicense"
//                     className="cursor-pointer flex flex-col items-center gap-2"
//                   >
//                     <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
//                       <Upload className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-medium text-gray-700">
//                       {backLicense ? backLicense.name : "Upload back side"}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       JPG, PNG up to 10MB
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent p-4 -mx-4">
//             <Button
//               type="submit"
//               className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border-0"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Checking Status..." : "🔍 Check Status"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
