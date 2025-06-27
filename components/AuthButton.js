// File: apps/storefront/components/AuthButton.js
// This client component dynamically displays a sign-in button or a user profile
// dropdown menu with links to their orders and reservations.
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
import { BookMarked, CalendarCheck, LogOut } from 'lucide-react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  // Display a loading skeleton while the session state is being determined
  if (status === 'loading') {
    return <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse" />;
  }

  // If the user is logged in, display their avatar and a dropdown menu
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border">
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
          {/* Link to the user's order history */}
          <DropdownMenuItem asChild>
            <Link href="/my-orders" className="flex items-center">
              <BookMarked className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          {/* Link to the user's reservation history */}
          <DropdownMenuItem asChild>
            <Link href="/my-reservations" className="flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4" />
              <span>My Reservations</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If the user is not logged in, display a sign-in button
  return (
    <Link href="/login">
      <Button variant="outline">Sign In</Button>
    </Link>
  );
}
