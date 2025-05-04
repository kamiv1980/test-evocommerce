import ViewSelector from '@/components/ViewSelector';
import DraggableProducts from '@/components/DraggableProducts';
import FilterBar from "@/components/FilterBar";

export default async function Home({searchParams}) {
    const { category, maxPrice } = searchParams

    const url = new URL("http://localhost:3000/api/products")
    if (category) url.searchParams.set("category", category)
    if (maxPrice) url.searchParams.set("maxPrice", maxPrice)

    const res = await fetch(url.toString(), { cache: "no-store" })

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const products = await res.json();

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <FilterBar/>
          <ViewSelector/>
        </div>
          <DraggableProducts products={products} />
      </div>
  );
}
