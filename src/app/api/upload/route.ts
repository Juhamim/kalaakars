import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const MAX_MB = 10;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const EXT_MAP: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
};

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

    // Validate type
    if (!ALLOWED.includes(file.type)) {
        return NextResponse.json(
            { error: `Unsupported file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, AVIF` },
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

    const ext = EXT_MAP[file.type] ?? "jpg";
    const safeName = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase()
        .slice(0, 60);
    const filename = `${Date.now()}-${safeName}.${ext}`;

    // Ensure uploads dir exists inside public/
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(join(uploadDir, filename), buffer);

    // Return the public URL (served as a static asset by Next.js)
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
}
