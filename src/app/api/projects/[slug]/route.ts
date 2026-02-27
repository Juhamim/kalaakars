import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const project = await prisma.project.findUnique({
            where: { slug },
            include: { gallery: true, specs: true },
        });

        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // Map Prisma camelCase to the old Supabase snake_case keys the frontend expects
        return NextResponse.json({
            ...project,
            hero_img: project.heroImg,
            pull_quote: project.pullQuote,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await req.json();
        const { gallery, specs, id, createdAt, updatedAt, created_at, updated_at, gallery_images, ...data } = body;

        // Delete old relations and re-create
        await prisma.galleryImage.deleteMany({ where: { project: { slug } } });
        await prisma.spec.deleteMany({ where: { project: { slug } } });

        const project = await prisma.project.update({
            where: { slug },
            data: {
                slug: data.slug,
                num: data.num,
                title: data.title,
                subtitle: data.subtitle,
                category: data.category,
                location: data.location,
                year: data.year,
                heroImg: data.hero_img || data.heroImg,
                story: data.story,
                pullQuote: data.pull_quote || data.pullQuote,
                gallery: { create: gallery ?? [] },
                specs: { create: specs ?? [] },
            },
            include: { gallery: true, specs: true },
        });

        return NextResponse.json({
            ...project,
            hero_img: project.heroImg,
            pull_quote: project.pullQuote,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await prisma.project.delete({ where: { slug } });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
