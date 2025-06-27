// File: apps/storefront/app/menu/page.js
// An enhanced menu page with search and category filtering for better user experience.
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // State for filtering and searching
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Something went wrong and we couldn\'t load the menu.');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Get all unique categories from the menu items
  const categories = useMemo(() => {
    if (menuItems.length === 0) return [];
    const allCategories = new Set(menuItems.map(item => item.category));
    return ['All', ...Array.from(allCategories)];
  }, [menuItems]);

  // Filter menu items based on active category and search query
  const filteredMenuItems = useMemo(() => {
    return menuItems
      .filter(item => activeCategory === 'All' || item.category === activeCategory)
      .filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [menuItems, activeCategory, searchQuery]);

  if (isLoading) return <div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-700">Loading our delicious menu...</h2></div>;
  if (error) return <div className="text-center py-20 bg-red-50 rounded-lg max-w-2xl mx-auto"><h2 className="text-2xl font-semibold text-red-700">Oops!</h2><p className="text-red-600 mt-2">{error}</p></div>;

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">Discover Our Menu</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-[70px] bg-gray-50/80 backdrop-blur-sm py-4 z-10">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    placeholder="Search for a dish..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
                {categories.map(category => (
                    <Button 
                        key={category}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>

        {/* Menu Grid */}
        {filteredMenuItems.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredMenuItems.map(item => (
              <motion.div layout key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                <img
                  src={item.imageUrl || `https://placehold.co/600x400/FFF/333?text=${item.name.replace(' ', '+')}`}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/EEE/777?text=Image+Not+Found`; }}
                />
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mt-2 flex-grow">{item.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-2xl font-bold text-green-600">GH₵{parseFloat(item.price).toFixed(2)}</p>
                    <Button onClick={() => addToCart(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full">
                      <CartIcon /><span>Add</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">No dishes found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
