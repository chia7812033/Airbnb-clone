import { create } from "zustand";

interface DateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DateModal = create<DateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default DateModal;
