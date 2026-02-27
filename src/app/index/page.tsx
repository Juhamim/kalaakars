import IndexClient from "./IndexClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
    const projects = await prisma.project.findMany({
        include: { gallery: true, specs: true },
        orderBy: { num: "asc" },
    });

    // Map to format UI components expect
    const mapped = projects.map(p => ({
        ...p,
        hero_img: p.heroImg,
        pull_quote: p.pullQuote,
    }));

    return <IndexClient initialProjects={mapped} />;
}
