// app/api/users/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { UserVerificationService } from "@/services/verification.service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const address = formData.get("address") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;

    // Validation
    if (!fullName || !address || !phoneNumber || !image1 || !image2) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields including both images are required",
        },
        { status: 400 }
      );
    }

    // Check if user already exists with this phone number (original number only)
    const existingUser = await UserVerificationService.getUserByPhoneNumber(
      phoneNumber
    );

    const imageUrls: string[] = [];
    const imagePublicIds: string[] = [];

    // Upload both images to Cloudinary
    for (const [index, image] of [image1, image2].entries()) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "user-status-checks",
              allowed_formats: ["jpg", "jpeg", "png", "pdf"],
              public_id: `status-${Date.now()}-${index + 1}-${Math.round(
                Math.random() * 1e9
              )}`,
              transformation: [
                { width: 800, height: 600, crop: "limit" },
                { quality: "auto:good" },
              ],
            },
            (error: any, result: any) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      const { secure_url, public_id } = uploadResult as any;
      imageUrls.push(secure_url);
      imagePublicIds.push(public_id);
    }

    // Generate unique phone number with slug for new entry
    const uniquePhoneNumber =
      await UserVerificationService.generateUniquePhoneNumber(phoneNumber);

    // Create new status check entry with unique phone number
    const statusCheckEntry = await UserVerificationService.createStatusCheck({
      fullName,
      address,
      phoneNumber: uniquePhoneNumber, // Use the unique phone number
      imageUrls,
      imagePublicIds,
    });

    // Determine status to return (always based on original phone number)
    let userStatus = "pending"; // Default status for new users
    let userId = statusCheckEntry._id;

    if (existingUser) {
      userStatus = existingUser.status;
      userId = existingUser._id; // Use original user's ID for status
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: userId,
        status: userStatus,
        isExistingUser: !!existingUser,
        statusCheckId: statusCheckEntry._id,
        originalPhoneNumber: phoneNumber,
        savedPhoneNumber: uniquePhoneNumber,
        message: existingUser
          ? `Status for existing user: ${userStatus}`
          : "New user created with pending status",
        statusDetails:
          {
            pending: "Your application is under review",
            approved: "Your verification has been approved",
            declined: "Your verification was declined",
          }[userStatus as "pending" | "approved" | "declined"] ||
          "Status unknown",
      },
    });
  } catch (error: any) {
    console.error("Status check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to check status",
      },
      { status: 500 }
    );
  }
}
