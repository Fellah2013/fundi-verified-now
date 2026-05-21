export type UserRole = 'customer' | 'fundi' | 'admin';

export type SubscriptionTier = 'none' | 'basic' | 'standard' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  isRegistered: boolean; // Paid KES 200
  subscription: SubscriptionTier;
  avatar?: string;
  walletBalance?: number;
}

export interface Fundi extends User {
  category: string;
  skills: string[];
  rating: number;
  jobCount: number;
  isVerified: boolean;
  hourlyRate: number;
  availability: boolean;
  trustedBadge: boolean;
}

export interface Service {
  name: string;
  description?: string;
  action?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  description?: string;
  services: Service[];
}

export interface Booking {
  id: string;
  customerId: string;
  fundiId: string;
  category: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  type: 'emergency' | 'scheduled';
  date: string;
  description: string;
  amount: number;
  location: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'payment' | 'withdrawal' | 'subscription' | 'registration';
  status: 'completed' | 'pending';
  date: string;
  description: string;
}