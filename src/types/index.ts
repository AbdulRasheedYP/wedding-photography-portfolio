export interface Category {
  id: number | string;
  name: string;
  slug: string;
}

export interface Project {
  id: number | string;
  title: string;
  category: Category;
  thumbnail: string;
  video_url?: string;
  preview_url?: string;
  video_embed_url?: string;
  client_name?: string;
  description?: string;
  aspect?: "landscape" | "portrait";
}

export interface TeamMember {
  id: number | string;
  name: string;
  role: string;
  image?: string;
}

export interface Service {
  id: number | string;
  title: string;
  description?: string;
}

export interface Testimonial {
  id: number | string;
  client_name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  budget_range?: string;
  message: string;
}
