// File: apps/storefront/app/my-orders/page.js
// This page displays a list of the logged-in user's past orders.
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Helper to determine badge color based on order status
const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'ACCEPTED': return 'bg-blue-500 hover:bg-blue-500';
      case 'PREPARING': return 'bg-indigo-500 hover:bg-indigo-500';
      case 'COMPLETED': return 'bg-green-600 hover:bg-green-600';
      case 'CANCELLED': return 'bg-red-600 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
};

export default function MyOrdersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch orders if the user is authenticated.
    if (sessionStatus === 'authenticated') {
      const fetchOrders = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/my-orders');
          if (response.status === 401) {
            setError("You must be logged in to view your orders.");
            return;
          }
          if (!response.ok) {
            throw new Error('Failed to fetch your orders.');
          }
          const data = await response.json();
          setOrders(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    } else if (sessionStatus === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [sessionStatus]);

  if (isLoading || sessionStatus === 'loading') {
    return <p className="text-center mt-12">Loading your order history...</p>;
  }
  
  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="text-center mt-12 container mx-auto">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600 mt-2">Please sign in to view your order history.</p>
        <Link href="/login">
            <Button className="mt-4">Sign In</Button>
        </Link>
      </div>
    )
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Order History</h1>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)} mt-2 sm:mt-0`}>{order.status}</Badge>
              </div>
              <div className="space-y-2 my-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <p>{item.quantity} x {item.name}</p>
                    <p>GH₵{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-end font-bold pt-2">
                <p>Total: GH₵{order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold">No Orders Yet</h2>
          <p className="text-gray-600 mt-2">You havent placed any orders with us. Lets change that!</p>
          <Link href="/menu">
            <Button className="mt-4">Browse the Menu</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
