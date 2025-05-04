'use client'

import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addToCart} from "@/redux/slices/cartSlice";

const ProductActions = ({product}) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);


    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
            setIsAdding(true);
            setTimeout(() => setIsAdding(false), 500);
        }
    };

    const navigateToCart = () => {
        router.push('/cart');
    };

    return (
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors ${
                    isAdding
                        ? 'bg-green-500'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isAdding ? 'Додано' : 'Додати до кошика'}
            </button>
            <button
                onClick={navigateToCart}
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
                Перейти до кошика
            </button>
        </div>
    )
}

export default ProductActions
