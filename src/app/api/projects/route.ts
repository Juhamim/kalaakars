import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: { gallery: true, specs: true },
            orderBy: { num: "asc" },
        });
        const mapped = projects.map(p => ({
            ...p,
            hero_img: p.heroImg,
            pull_quote: p.pullQuote,
        }));
        return NextResponse.json(mapped);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { gallery, specs, ...data } = body;

        const project = await prisma.project.create({
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

        return NextResponse.json(project, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
