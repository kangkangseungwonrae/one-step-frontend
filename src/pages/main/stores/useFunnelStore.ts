import { useContext } from 'react';
import { useStore } from 'zustand';

import { FunnelContext, type FunnelState } from './funnel.provider';

const useFunnelStore = <T>(selector: (state: FunnelState) => T): T => {
  const store = useContext(FunnelContext);
  if (!store) {
    throw new Error('FunnelStore not found');
  }
  return useStore(store, selector);
};

export default useFunnelStore;
