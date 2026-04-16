import { createContext, type RefObject } from 'react';
import type { ParticleBackgroundRef } from '../components/ParticleBackground';

export const ParticleBgRefContext = createContext<RefObject<ParticleBackgroundRef | null>>({ current: null });
