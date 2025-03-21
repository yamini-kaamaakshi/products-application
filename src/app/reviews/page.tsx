"use client";
import { useState, useEffect } from "react";
import { useReviewStore } from "@/store/reviewStore";

export default function ReviewsPage() {
    const { reviews, addReview, hydrateStore } = useReviewStore();

    useEffect(() => {
        hydrateStore(); // Load reviews from localStorage on page load
    }, []);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message) return;

        addReview({
            id: Date.now(),
            name,
            message,
            rating,
        });

        setName("");
        setMessage("");
        setRating(5);
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
            <p className="text-lg mb-4">Check out what our customers have to say about our products!</p>

            {/* Reviews List */}
            <div className="space-y-4 mb-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex mb-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-400"}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-700">{review.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
                )}
            </div>

            {/* Add a Review */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Your Review"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={3}
                        required
                    />
                    <div>
                        <label className="block font-medium mb-2">Rating:</label>
                        <div className="flex gap-2">
                            {Array.from({ length: 5 }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`text-2xl ${i < rating ? "text-yellow-500" : "text-gray-400"}`}
                                    onClick={() => setRating(i + 1)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
}
