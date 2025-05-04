import Image from 'next/image';
import ProductActions from "@/components/product/ProductActions";

export default async function ProductPage({ params }) {
    const res = await fetch(`http://localhost:3000/api/products/${params.id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const product = await res.json();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-3/4 h-80 md:h-96 bg-gray-100 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        <div className="flex items-center mr-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}
                            <span className="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <div className="text-2xl font-bold text-blue-600 mb-6">{product.price.toLocaleString()} грн</div>
                    <ProductActions product={product}/>
                </div>
            </div>
        </div>
    );
}
