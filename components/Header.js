// File: apps/storefront/components/Header.js
// This component serves as the main navigation header for the storefront.
// It includes the site branding, the cart, and authentication status.
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import AuthButton from './AuthButton'; // The component that handles sign-in/out logic

// Import required shadcn/ui and icon components
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';


export default function Header() {
    // Destructure all necessary values and functions from our CartContext
    const { cartItems, itemCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                
                {/* Brand Logo/Name linking to the homepage */}
                <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors">
                    Ghana Jollof Hub
                </Link>
                
                <div className="flex items-center gap-4">
                    {/* Cart Trigger and Slide-out Panel (Sheet) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="relative">
                                <ShoppingCart className="h-5 w-5 sm:mr-2" />
                                <span className="hidden sm:inline">My Cart</span>
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        
                        <SheetContent className="flex flex-col">
                            <SheetHeader>
                                <SheetTitle>Your Shopping Cart</SheetTitle>
                            </SheetHeader>
                            
                            {cartItems.length > 0 ? (
                                <>
                                    {/* List of items in cart */}
                                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                                        <div className="divide-y divide-gray-200">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="py-4 flex items-center space-x-4">
                                                    <img 
                                                        src={item.imageUrl || `https://placehold.co/100x100/FFF/333?text=${item.name.charAt(0)}`} 
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded-md object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p className="text-sm text-gray-500">GH₵{item.price.toFixed(2)}</p>
                                                        {/* Quantity controls */}
                                                        <div className="flex items-center mt-2">
                                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {/* Remove item button */}
                                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-500"/>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Cart summary and action buttons */}
                                    <SheetFooter className="mt-auto border-t pt-4">
                                        <div className="w-full space-y-4">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span>GH₵{totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Button variant="outline" onClick={clearCart} className="w-full">Clear Cart</Button>
                                                <SheetClose asChild>
                                                    <Link href="/checkout" className="w-full">
                                                        <Button className="w-full">Proceed to Checkout</Button>
                                                    </Link>
                                                </SheetClose>
                                            </div>
                                        </div>
                                    </SheetFooter>
                                </>
                            ) : (
                                // View for when the cart is empty
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                                    <h3 className="font-semibold text-lg">Your cart is empty</h3>
                                    <p className="text-sm text-gray-500">Add items from the menu to get started.</p>
                                    <SheetClose asChild>
                                        <Link href="/menu">
                                            <Button className="mt-4">Continue Shopping</Button>
                                        </Link>
                                    </SheetClose>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>

                    {/* Authentication Button (Sign In / User Profile Dropdown) */}
                    <AuthButton />
                </div>
            </nav>
        </header>
    )
}
