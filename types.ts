
export enum UserRole {
  RENTER = 'RENTER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN'
}

export type PropertyType = 'PG' | 'Flat';

export interface IdentityProof {
  aadhar?: string;
  pan?: string;
  drivingLicense?: string;
  stampPaperUrl?: string; // For owners
}

export interface OwnerDetails {
  age: number;
  familyInfo: string;
  contactAddress: string;
  isAgreementSigned: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  identity?: IdentityProof;
  ownerDetails?: OwnerDetails;
}

export interface Room {
  id: string;
  name: string;
  type: 'Single' | 'Double' | 'Triple';
  isAvailable: boolean;
  priceExtra: number;
  dimensions: string;
  features: string[];
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  rent: number;
  location: string;
  city: string;
  amenities: string[];
  gender: 'Male' | 'Female' | 'Unisex';
  availability: number;
  rating: number;
  ownerId: string;
  images: string[];
  description: string;
  rules: string[];
  rooms?: Room[];
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  propertyName: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  checkInDate: string;
  amount: number;
  image: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  type: 'RENT' | 'DEPOSIT' | 'MAINTENANCE';
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  renterId: string;
  issue: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
}
