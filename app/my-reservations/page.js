// File: apps/storefront/app/my-reservations/page.js
// This page displays a list of the logged-in user's table reservations.
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Helper for status badge colors
const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'CONFIRMED': return 'bg-green-600 hover:bg-green-600';
      case 'CANCELLED': return 'bg-red-600 hover:bg-red-600';
      case 'COMPLETED': return 'bg-blue-500 hover:bg-blue-500';
      default: return 'bg-gray-500 hover:bg-gray-500';
    }
};

export default function MyReservationsPage() {
  const { status: sessionStatus } = useSession();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      const fetchReservations = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/my-reservations');
          if (!response.ok) throw new Error('Failed to fetch your reservations.');
          const data = await response.json();
          setReservations(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReservations();
    } else if (sessionStatus === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [sessionStatus]);

  if (isLoading || sessionStatus === 'loading') {
    return <p className="p-8 text-center">Loading your reservations...</p>;
  }
  
  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-gray-600 mt-2">Please sign in to view your reservations.</p>
        <Link href="/login"><Button className="mt-4">Sign In</Button></Link>
      </div>
    )
  }

  if (error) return <p className="p-8 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Reservations</h1>
      {reservations.length > 0 ? (
        <div className="space-y-6">
          {reservations.map((res) => (
            <Card key={res.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <CardTitle>Reservation for {res.partySize} guests</CardTitle>
                    <CardDescription>{new Date(res.reservationDate).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</CardDescription>
                  </div>
                  <Badge className={`w-fit ${getStatusColor(res.status)}`}>{res.status}</Badge>
                </div>
              </CardHeader>
              {res.notes && (
                <CardContent>
                  <p className="text-sm text-gray-600"><strong>Your notes:</strong> {res.notes}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold">No Reservations Found</h2>
          <p className="text-gray-600 mt-2">You havent made any table reservations yet.</p>
          <Link href="/reserve"><Button className="mt-4">Make a Reservation</Button></Link>
        </div>
      )}
    </div>
  );
}