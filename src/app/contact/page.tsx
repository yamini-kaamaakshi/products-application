export default function ContactPage() {
    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-4">If you have any questions, feel free to reach out to us!</p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Our Contact Details</h3>

                <p className="mb-2">
                    📍 <strong>Address:</strong> 123 eCommerce St, Business City, NY 10001
                </p>
                <p className="mb-2">
                    📞 <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="mb-2">
                    ✉️ <strong>Email:</strong> <a href="mailto:support@ecommerce.com" className="text-blue-600 hover:underline">support@ecommerce.com</a>
                </p>
            </div>
        </div>
    );
}
