import { Category, Project, TeamMember, Service, Testimonial } from "../types";

export const categories: Category[] = [
  { id: 1, name: "Fashion & Event Cinema", slug: "showreel" },
  { id: 2, name: "Fashion & Bridal", slug: "fashion" },
  { id: 3, name: "Reels & Social Media", slug: "reels" },
  { id: 4, name: "Events & Corporate", slug: "events" },
];

/**
 * SHOWREEL & VIDEO PROJECTS (Method 1: Featured Main + Dynamic Additional Grid)
 * - projects[0] is displayed as the Main Featured Spotlight Reel with silent video loop.
 * - When you provide new reels, simply add them to this array and they will automatically appear in the grid below!
 */
export const projects: Project[] = [
  {
    id: "official-showreel",
    title: "Official Showreel 2026",
    category: { id: 1, name: "Fashion & Event Cinema", slug: "showreel" },
    thumbnail: "/images/hero/hero_bg.webp",
    video_url: "/videos/showreel.mp4",
    client_name: "Adil Mubarak Films",
    description: "Cinematic montage of bridal campaigns, fashion shows, and event films captured across Dubai and Kerala.",
  },
];

export const team: TeamMember[] = [
  { id: 1, name: "Adil Mubarak", role: "Videographer & Photographer" },
];

export const services: Service[] = [
  { id: 1, title: "Event Videography & Photography" },
  { id: 2, title: "Fashion & Bridal Content" },
  { id: 3, title: "Reel Editing & Short-Form Video" },
  { id: 4, title: "Color Grading — DaVinci Resolve" },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    client_name: "Shobhika Weddings",
    role: "Bridal Brand · Calicut, Kerala",
    text: "Adil has an exceptional eye for fashion. He filmed all three of our seasonal shows and produced promotional content that truly captured the soul of each collection. His post-production work on DaVinci Resolve gave our brand a cinematic identity.",
    rating: 5,
  },
  {
    id: 2,
    client_name: "Jovial Events",
    role: "Event Management · Dubai, UAE",
    text: "Working with Adil in Dubai was seamless. He delivered fast-turnaround content for multiple events while maintaining top visual quality. His ability to work across cultural events and corporate galas made him irreplaceable.",
    rating: 5,
  },
  {
    id: 3,
    client_name: "Corporate Client",
    role: "Corporate Gala · Dubai, UAE",
    text: "Adil captured our annual gala with a cinematic quality we hadn't seen before. The highlight video he produced received incredible engagement across our social channels.",
    rating: 5,
  },
  {
    id: 4,
    client_name: "Fashion Brand",
    role: "Collection Launch · Calicut",
    text: "The reels Adil created for our collection launch stopped the scroll. His editing rhythm and color palette matched exactly what we envisioned. Pure creative excellence.",
    rating: 5,
  },
  {
    id: 5,
    client_name: "Event Organizer",
    role: "Cultural Event · UAE",
    text: "Adil's ability to capture authentic moments under time pressure is remarkable. He never misses a beat and always delivers content that tells the full story of the day.",
    rating: 5,
  },
  {
    id: 6,
    client_name: "Social Media Brand",
    role: "Instagram Campaign · Kerala",
    text: "We briefed Adil for a series of brand reels and what he delivered exceeded expectations. The colour grading, transitions, and storytelling rhythm were exactly on-brand. Very professional.",
    rating: 5,
  },
];
