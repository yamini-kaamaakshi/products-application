"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import router
import { useCartStore } from "@/store/cartStore";

const CartPage = () => {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity } = useCartStore();
    const hydrateStore = useCartStore((state) => state.hydrateStore);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof hydrateStore === "function") {
            hydrateStore(); // Load persisted cart data from localStorage
        }
        setMounted(true);
    }, [hydrateStore]);

    if (!mounted) return <p className="text-center text-lg py-10">Loading cart...</p>;

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
                Shopping Cart ({cart.length})
            </h1>

            {cart.length > 0 ? (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">₹{item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="text-red-500"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => router.push("/payment")} // Redirect to payment page
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Place Order
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
