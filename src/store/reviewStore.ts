import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Review {
    id: number;
    name: string;
    message: string;
    rating: number;
}

interface ReviewState {
    reviews: Review[];
    addReview: (review: Review) => void;
    hydrateStore: () => void;
}

export const useReviewStore = create<ReviewState>()(
    persist(
        (set, get) => ({
            reviews: [],
            addReview: (review) =>
                set((state) => ({
                    reviews: [...state.reviews, review],
                })),
            hydrateStore: () => {
                if (typeof window !== "undefined") {
                    const storedReviews = localStorage.getItem("reviews-storage");
                    if (storedReviews) {
                        const parsedData = JSON.parse(storedReviews);
                        set({ reviews: parsedData.state.reviews || [] });
                    }
                }
            },
        }),
        {
            name: "reviews-storage",
            storage: createJSONStorage(() => localStorage), // Ensures JSON storage format
        }
    )
);
