// File: apps/storefront/app/checkout/page.js
// Updated to pre-fill user data from the session.
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster, toast } from 'sonner';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { data: session, status } = useSession(); // Get user session
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // When the session is loaded, pre-fill the name field
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.name) {
      setCustomerName(session.user.name);
    }
  }, [status, session]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          totalPrice,
          items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place the order.');
      }

      toast.success("Thank you for your order! It is now being processed.");
      
      clearCart();
      // We will create this success page next
      router.push('/order-success');

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  // Disable the form field if the user is logged in
  const isNameDisabled = status === 'authenticated';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Toaster richColors position="top-center" />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-4">
            {cartItems.length > 0 ? cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x GH₵{item.price.toFixed(2)}
                  </p>
                </div>
                <p>GH₵{(item.quantity * item.price).toFixed(2)}</p>
              </div>
            )) : <p className="text-gray-500">Your cart is empty.</p>}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>GH₵{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Ama Serwaa"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                disabled={isNameDisabled}
                className={isNameDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPlacingOrder || cartItems.length === 0 || status === 'loading'}
            >
              {isPlacingOrder ? 'Placing Order...' : `Place Order (GH₵${totalPrice.toFixed(2)})`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
