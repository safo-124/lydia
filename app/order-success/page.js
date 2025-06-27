// File: apps/storefront/app/order-success/page.js
// This page is displayed to the user after they successfully place an order.

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center min-h-[80vh] p-4">
      <div className="bg-white p-8 sm:p-12 rounded-lg shadow-xl max-w-lg w-full border">
        <CheckCircle2 className="text-green-500 h-16 w-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
        <p className="text-lg text-gray-600 mt-2">Your order has been placed successfully.</p>
        <p className="text-gray-500 mt-4">
          Weve received your order and are getting it ready for you. You can track its status
          in your order history.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/my-orders">
            <Button className="w-full sm:w-auto">View My Orders</Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" className="w-full sm:w-auto">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
