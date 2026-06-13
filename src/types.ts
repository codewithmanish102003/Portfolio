import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export type Skill = {
  icon: LucideIcon;
  title: string;
  skills: string;
  color: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
};

export type Education = {
  level: string;
  title: string;
  institution: string;
  detail: string;
  color: string;
  badge: string;
};

export type Achievement = {
  text: string;
  accent: string;
};

export type ContactItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
};
