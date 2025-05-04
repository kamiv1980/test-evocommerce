import { products } from '@/data/products';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    const productId = parseInt(id);

    const product = products.find(p => p.id === productId);

    if (!product) {
        return NextResponse.json(
            { message: 'Продукт не знайдено' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
