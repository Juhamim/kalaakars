export interface Project {
    id: string;
    slug: string;
    num: string;
    title: string;
    subtitle: string;
    category: string;
    location: string;
    year: string;
    heroImg: string;
    gallery: { src: string; span: "full" | "half" }[];
    specs: { label: string; value: string }[];
    story: string;
    pullQuote?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "00",
        slug: "beach-house-calicut",
        num: "00",
        title: "BEACH HOUSE CALICUT",
        subtitle: "Residential",
        category: "RESIDENTIAL",
        location: "CALICUT, KL",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2400&auto=format&fit=crop",
        gallery: [
            { src: "https://images.unsplash.com/photo-1600585154340-be6199f7c096?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c349fbd?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2400&auto=format&fit=crop", span: "full" },
        ],
        specs: [
            { label: "Status", value: "Completed" },
            { label: "Client", value: "Private" },
            { label: "Program", value: "Beach Residence" },
            { label: "Area", value: "4,200 sq.ft" },
            { label: "Year", value: "2024" },
            { label: "Principal", value: "Ar. Vishal Sharma" },
        ],
        story: `Perched between the Arabian Sea and the coconut groves of Calicut's shoreline, Beach House responds to the rhythm of the Malabar coast. The structure is oriented to capture the dominant southwest monsoon breeze while shading the interior from the harsh afternoon sun.`,
        pullQuote: "Every good building begins by listening to the land.",
    },
    {
        id: "01",
        slug: "grand-ridge-drive",
        num: "01",
        title: "GRAND RIDGE DRIVE",
        subtitle: "Residential",
        category: "RESIDENTIAL",
        location: "CALICUT, KL",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1600585154340-be6199f7c096?q=80&w=2400&auto=format&fit=crop",
        gallery: [
            { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c349fbd?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2400&auto=format&fit=crop", span: "full" },
            { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2400&auto=format&fit=crop", span: "half" },
        ],
        specs: [
            { label: "Status", value: "Completed" },
            { label: "Client", value: "Private" },
            { label: "Program", value: "Single Family Residential" },
            { label: "Area", value: "5,400 sq.ft" },
            { label: "Year", value: "2024" },
            { label: "Principal", value: "Ar. Vishal Sharma" },
        ],
        story: "Located on a prominent ridge in Calicut's hilly terrain, this residence dissolves the boundary between architecture and the lush Kerala landscape. Every decision was made in service of framing the Malabar coastline and managing the monsoon light.",
        pullQuote: "Architecture is not about form. It is about the nature of space.",
    },
    {
        id: "02",
        slug: "void-atrium",
        num: "02",
        title: "VOID ATRIUM",
        subtitle: "Commercial",
        category: "COMMERCIAL",
        location: "KOZHIKODE, KL",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop",
        gallery: [
            { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop", span: "full" },
            { src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2400&auto=format&fit=crop", span: "half" },
        ],
        specs: [
            { label: "Status", value: "In Progress" },
            { label: "Client", value: "Private" },
            { label: "Program", value: "Mixed-Use Commercial" },
            { label: "Area", value: "22,000 sq.ft" },
            { label: "Year", value: "2025" },
            { label: "Principal", value: "Ar. Ayaan Kapoor" },
        ],
        story: "Set in the heart of Kozhikode's urban fabric, Void Atrium reimagines the modern workspace as a sanctuary of light informed by Kerala's deep tradition of nalukettu courtyard architecture.",
        pullQuote: "The void is the most powerful architectural element.",
    },
    {
        id: "03",
        slug: "malabar-house",
        num: "03",
        title: "MALABAR HOUSE",
        subtitle: "Cultural",
        category: "CULTURAL",
        location: "CALICUT, KL",
        year: "2025",
        heroImg: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2400&auto=format&fit=crop",
        gallery: [
            { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2400&auto=format&fit=crop", span: "full" },
        ],
        specs: [
            { label: "Status", value: "Design Development" },
            { label: "Client", value: "City of Calicut" },
            { label: "Program", value: "Public Cultural Center" },
            { label: "Area", value: "48,000 sq.ft" },
            { label: "Year", value: "2025" },
            { label: "Principal", value: "Ar. Vishal Sharma" },
        ],
        story: "Malabar House is a cultural center conceived as an instrument of the Kerala coast — a building that makes the invisible traditions of Malabar visible and tangible for future generations.",
        pullQuote: "To build in Kerala is to listen to the monsoon first.",
    },
    {
        id: "04",
        slug: "kochi-waterfront",
        num: "04",
        title: "KOCHI WATERFRONT",
        subtitle: "Landscape",
        category: "LANDSCAPE",
        location: "KOCHI, KL",
        year: "2024",
        heroImg: "https://images.unsplash.com/photo-1449156001437-3a1f93977c71?q=80&w=2400&auto=format&fit=crop",
        gallery: [
            { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2400&auto=format&fit=crop", span: "full" },
            { src: "https://images.unsplash.com/photo-1600567026023-9f17e27dcaf6?q=80&w=2400&auto=format&fit=crop", span: "half" },
            { src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2400&auto=format&fit=crop", span: "half" },
        ],
        specs: [
            { label: "Status", value: "Completed" },
            { label: "Client", value: "Private" },
            { label: "Program", value: "Hospitality / Pavilion" },
            { label: "Area", value: "3,200 sq.ft" },
            { label: "Year", value: "2024" },
            { label: "Principal", value: "Ar. Ayaan Kapoor" },
        ],
        story: "Situated at the edge of Fort Kochi's backwaters, this pavilion draws from the Chinese fishing nets and Portuguese fort heritage of the Kerala coast — a delicate mediator between the human body and the Arabian Sea.",
        pullQuote: "The best building is the one you don't see.",
    },
];
