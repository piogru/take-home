import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  deletedCardIdSet: Set<number>;
  expandedCardIdSet: Set<number>;
};

type Actions = {
  deleteCard: (cardId: number) => void;
  restoreCard: (cardId: number) => void;
  toggleCard: (cardId: number) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      deletedCardIdSet: new Set(),
      expandedCardIdSet: new Set(),

      deleteCard: (cardId) => {
        if (!get().deletedCardIdSet.has(cardId)) {
          set((state) => {
            state.deletedCardIdSet.add(cardId);
          });
        }
      },
      restoreCard: (cardId) => {
        console.warn("Not implemented");
        // To implement:
        // Find delete cardId from deletedCardIds Set
      },
      toggleCard: (cardId) => {
        if (get().expandedCardIdSet.has(cardId)) {
          set((state) => {
            state.expandedCardIdSet.delete(cardId);
          });
        } else {
          set((state) => {
            state.expandedCardIdSet.add(cardId);
          });
        }
      },
    })),
    { name: "store" }
  )
);
