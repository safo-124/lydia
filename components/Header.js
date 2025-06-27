// File: apps/storefront/components/Header.js
// Updated to include a link to the new "Services" page.
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import AuthButton from './AuthButton';

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
import { ShoppingCart, Trash2, Plus, Minus, Menu as MenuIcon, BookOpen, MessageSquare, Calendar, Heart, ConciergeBell } from 'lucide-react';

export default function Header() {
    const { cartItems, itemCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

    return (
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                
                <div className="flex items-center gap-2">
                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon"><MenuIcon className="h-6 w-6" /></Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px]">
                                <SheetHeader><SheetTitle className="text-2xl font-bold">Ghana Jollof Hub</SheetTitle></SheetHeader>
                                <div className="mt-8 flex flex-col space-y-4">
                                    <SheetClose asChild><Link href="/menu" className="text-lg py-2 flex items-center gap-3 rounded-md hover:bg-gray-100 p-2 transition-colors"><BookOpen className="h-5 w-5"/> Menu</Link></SheetClose>
                                    <SheetClose asChild><Link href="/services" className="text-lg py-2 flex items-center gap-3 rounded-md hover:bg-gray-100 p-2 transition-colors"><ConciergeBell className="h-5 w-5"/> Services</Link></SheetClose>
                                    <SheetClose asChild><Link href="/reserve" className="text-lg py-2 flex items-center gap-3 rounded-md hover:bg-gray-100 p-2 transition-colors"><Calendar className="h-5 w-5"/> Reserve a Table</Link></SheetClose>
                                    <SheetClose asChild><Link href="/our-story" className="text-lg py-2 flex items-center gap-3 rounded-md hover:bg-gray-100 p-2 transition-colors"><Heart className="h-5 w-5"/> Our Story</Link></SheetClose>
                                    <SheetClose asChild><Link href="/contact" className="text-lg py-2 flex items-center gap-3 rounded-md hover:bg-gray-100 p-2 transition-colors"><MessageSquare className="h-5 w-5"/> Contact Us</Link></SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors">
                        Ghana Jollof Hub
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 font-medium text-gray-600">
                    <Link href="/menu" className="hover:text-yellow-600 transition-colors">Menu</Link>
                    <Link href="/services" className="hover:text-yellow-600 transition-colors">Services</Link>
                    <Link href="/reserve" className="hover:text-yellow-600 transition-colors">Reserve a Table</Link>
                    <Link href="/our-story" className="hover:text-yellow-600 transition-colors">Our Story</Link>
                    <Link href="/contact" className="hover:text-yellow-600 transition-colors">Contact Us</Link>
                </div>
                
                {/* Right Side: Cart & Auth */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Cart Trigger */}
                    <Sheet>
                        <SheetTrigger asChild><Button variant="outline" className="relative"><ShoppingCart className="h-5 w-5 sm:mr-2" /><span className="hidden sm:inline">My Cart</span>{itemCount > 0 && (<span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>)}</Button></SheetTrigger>
                        <SheetContent className="flex flex-col">
                            <SheetHeader><SheetTitle>Your Shopping Cart</SheetTitle></SheetHeader>
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="flex-1 overflow-y-auto -mx-6 px-6"><div className="divide-y divide-gray-200">{cartItems.map(item => (<div key={item.id} className="py-4 flex items-center space-x-4"><img src={item.imageUrl || `https://placehold.co/100x100/FFF/333?text=${item.name.charAt(0)}`} alt={item.name} className="w-16 h-16 rounded-md object-cover"/><div className="flex-1"><h4 className="font-semibold">{item.name}</h4><p className="text-sm text-gray-500">GH₵{item.price.toFixed(2)}</p><div className="flex items-center mt-2"><Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button><span className="w-8 text-center">{item.quantity}</span><Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button></div></div><Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button></div>))}</div></div>
                                    <SheetFooter className="mt-auto border-t pt-4"><div className="w-full space-y-4"><div className="flex justify-between font-bold text-lg"><span>Total</span><span>GH₵{totalPrice.toFixed(2)}</span></div><div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={clearCart} className="w-full">Clear Cart</Button><SheetClose asChild><Link href="/checkout"><Button className="w-full">Proceed to Checkout</Button></Link></SheetClose></div></div></SheetFooter>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center"><ShoppingCart className="h-16 w-16 text-gray-300 mb-4" /><h3 className="font-semibold text-lg">Your cart is empty</h3><p className="text-sm text-gray-500">Add items from the menu to get started.</p><SheetClose asChild><Link href="/menu"><Button className="mt-4">Continue Shopping</Button></Link></SheetClose></div>
                            )}
                        </SheetContent>
                    </Sheet>
                    <AuthButton />
                </div>
            </nav>
        </header>
    )
}
