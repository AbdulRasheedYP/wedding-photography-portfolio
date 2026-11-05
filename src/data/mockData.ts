import { Category, Project, TeamMember, Service, Testimonial } from "../types";

export const categories: Category[] = [
  { id: 1, name: "Events & Corporate", slug: "events" },
  { id: 2, name: "Fashion & Bridal", slug: "fashion" },
  { id: 3, name: "Reels & Social Media", slug: "reels" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Shobhika — Autumn Collection Launch",
    category: { id: 2, name: "Fashion & Bridal", slug: "fashion" },
    thumbnail: "/images/gallery/1.webp",
  },
  {
    id: 2,
    title: "Calicut Fashion Show — Season II",
    category: { id: 2, name: "Fashion & Bridal", slug: "fashion" },
    thumbnail: "/images/gallery/2.webp",
  },
  {
    id: 3,
    title: "Bridal Campaign — Shobhika Weddings",
    category: { id: 2, name: "Fashion & Bridal", slug: "fashion" },
    thumbnail: "/images/gallery/3.webp",
  },
  {
    id: 4,
    title: "Corporate Event Coverage — Dubai",
    category: { id: 1, name: "Events & Corporate", slug: "events" },
    thumbnail: "/images/gallery/4.webp",
  },
  {
    id: 5,
    title: "Cultural Gala — Jovial Events",
    category: { id: 1, name: "Events & Corporate", slug: "events" },
    thumbnail: "/images/gallery/5.webp",
  },
  {
    id: 6,
    title: "Social Media Campaign Reel",
    category: { id: 3, name: "Reels & Social Media", slug: "reels" },
    thumbnail: "/images/gallery/6.webp",
  },
  {
    id: 7,
    title: "Dubai Marina — Event Film",
    category: { id: 1, name: "Events & Corporate", slug: "events" },
    thumbnail: "/images/gallery/7.webp",
  },
  {
    id: 8,
    title: "Bridal Lookbook — Calicut",
    category: { id: 2, name: "Fashion & Bridal", slug: "fashion" },
    thumbnail: "/images/gallery/8.webp",
  },
  {
    id: 9,
    title: "Instagram Reel Series — Brand Launch",
    category: { id: 3, name: "Reels & Social Media", slug: "reels" },
    thumbnail: "/images/gallery/9.webp",
  },
  {
    id: 10,
    title: "Behind the Lens — BTS Coverage",
    category: { id: 1, name: "Events & Corporate", slug: "events" },
    thumbnail: "/images/gallery/10.webp",
  },
  {
    id: 11,
    title: "Shobhika — Lehenga Collection Film",
    category: { id: 2, name: "Fashion & Bridal", slug: "fashion" },
    thumbnail: "/images/gallery/11.webp",
  },
  {
    id: 12,
    title: "Promotional Reel — Seasonal Campaign",
    category: { id: 3, name: "Reels & Social Media", slug: "reels" },
    thumbnail: "/images/gallery/12.webp",
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
