import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const BUCKET = "project-images";
const MAX_MB = 10;

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate size
    if (file.size > MAX_MB * 1024 * 1024) {
        return NextResponse.json({ error: `File too large (max ${MAX_MB} MB)` }, { status: 413 });
    }

    // Validate type
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowed.includes(file.type)) {
        return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }

    // Build a unique, clean path
    const ext = file.name.split(".").pop() ?? "jpg";
    const safeName = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase()
        .slice(0, 60);
    const path = `${Date.now()}-${safeName}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, buffer, {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
}
