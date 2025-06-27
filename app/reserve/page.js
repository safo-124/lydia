// File: apps/storefront/app/reserve/page.js
// This component displays a form for customers to reserve a table.
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReservationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '18:00', // Default time
    partySize: 2,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (status === 'authenticated') {
      setFormData(prev => ({
        ...prev,
        customerName: session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [status, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Combine date and time for the reservationDate
    const reservationDate = new Date(`${formData.date}T${formData.time}`);
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, reservationDate: reservationDate.toISOString() }),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong.');
      
      toast.success('Your reservation request has been sent! We will contact you shortly to confirm.');
      router.push('/'); // Redirect to home page after success
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-2xl px-4 py-12 md:py-20"
    >
      <div className="text-center">
        <Calendar className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Reserve a Table</h1>
        <p className="mt-4 text-lg text-gray-600">
          Book your spot and enjoy an unforgettable dining experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name</Label>
            <Input id="customerName" name="customerName" required value={formData.customerName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required value={formData.date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required value={formData.time} onChange={handleChange} />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="partySize">Number of Guests</Label>
            <Input id="partySize" name="partySize" type="number" min="1" max="12" required value={formData.partySize} onChange={handleChange} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Special Requests (optional)</Label>
          <Textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="e.g., anniversary, specific table" />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting Request...' : <>Request Reservation <Send className="ml-2 h-4 w-4" /></>}
        </Button>
      </form>
    </motion.div>
  );
}