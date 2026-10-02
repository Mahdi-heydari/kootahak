import type { IconName } from "@/components/ui/Icon";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

// Profile
export interface ProfileMenuItem {
  href: string;
  label: string;
  icon: IconName;
}

export interface ProfileContent {
  menuItems: ProfileMenuItem[];
  logoutLabel: string;
}

// Hero
export interface HeroFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface HeroTrustItem {
  icon: IconName;
  text: string;
}

export interface HeroContent {
  preTitle: string;
  titleHighlightWords: string[];
  title: string;
  description: string;
  placeholder: string;
  features: HeroFeature[];
  trustItems: HeroTrustItem[];
}

// Problems
export interface ProblemItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface ProblemsContent {
  heading: {
    before: string;
    highlight: string;
    after: string;
    description: string;
  };
  problems: ProblemItem[];
}

// Solutions
export interface SolutionBenefit {
  icon: IconName;
  text: string;
}

export interface SolutionContent {
  heading: {
    line1: string;
    line2Before: string;
    highlight: string;
  };
  description: string;
  benefits: SolutionBenefit[];
  cta: {
    label: string;
    tagline: string;
  };
}

// Footer
interface SocialLink {
  href: string;
  icon: IconName;
  label: string;
}

interface Statistic {
  value: string;
  label: string;
}

export interface FooterContent {
  about: {
    description: string;
  };
  statistics: Statistic[];
  contact: {
    developers: {
      label: string;
      href: string;
    };
  };
  socialLinks: SocialLink[];
}

export interface DeveloperSocial {
  label: string;
  value: string;
  href: string;
  icon: IconName;
  external?: boolean;
}

export interface Developer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  socials: DeveloperSocial[];
}

export interface DevelopersContent {
  heading: {
    before: string;
    highlight: string;
    after: string;
    description: string;
  };
  developers: Developer[];
}
