import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
    const { data: projects, error } = await supabaseAdmin
        .from("projects")
        .select("*, gallery_images(*), specs(*)")
        .order("num", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { gallery, specs, ...data } = body;

    const { data: project, error } = await supabaseAdmin
        .from("projects")
        .insert(data)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (gallery?.length) {
        await supabaseAdmin.from("gallery_images").insert(
            gallery.map((g: { src: string; span: string }) => ({ ...g, project_id: project.id }))
        );
    }
    if (specs?.length) {
        await supabaseAdmin.from("specs").insert(
            specs.map((s: { label: string; value: string }) => ({ ...s, project_id: project.id }))
        );
    }

    return NextResponse.json(project, { status: 201 });
}
