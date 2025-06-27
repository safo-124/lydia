// File: apps/storefront/app/contact/page.js
// This component displays a contact form, an FAQ section, and a location map.
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // For the FAQ
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, Send, HelpCircle, MapPin, Phone } from 'lucide-react';

const faqItems = [
    {
        question: "What areas do you deliver to?",
        answer: "We currently deliver within Aburi and to surrounding areas including Peduase and Ayi Mensah. We are working on expanding our delivery zone to parts of Accra soon!"
    },
    {
        question: "What are your opening hours?",
        answer: "We are open from Tuesday to Sunday, from 11:00 AM to 9:00 PM. We are closed on Mondays."
    },
    {
        question: "Can I place a large order for an event?",
        answer: "Absolutely! We love catering for events. Please use the contact form to send us details about your event (date, number of people, dishes required), and we will get back to you with a quote."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo) and cash on delivery. We are working on adding card payments online soon."
    }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong.');
      }
      
      toast.success(result.message);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-yellow-500" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or some feedback? Wed love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} /></div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}</Button>
        </form>
      </motion.div>
      
      {/* Location Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 text-center"
      >
        <MapPin className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Our Location</h2>
        <div className="mt-6 text-lg text-gray-600 space-y-2">
          <p>123 Kom-Forster Road, Aburi, Eastern Region, Ghana</p>
          <p className="flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> <span>+233 24 123 4567</span></p>
        </div>
        <div className="mt-6 w-full h-80 rounded-lg overflow-hidden border shadow-sm">
          {/* To get your own map: 1. Go to Google Maps. 2. Find your location. 3. Click Share -> Embed a map. 4. Copy the src="" URL and paste it below. */}
          <iframe
            src="[https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.96783307221!2d-0.1852036128418041!3d5.850785300000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf7e1c1e000001%3A0x6081512b934355de!2sAburi%20Botanic%20Gardens!5e0!3m2!1sen!2sgh!4v1719453000000!5m2!1sen!2sgh](https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.96783307221!2d-0.1852036128418041!3d5.850785300000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf7e1c1e000001%3A0x6081512b934355de!2sAburi%20Botanic%20Gardens!5e0!3m2!1sen!2sgh!4v1719453000000!5m2!1sen!2sgh)"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-20"
      >
        <div className="text-center">
           <HelpCircle className="mx-auto h-12 w-12 text-yellow-500" />
           <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full mt-8 max-w-2xl mx-auto">
            {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
