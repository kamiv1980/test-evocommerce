'use client'

import {useSelector} from "react-redux";
import {selectCartItemsCount} from "@/redux/slices/cartSlice";

function CartBadge() {
    const itemCount = useSelector(selectCartItemsCount)

    if (itemCount === 0) return null

    return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </span>
    )
}

export default CartBadge
