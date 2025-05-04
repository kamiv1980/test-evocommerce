'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const ProductList = ({ product }) => {
  const { id, name, price, image, category, description } = product;
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01] w-full">
        <Link href={`/product/${id}`} className="block">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-40 sm:h-32 sm:w-32 bg-gray-100">
              <Image src={image} alt={name} fill className="object-contain p-2" />
            </div>

            <div className="p-4 flex-1 flex flex-col sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <p className="text-gray-600 text-sm mb-2">{category}</p>
                <p className="text-gray-700 text-sm line-clamp-2 mb-2 sm:mb-0">{description}</p>
              </div>

              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:ml-4">
                <p className="text-xl font-bold text-blue-600">{price} грн</p>
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

export default ProductList
