import { Range } from "react-date-range";
import { create } from "zustand";

interface ReservationStore {
  guestCount: number;
  setGuestCount: (value: number) => void;
  dateRange: Range;
  setDateRange: (value: Range) => void;
  setDateRangeInitial: () => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
}

const tomorrow = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  return today;
};

const initialDateRange = {
  startDate: new Date(Date.now()),
  endDate: tomorrow(),
  key: "selection",
};

const useReservation = create<ReservationStore>((set) => ({
  guestCount: 1,
  setGuestCount: (value: number) => set((state) => ({ guestCount: value })),
  dateRange: initialDateRange,
  setDateRange: (value: Range) => set((state) => ({ dateRange: value })),
  setDateRangeInitial: () => set((state) => ({ dateRange: initialDateRange })),
  totalPrice: 0,
  setTotalPrice: (value: number) => set((state) => ({ totalPrice: value })),
}));

export default useReservation;
