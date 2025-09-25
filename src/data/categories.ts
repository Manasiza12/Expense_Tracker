import { Category } from '../types/expense';
import { 
  ShoppingBag, 
  Home, 
  Car, 
  Utensils, 
  Plane, 
  Heart, 
  Wifi,
  Smartphone
} from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'shopping',
    name: 'Shopping',
    color: '#FF6B6B',
    icon: ShoppingBag
  },
  {
    id: 'housing',
    name: 'Housing',
    color: '#4ECDC4',
    icon: Home
  },
  {
    id: 'transport',
    name: 'Transport',
    color: '#45B7D1',
    icon: Car
  },
  {
    id: 'food',
    name: 'Food & Dining',
    color: '#96CEB4',
    icon: Utensils
  },
  {
    id: 'travel',
    name: 'Travel',
    color: '#D4A5A5',
    icon: Plane
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#FF9999',
    icon: Heart
  },
  {
    id: 'utilities',
    name: 'Utilities',
    color: '#9B59B6',
    icon: Wifi
  },
  {
    id: 'others',
    name: 'Others',
    color: '#BDC3C7',
    icon: Smartphone
  }
];