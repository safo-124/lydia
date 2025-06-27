// File: apps/storefront/app/privacy-policy/page.js
// This component displays the Privacy Policy for the application.
'use client';

import { motion } from 'framer-motion';

const LegalSection = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
            {children}
        </div>
    </div>
);

export default function PrivacyPolicyPage() {
    return (
    <div className="bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
                <p className="text-sm text-gray-500 mb-8">Last updated: June 27, 2025</p>

                <LegalSection title="1. Information We Collect">
                    <p>We collect information you provide directly to us, such as when you create an account, place an order, or make a reservation. This may include your name, email address, phone number, and order details.</p>
                </LegalSection>

                <LegalSection title="2. How We Use Your Information">
                    <p>We use the information we collect to process your orders and reservations, communicate with you about your requests, and improve our services. We do not sell your personal information to third parties.</p>
                </LegalSection>

                <LegalSection title="3. Data Security">
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
                </LegalSection>
                
                <p className="mt-12 text-sm text-gray-500 border-t pt-4">
                    <strong>Disclaimer:</strong> This is a template. It is not legal advice. Please consult with a legal professional to create a privacy policy that is appropriate for your jurisdiction and business.
                </p>
            </motion.div>
        </div>
    </div>
    );
}
