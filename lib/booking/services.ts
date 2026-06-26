import {
  Sparkles,
  Sun,
  Gem,
  Syringe,
  Crown,
  Smile,
  Pipette,
  Scissors,
  Layers,
} from 'lucide-react';

export const SERVICES = [
  {
    key: 'scaling',
    name: 'Scaling & Polishing',
    price: 79,
    unit: 'AED',
    icon: Sparkles,
    doctorPreference: 'any',
    duration: 30,
  },
  {
    key: 'whitening',
    name: 'Teeth Whitening',
    price: 299,
    unit: 'AED',
    icon: Sun,
    doctorPreference: 'mafaza',
    duration: 30,
  },
  {
    key: 'hollywood',
    name: 'Hollywood Smile',
    price: 999,
    unit: 'AED',
    icon: Gem,
    doctorPreference: 'mohamad',
    duration: 60,
  },
  {
    key: 'root-canal',
    name: 'Root Canal',
    price: 399,
    unit: 'from AED',
    icon: Syringe,
    doctorPreference: 'iqra',
    duration: 60,
  },
  {
    key: 'crown',
    name: 'Crown',
    price: 299,
    unit: 'AED',
    icon: Crown,
    doctorPreference: 'mohamad',
    duration: 30,
  },
  {
    key: 'braces',
    name: 'Braces Consult',
    price: 399,
    unit: 'from AED',
    icon: Smile,
    doctorPreference: 'mafaza',
    duration: 30,
  },
  {
    key: 'filling',
    name: 'Filling',
    price: 139,
    unit: 'from AED',
    icon: Pipette,
    doctorPreference: 'iqra',
    duration: 30,
  },
  {
    key: 'extraction',
    name: 'Extraction',
    price: 99,
    unit: 'from AED',
    icon: Scissors,
    doctorPreference: 'any',
    duration: 30,
  },
  {
    key: 'denture',
    name: 'Denture Consult',
    price: 249,
    unit: 'from AED',
    icon: Layers,
    doctorPreference: 'any',
    duration: 30,
  },
] as const;

export type ServiceKey = (typeof SERVICES)[number]['key'];

export function getServiceByKey(key: string) {
  return SERVICES.find((s) => s.key === key);
}
