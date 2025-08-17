import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { UserVerificationService } from "@/services/verification.service";
import { upload } from "@/services/cloudinary.service";


import { promisify } from "util";

// Helper to handle multer in Next.js App Router
const uploadSingle = promisify(upload.single("idImage"));

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    console.log('FORMDDARA:', formData)

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
              folder: "ash-documents",
              allowed_formats: ["jpg", "jpeg", "png", "pdf"],
              public_id: `id-${Date.now()}-${index + 1}-${Math.round(
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

    // Create user verification request
    const user = await UserVerificationService.createUser({
      fullName,
      address,
      phoneNumber,
      imageUrls,
      imagePublicIds,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User verification request created successfully",
        data: {
          id: user._id,
          status: user.status,
          createdAt: user.createdAt,
          imageCount: user.imageUrls.length,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("User creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create user verification request",
      },
      { status: 500 }
    );
  }
}