import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const { data, error } = await supabaseAdmin
        .from("projects")
        .select("*, gallery_images(*), specs(*)")
        .eq("slug", slug)
        .single();

    if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const body = await req.json();
    const { gallery, specs, id, created_at, updated_at, gallery_images, ...data } = body;

    // Update main project row
    const { data: project, error } = await supabaseAdmin
        .from("projects")
        .update(data)
        .eq("slug", slug)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Replace gallery
    await supabaseAdmin.from("gallery_images").delete().eq("project_id", project.id);
    if (gallery?.length) {
        await supabaseAdmin.from("gallery_images").insert(
            gallery.map((g: { src: string; span: string }) => ({ ...g, project_id: project.id }))
        );
    }

    // Replace specs
    await supabaseAdmin.from("specs").delete().eq("project_id", project.id);
    if (specs?.length) {
        await supabaseAdmin.from("specs").insert(
            specs.map((s: { label: string; value: string }) => ({ ...s, project_id: project.id }))
        );
    }

    return NextResponse.json({ ...project, gallery, specs });
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const { error } = await supabaseAdmin.from("projects").delete().eq("slug", slug);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
