'use client';

const CartSummary = ({ totalAmount, itemCount, onCheckout }) => {

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Підсумок замовлення</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Кількість товарів</span>
                    <span>{itemCount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Вартість товарів</span>
                    <span>{totalAmount.toLocaleString()} грн</span>
                </div>
            </div>

            <button
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
                Оформити замовлення
            </button>
        </div>
    );
}

export default CartSummary
