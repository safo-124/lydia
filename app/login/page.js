// File: apps/storefront/app/login/page.js
// This component provides the UI for users to sign in.
'use client';

import { signIn } from 'next-auth/react'; // Use the client-side hook
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc'; // Using react-icons for the Google logo

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to enjoy a faster checkout experience.</p>
        </div>
        {/*
          The `signIn` function from `next-auth/react` handles the redirection
          to the provider's login page and the callback.
          We specify the provider ('google') and can define a callbackUrl
          to redirect the user back to a specific page after a successful login.
        */}
        <Button
          onClick={() => signIn('google', { callbackUrl: '/menu' })}
          className="w-full"
          variant="outline"
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
