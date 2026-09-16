import {
  User,
  Link2,
  Globe,
  Clock,
  Link,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Globe2,
  UserRound,
  ArrowLeft,
  LockKeyhole,
  UserPlus,
  ClipboardPaste,
  X,
  Menu,
  Settings,
  Check,
  Copy,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pin,
  Pencil,
  Trash2,
  ToggleLeft,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowLeftFromLine,
  MousePointerClick,
  ShieldQuestion,
  Share2,
  MessageCircleMore,
  Sun,
  Moon,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const icons = {
  User,
  Link2,
  Globe,
  Clock,
  Link,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Globe2,
  UserRound,
  ArrowLeft,
  LockKeyhole,
  UserPlus,
  ClipboardPaste,
  X,
  Menu,
  Settings,
  Check,
  Copy,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pin,
  Pencil,
  Trash2,
  ToggleLeft,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowLeftFromLine,
  MousePointerClick,
  ShieldQuestion,
  Share2,
  MessageCircleMore,
  Sun,
  Moon,
};

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

const GetIcon = ({ name, size = 16, ...rest }: IconProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} {...rest} />;
};

export default GetIcon;
