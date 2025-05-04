import { products } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET(request) {
    // Get query-params
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');

    let filteredProducts = [...products];

    // Filtering by category
    if (category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === category
        );
    }

    // Filtering by price
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseInt(maxPrice)
        );
    }

    return NextResponse.json(filteredProducts);
}
