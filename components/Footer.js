// File: apps/storefront/components/Footer.js
// A responsive footer component for the storefront.
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="initial"
          whileInView="whileInView"
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* About Section */}
          <motion.div variants={fadeIn} className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Ghana Jollof Hub</h3>
            <p className="text-gray-400">
              Bringing the authentic taste of Ghanaian cuisine to your table. Made with love and the freshest local ingredients from Aburi, Eastern Region.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="hover:text-yellow-400 transition-colors">Menu</Link></li>
              <li><Link href="/my-orders" className="hover:text-yellow-400 transition-colors">My Orders</Link></li>
              <li><Link href="/checkout" className="hover:text-yellow-400 transition-colors">Checkout</Link></li>
            </ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={fadeIn}>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <p className="text-gray-400 mb-4">Stay updated on our latest dishes and offers!</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-yellow-400 transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-yellow-400 transition-colors"><Facebook /></a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
            className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3}}
            viewport={{ once: true }}
        >
          <p>&copy; {currentYear} Ghana Jollof Hub. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
