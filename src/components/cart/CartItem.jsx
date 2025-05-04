'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from "react-icons/md";

const CartItem = ({ item, onQuantityChange, onRemove }) => {

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            onQuantityChange(item.id, newQuantity);
        }
    };

    const handleRemove = () => {
        onRemove(item.id);
    };

    const totalPrice = item.price * item.quantity;

    return (
        <div className="py-6 border-b border-gray-200 last:border-b-0">
            <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div>
                            <Link href={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                                {item.name}
                            </Link>
                            <p className="mt-1 text-sm text-gray-500">
                                {item.price.toLocaleString()} грн за одиницю
                            </p>
                        </div>

                        <div className="flex flex-row items-start sm:items-center mt-4 space-y-3 sm:space-y-0 space-x-6">
                            <div className="flex items-center">
                                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                    Кількість
                                </label>
                                <input
                                    id={`quantity-${item.id}`}
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 border border-gray-300 rounded-md px-3 py-2 text-center"
                                />
                            </div>

                            <div className="font-medium text-gray-900 whitespace-nowrap">
                                {totalPrice.toLocaleString()} грн
                            </div>

                            <button
                                type="button"
                                onClick={handleRemove}
                                className="text-red-500 hover:text-red-700"
                            >
                                <MdDelete className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem
