export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    location: string;
    year: string;
    heroImg: string;
    gallery: { src: string; type: "full" | "half" }[];
    specs: { label: string; value: string }[];
    story: string;
    storySecondary?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "grand-ridge-drive",
        title: "GRAND RIDGE DRIVE",
        subtitle: "A NEW HORIZON IN RESIDENTIAL ARCHITECTURE",
        category: "RESIDENTIAL",
        location: "TORONTO, ON",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1600585154340-be6199f7c096?q=80&w=2070",
        gallery: [
            { src: "https://images.unsplash.com/photo-1600607687940-4e5a994239b3?q=80&w=2070", type: "half" },
            { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2048", type: "half" },
            { src: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074", type: "full" },
            { src: "https://images.unsplash.com/photo-1449156001437-3a1f93977c71?q=80&w=2070", type: "half" },
            { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069", type: "half" }
        ],
        specs: [
            { label: "Status", value: "Completed" },
            { label: "Client", value: "Private" },
            { label: "Program", value: "Single Family Residential" },
            { label: "Area", value: "5,400 sq.ft" },
            { label: "Lead Architect", value: "Ar. Vishal Sharma" },
            { label: "Structural", value: "Kalaakars Engineering" },
            { label: "Design Team", value: "P. Mehta, R. Singh" }
        ],
        story: "Located on a prominent ridge overlooking the valley, the Grand Ridge Drive residence is a masterclass in structural weightlessness. The design utilizes cantilevered concrete slabs and vast expanses of floor-to-ceiling glass to dissolve the boundary between interior and sky.",
        storySecondary: "The interior program is organized around a central atrium that brings light deep into the structure. Materials were selected for their raw honesty: board-formed concrete, blackened steel, and white oak."
    },
    {
        id: "void-atrium",
        title: "VOID ATRIUM",
        subtitle: "THE ARCHITECTURE OF SILENCE",
        category: "COMMERCIAL",
        location: "DUBAI, UAE",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1600607687940-4e5a994239b3?q=80&w=2070",
        gallery: [
            { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2048", type: "full" },
            { src: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074", type: "half" },
            { src: "https://images.unsplash.com/photo-1449156001437-3a1f93977c71?q=80&w=2070", type: "half" }
        ],
        specs: [
            { label: "Status", value: "In Progress" },
            { label: "Client", value: "NeoCorp" },
            { label: "Program", value: "Commercial Atrium" },
            { label: "Area", value: "12,000 sq.ft" }
        ],
        story: "Void Atrium reimagines the modern workspace as a sanctuary of light. By hollowing out the core of the structure, we've created a vertical landscape that breathes and adapts to the path of the sun."
    }
];
