import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import CartBadge from "@/components/cart/CartBadge";

const Header = () => {

  return (
      <header className="bg-gray-300 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Ecommerce store
            </Link>

            <Link href="/cart" className="p-2 relative">
              <FaShoppingCart className="h-6 w-6" />
              <CartBadge />
            </Link>
          </div>
        </div>
      </header>
  );
}

export default Header
