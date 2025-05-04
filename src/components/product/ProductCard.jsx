"use client"

import Image from "next/image"
import Link from "next/link"
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addToCart} from "@/redux/slices/cartSlice";
import {FaShoppingCart} from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { id, name, price, image} = product;
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
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="relative h-48 bg-gray-100">
          <Image src={product.image} alt={product.title} fill className="object-contain p-4" />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>

          <div className="mt-auto">
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-blue-600">{product.price} грн</p>
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
  )
}
 export default ProductCard
