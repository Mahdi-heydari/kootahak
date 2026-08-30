export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

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
