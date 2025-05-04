'use client';

import { useRouter } from 'next/navigation';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import {useDispatch, useSelector} from "react-redux";
import {clearCart, removeFromCart, selectCartItems, updateQuantity} from "@/redux/slices/cartSlice";

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const router = useRouter();

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(updateQuantity({id:productId, quantity:newQuantity}));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        alert('Замовлення в розробці');
    };

    const handleContinueShopping = () => {
        router.push('/');
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Кошик покупок</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-6">Ваш кошик порожній</p>
                    <button
                        onClick={handleContinueShopping}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
                    >
                        Продовжити покупки
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Товари в кошику</h2>
                                    <button
                                        onClick={handleClearCart}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Очистити кошик
                                    </button>
                                </div>

                                <div className="border-t border-gray-200">
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemoveItem}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleContinueShopping}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Продовжити покупки
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <CartSummary
                            totalAmount={totalAmount}
                            itemCount={cartItems.length}
                            onCheckout={handleCheckout}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
