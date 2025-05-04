'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const ProductLarge = ({ product }) => {
  const { id, name, price, description, image, category } = product;
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true);
    dispatch(addToCart({
      id,
      name,
      price,
      image,
    }));

    // Showing animation of successful addition
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-full flex flex-col">
        <Link href={`/product/${id}`} className="block h-full">
          <div className="relative h-72 bg-gray-100">
            <Image src={image} alt={name} fill className="object-contain p-6" />
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold mb-3">{name}</h3>

            <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>

            <div className="mt-auto">
              <p className="text-gray-600 mb-3">{category}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-blue-600">{price} грн</p>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex items-center justify-center px-3 py-1 rounded-md text-xs sm:text-sm font-medium text-white transition-colors ${
                        isAdding
                            ? 'bg-green-500'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isAdding ? 'Додано' : (
                      <>
                        <FaShoppingCart className="mr-1" />
                        <span>До кошика</span>
                      </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
}

export default ProductLarge
