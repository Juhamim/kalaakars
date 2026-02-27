import ProjectClient from "./ProjectClient";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { slug: id },
        include: { gallery: true, specs: true },
    });

    if (!project) return notFound();

    // Find the next project by number, looping back to first if it's the last one
    let nextProject = await prisma.project.findFirst({
        where: { num: { gt: project.num } },
        orderBy: { num: "asc" },
    });

    if (!nextProject) {
        nextProject = await prisma.project.findFirst({
            orderBy: { num: "asc" },
        });
    }

    const mappedProject = {
        ...project,
        heroImg: project.heroImg,
        hero_img: project.heroImg, // Ensure both exist for compatibility
        pullQuote: project.pullQuote,
    };

    const mappedNext = nextProject
        ? {
            ...nextProject,
            heroImg: nextProject.heroImg,
        }
        : mappedProject; // Fallback if there's only 1 project total

    return <ProjectClient project={mappedProject} nextProject={mappedNext} />;
}
