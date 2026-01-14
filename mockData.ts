
import { Property, UserRole, User, Room } from './types';

export const currentUser: User = {
  id: 'user_1',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.RENTER,
  avatar: 'https://picsum.photos/seed/user/100/100'
};

const MOCK_ROOMS: Room[] = [
  { id: 'r1', name: 'Master Suite A', type: 'Single', isAvailable: true, priceExtra: 2000, dimensions: '12x14 ft', features: ['Attached Bath', 'Balcony'] },
  { id: 'r2', name: 'Standard Room B', type: 'Double', isAvailable: false, priceExtra: 0, dimensions: '10x12 ft', features: ['Garden View'] },
  { id: 'r3', name: 'Compact Room C', type: 'Single', isAvailable: true, priceExtra: -1000, dimensions: '8x10 ft', features: ['Quiet Side'] },
  { id: 'r4', name: 'Premium Room D', type: 'Single', isAvailable: true, priceExtra: 3500, dimensions: '15x15 ft', features: ['AC', 'Smart TV'] },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p_1',
    title: 'Luxury Zen PG',
    type: 'PG',
    rent: 15000,
    location: 'Indiranagar',
    city: 'Bangalore',
    amenities: ['WiFi', 'AC', 'Power Backup', 'Laundry', 'Meals'],
    gender: 'Unisex',
    availability: 4,
    rating: 4.8,
    ownerId: 'owner_1',
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800'],
    description: 'Modern luxury PG with all premium amenities in the heart of the city.',
    rules: ['No smoking', 'Gate closes at 11 PM', 'Guests allowed until 9 PM'],
    rooms: MOCK_ROOMS
  },
  {
    id: 'p_2',
    title: 'Sunrise 2BHK Flat',
    type: 'Flat',
    rent: 32000,
    location: 'HSR Layout',
    city: 'Bangalore',
    amenities: ['Parking', 'Security', 'Balcony', 'Gym'],
    gender: 'Unisex',
    availability: 1,
    rating: 4.5,
    ownerId: 'owner_1',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800'],
    description: 'Spacious semi-furnished 2BHK with excellent ventilation and park view.',
    rules: ['Bachelors allowed', 'Small pets welcome'],
    rooms: MOCK_ROOMS.slice(0, 2)
  },
  {
    id: 'p_3',
    title: 'Elite Girls Living',
    type: 'PG',
    rent: 12000,
    location: 'Koramangala',
    city: 'Bangalore',
    amenities: ['WiFi', 'Meals', 'CCTV', 'Lift'],
    gender: 'Female',
    availability: 2,
    rating: 4.2,
    ownerId: 'owner_2',
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800'],
    description: 'Safe and secure living space exclusively for women working in Koramangala.',
    rules: ['Strictly female', 'Visitors allowed in lobby only'],
    rooms: MOCK_ROOMS
  }
];
