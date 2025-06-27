// File: apps/storefront/components/AuthButton.js
// This client component dynamically displays a sign-in link or a sign-out
// dropdown menu based on the user's authentication status.
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AuthButton() {
  // The useSession hook provides session data and status.
  const { data: session, status } = useSession();

  // While the session is being fetched, display a simple loading skeleton
  // to prevent layout shifts and provide user feedback.
  if (status === 'loading') {
    return <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse" />;
  }

  // If a session exists (user is logged in), display their profile
  // picture inside a dropdown menu.
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image} alt={session.user.name} />
              <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* This is where you could add links to a profile or orders page */}
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If there is no session (user is logged out), display a
  // simple "Sign In" button that links to the login page.
  return (
    <Link href="/login">
      <Button variant="outline">Sign In</Button>
    </Link>
  );
}
