import { create } from 'zustand';

interface ScrollState {
  px: number;
  py: number;
  pz: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  set: (s: Partial<Omit<ScrollState, 'set'>>) => void;
}

export const useScrollState = create<ScrollState>((set) => ({
  px: 0.5,
  py: 0.15,
  pz: 0,
  rx: Math.PI * 0.08,
  ry: Math.PI * 0.08,
  rz: 0,
  scale: 0.85,
  set: (partial) => set(partial),
}));
