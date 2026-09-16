// Shared types matching Prisma models (for client-side usage)
export interface SchoolProfile {
  id?: string;
  name: string;
  npsn?: string | null;
  nss?: string | null;
  accreditation?: string | null;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  postalCode?: string | null;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  logo?: string | null;
  vision: string;
  mission: string;
  goals: string;
  history: string;
  headmasterName: string;
  headmasterPhoto?: string | null;
  headmasterWelcome: string;
  headmasterNip?: string | null;
  mapEmbed?: string | null;
  serviceHours?: string | null;
}

export interface Teacher {
  id: string;
  name: string;
  photo?: string | null;
  nip?: string | null;
  nuptk?: string | null;
  position: string;
  education: string;
  subject?: string | null;
  category: string;
  gender: string;
  phone?: string | null;
  email?: string | null;
  bio?: string | null;
  order: number;
}

export interface Student {
  id: string;
  nisn?: string | null;
  nis?: string | null;
  name: string;
  gender: string;
  className: string;
  academicYear: string;
  status: string;
}

export interface Facility {
  id: string;
  name: string;
  photo?: string | null;
  category: string;
  quantity: number;
  condition: string;
  description?: string | null;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  photo: string;
  category: string;
  description?: string | null;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string | null;
  content: string;
  photo?: string | null;
  category: string;
  published: boolean;
  publishedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  icon?: string | null;
  order: number;
}

export interface OrganizationMember {
  id: string;
  name: string;
  position: string;
  photo?: string | null;
  order: number;
}

export interface StudentSummary {
  total: number;
  male: number;
  female: number;
}

export interface StudentByClass {
  className: string;
  male: number;
  female: number;
  total: number;
}

export interface StudentByYear {
  academicYear: string;
  male: number;
  female: number;
  total: number;
}
