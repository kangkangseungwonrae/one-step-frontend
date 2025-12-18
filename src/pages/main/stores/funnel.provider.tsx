import { createContext, useRef, type ReactNode } from 'react';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Task } from '@/api/task/dto';

export interface FunnelState {
  selectedTask: Task | null;
  setSelectedTask: (selectedTask: Task | null) => void;

  selectedMood: string | null;
  setSelectedMood: (selectedMood: string | null) => void;
}

const createFunnelStore = () => {
  return createStore<FunnelState>()(
    devtools(
      (set) => ({
        selectedTask: null,
        setSelectedTask: (selectedTask: Task | null) => set({ selectedTask }),

        selectedMood: null,
        setSelectedMood: (selectedMood: string | null) => set({ selectedMood }),
      }),
      {
        name: 'funnel-store',
      }
    )
  );
};

type FunnelStore = ReturnType<typeof createFunnelStore>;
export const FunnelContext = createContext<FunnelStore | null>(null);

export default function FunnelProvider({ children }: { children: ReactNode }) {
  const funnelStore = useRef(createFunnelStore());
  return <FunnelContext.Provider value={funnelStore.current}>{children}</FunnelContext.Provider>;
}
