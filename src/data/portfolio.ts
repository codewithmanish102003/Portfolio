import {
  BrainIcon,
  Code2,
  Database,
  Github,
  Instagram,
  Layers,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  RocketIcon,
  Server,
} from 'lucide-react';
import type { Achievement, ContactItem, Education, NavLink, Project, Skill } from '../types';

export const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
];

export const skills: Skill[] = [
  { icon: Code2, title: 'Languages', skills: 'JavaScript, TypeScript, Python, C, C++, Java', color: 'from-sky-500 to-blue-600' },
  { icon: Layout, title: 'Frontend', skills: 'React.js, Next.js, HTML5, CSS3, Tailwind, Bootstrap', color: 'from-violet-500 to-purple-600' },
  { icon: Server, title: 'Backend', skills: 'Node.js, Express.js, Flask, REST API, GraphQL', color: 'from-emerald-500 to-teal-600' },
  { icon: Database, title: 'Database', skills: 'MongoDB, MySQL, Mongoose', color: 'from-amber-500 to-orange-600' },
  { icon: Layers, title: 'Tools & Platforms', skills: 'Git, GitHub, VS Code, Postman, Redis, Hostinger', color: 'from-rose-500 to-pink-600' },
  { icon: RocketIcon, title: 'Currently Learning', skills: 'SEO Optimization, System Design', color: 'from-cyan-500 to-sky-600' },
  { icon: BrainIcon, title: 'Future Goals', skills: 'AI, Machine Learning, Deep Learning, Blockchain', color: 'from-indigo-500 to-violet-600' },
];

export const workProjects: Project[] = [
    {
    title: 'Axorvia Studio',
    description: 'Full-featured corporate platform for an IT services firm with lead capture and service showcasing.',
    image: 'axorvia.png',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
    github: '#',
    live: 'https://getaxorvia.com/',
    gradient: 'from-amber-500 to-orange-600',
  },
      {
    title: 'Cancer Care - NGO Foundation',
    description: 'A dedicated platform for a cancer care NGO, providing information, resources, and support for patients and families.',
    image: 'cancercare.png',
    tech: ['Next.js', 'Node.js', 'Tailwind', 'MongoDB'],
    github: '#',
    live: 'https://cancercaremissionfoundation.in',
    gradient: 'from-violet-500 to-purple-600',
  },
   {
    title: 'Saskat Jeevan Vikas Samiti',
    description: 'A clean and informative NGO website designed to highlight community initiatives, build trust with visitors, and make programs, mission, and outreach efforts easy to explore.',
    image: 'sashakt.png',
    tech: ['React.js', 'Node.js', 'Tailwind', 'MongoDB'],
    github: '#',
    live: 'https://sashaktjeevansamajikvikassamiti.com/',
    gradient: 'from-amber-500 to-orange-600',
  },
  // {
  //   title: 'Time To Legal - CRM Management System',
  //   description: 'A comprehensive CRM platform for employee task tracking, attendance management, and workflow automation.',
  //   image: 'timetolegal.png',
  //   tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
  //   github: '#',
  //   live: 'https://ttl.timetolegal.com/login',
  //   gradient: 'from-emerald-500 to-teal-600',
  // },
  {
    title: 'Electronic Prescriber - E-Prescription System',
    description: 'Secure digital prescription platform connecting healthcare providers and pharmacies with end-to-end encryption.',
    image: 'eps.png',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: '#',
    live: 'https://doserx.dosedefence.com',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Dosedefence - Pharmacy Management',
    description: 'Centralized pharmacy operations platform with inventory control, sales tracking, and customer management.',
    image: 'dosedefence.png',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Tailwind'],
    github: '#',
    live: 'https://dosedefence.com',
    gradient: 'from-rose-500 to-pink-600',
  },
  // {
  //   title: 'Chat Support',
  //   description: 'Real-time chat support system for customer engagement and assistance.',
  //   image: 'chat.png',
  //   tech: ['React', 'Node.js', 'Tailwind', 'Shadcn', 'Flutter', 'Firebase'],
  //   github: '#',
  //   live: 'https://support.dosedefence.com',
  //   gradient: 'from-violet-500 to-purple-600',
  // },


 
];

export const education: Education[] = [
  { level: 'BCA', title: 'Bachelor of Computer Application', institution: 'University of Rajasthan', detail: 'CGPA 8.4 - 2025', color: 'from-blue-500 to-indigo-600', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { level: 'XII', title: 'Senior Secondary (RBSE)', institution: 'Welfare Academy', detail: '89.20% - 2022', color: 'from-emerald-500 to-teal-600', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { level: 'X', title: 'Secondary (RBSE)', institution: 'Sharda Vidhya Bhawan Sr. Sec. School', detail: '89.67% - 2020', color: 'from-violet-500 to-purple-600', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
];

export const achievements: Achievement[] = [
  { text: 'Certified in SmartCom 2023 and Namaste Web3 from Jaipur', accent: 'blue' },
  { text: 'Completed Upflairs Pvt Ltd Web Development and Designing program (2024)', accent: 'emerald' },
  { text: 'Achieved certification in Cloud Computing Basics from Scaler Academy', accent: 'amber' },
  { text: 'Completed Web Development and Designing from Broadcast Engineering Consultants India Limited (2024)', accent: 'rose' },
  { text: 'Certified in All India National Creativity Aptitude Test by Naukri (2025)', accent: 'violet' },
];

export const accentClass: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export const contactItems: ContactItem[] = [
  { icon: Mail, label: 'Email', value: 'marveluniverse1942@gmail.com', href: 'mailto:marveluniverse1942@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9649527632', href: 'tel:9649527632' },
  { icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan, India', href: '#' },
  { icon: Github, label: 'GitHub', value: 'codewithmanish102003', href: 'https://github.com/codewithmanish102003' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Manish Prajapati', href: 'https://linkedin.com/in/manish-prajapati-651a212aa' },
];

export const socialLinks = [
  { href: 'https://github.com/codewithmanish102003', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/manish-prajapati-651a212aa', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/marvel102003', icon: Instagram, label: 'Instagram' },
  { href: 'mailto:marveluniverse1942@gmail.com', icon: Mail, label: 'Email' },
];
