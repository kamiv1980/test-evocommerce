"use client"

import { useState } from "react"
import {useSearchParams} from "next/navigation"
import { products } from "@/data/products"

// Extract unique categories from products
const getUniqueCategories = () => {
    const categories = products.map((product) => product.category)
    return ["", ...new Set(categories)]
}

function FilterBar() {
    const searchParams = useSearchParams()
    const uniqueCategories = getUniqueCategories()

    const [category, setCategory] = useState(searchParams.get("category") || "")
    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")) : 50000,
)

    // Apply filters
    const applyFilters = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()

        if (category) {
            params.set("category", category)
        }

        if (maxPrice) {
            params.set("maxPrice", maxPrice.toString())
        }

        window.location.href = `/?${params.toString()}`
    }

    // Reset filters
    const resetFilters = () => {
        setCategory("")
        setMaxPrice(50000)
        window.location.href = '/'
    }

    // Get category display name
    const getCategoryDisplayName = (categoryValue) => {
        if (!categoryValue) return "Всі категорії"

        // Convert kebab-case to Title Case and translate
        const categoryMap = {
            smartphones: "Смартфони",
            laptops: "Ноутбуки",
            audio: "Аудіо",
            tablets: "Планшети",
            wearables: "Носимі пристрої",
            gaming: "Ігрові пристрої",
            cameras: "Камери",
            transport: "Транспорт",
            "smart-home": "Розумний дім",
            accessories: "Аксесуари",
        }

        return categoryMap[categoryValue] || "Всі категорії"
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-medium">Фільтри</h2>
            </div>

            <form onSubmit={applyFilters} className="space-y-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Категорія
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {uniqueCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {getCategoryDisplayName(cat)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <label htmlFor="price" className="block text-sm font-medium">
                            Максимальна ціна
                        </label>
                        <span className="text-sm font-medium">{maxPrice} грн</span>
                    </div>
                    <input
                        type="range"
                        id="price"
                        min="0"
                        max="50000"
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number.parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0 грн</span>
                        <span>50000 грн</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                        Застосувати
                    </button>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="flex-1 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-300 rounded-md"
                    >
                        Скинути
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FilterBar
