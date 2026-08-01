import { create } from 'zustand';

type State = {
  open: boolean;
  setOpen: () => void;
  close: () => void;
};

const useSidebar = create<State>((set) => ({
  open: false,
  setOpen: () => set((state: State) => ({ open: !state.open })),
  close: () => set((state: State) => ({ open: false })),
}));

export default useSidebar;
