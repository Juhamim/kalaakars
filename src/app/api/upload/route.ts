import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary from Environment Variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Use HTTPS
});

const MAX_MB = 10;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
    let formData: FormData;
    try {
        formData = await req.formData();
    } catch {
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure Cloudinary is actually configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name") {
        return NextResponse.json(
            { error: "Cloudinary is not configured in .env.local yet." },
            { status: 500 }
        );
    }

    // Validate type
    if (!ALLOWED.includes(file.type)) {
        return NextResponse.json(
            { error: `Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, AVIF` },
            { status: 415 }
        );
    }

    // Validate size
    if (file.size > MAX_MB * 1024 * 1024) {
        return NextResponse.json(
            { error: `File too large. Maximum size is ${MAX_MB} MB.` },
            { status: 413 }
        );
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Promise wrapper for Cloudinary stream upload
        const uploadToCloudinary = () => {
            return new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "kalaakars", // Store all uploads in a folder
                        format: "webp", // Automatically convert to WebP for optimization
                        quality: "auto", // Auto-compress without losing visible quality
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as UploadApiResponse);
                    }
                );

                uploadStream.end(buffer);
            });
        };

        const uploadResult = await uploadToCloudinary();

        // Return the secure, optimized Cloudinary URL
        return NextResponse.json({ url: uploadResult.secure_url });
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        return NextResponse.json(
            { error: error?.message ?? "Cloudinary upload failed" },
            { status: 500 }
        );
    }
}
