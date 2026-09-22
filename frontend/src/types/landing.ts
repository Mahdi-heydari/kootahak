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
export interface ProfileProps {
  user: {
    name: string;
    phone: string;
    avatar?: string;
  };
}

export interface UserInfo {
  name: string;
  phone: string;
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

interface UsefulLink {
  href: string;
  label: string;
  external?: boolean;
}

interface Statistic {
  value: string;
  label: string;
}

export interface FooterContent {
  about: {
    description: string;
  };
  usefulLinks: UsefulLink[];
  statistics: Statistic[];
  contact: {
    telegram: {
      value: string;
      href: string;
    };
    email: {
      value: string;
      href: string;
    };
    workingHours: {
      value: string;
    };
    cta: {
      label: string;
      href: string;
    };
  };
  socialLinks: SocialLink[];
}
