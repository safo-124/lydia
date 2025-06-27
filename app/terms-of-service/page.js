// File: apps/storefront/app/terms-of-service/page.js
// This component displays the Terms of Service for the application.
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

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
                <p className="text-sm text-gray-500 mb-8">Last updated: June 27, 2025</p>

                <LegalSection title="1. Introduction">
                    <p>Welcome to Ghana Jollof Hub. These Terms of Service govern your use of our website and services. By placing an order or making a reservation, you agree to these terms.</p>
                </LegalSection>

                <LegalSection title="2. User Accounts">
                    <p>When you create an account with us, you must provide information that is accurate and complete. You are responsible for safeguarding your account and for any activities or actions under your account.</p>
                </LegalSection>

                <LegalSection title="3. Orders, Payments, and Cancellations">
                    <p>All orders are subject to availability. We reserve the right to refuse or cancel an order at any time for reasons including but not limited to product availability, errors in the description or price of the product, or error in your order. Payments must be completed upon checkout as per the available payment methods.</p>
                </LegalSection>

                <LegalSection title="4. Reservations">
                    <p>Table reservations are requests and are not confirmed until you receive a confirmation from us via email or phone. We will do our best to accommodate your requested time.</p>
                </LegalSection>

                <p className="mt-12 text-sm text-gray-500 border-t pt-4">
                    <strong>Disclaimer:</strong> This is a template. It is not legal advice. Please consult with a legal professional to create terms of service that are appropriate for your jurisdiction and business.
                </p>
            </motion.div>
        </div>
    </div>
  );
}
