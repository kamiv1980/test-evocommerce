'use client';

import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { selectViewType } from '@/redux/slices/uiSlice';
import ProductCard from './product/ProductCard';
import ProductLarge from './product/ProductLarge';
import ProductList from './product/ProductList';

const DraggableProducts = ({ products }) => {
  const viewType = useSelector(selectViewType);
  const [orderedProducts, setOrderedProducts] = useState([])

  useEffect(() => {
    products.length && setOrderedProducts(products)
  }, [])

  // Render product based on view type
  const renderProductComponent = (product) => {
    switch (viewType) {
      case 'large':
        return <ProductLarge product={product} />;
      case 'list':
        return <ProductList product={product} />;
      case 'card':
      default:
        return <ProductCard product={product} />;
    }
  };

  // Handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(orderedProducts)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setOrderedProducts(items)
  }

  const getGridClass = () => {
    switch (viewType) {
      case "card":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      case "large":
        return "grid grid-cols-1 md:grid-cols-2 gap-6"
      case "list":
        return "flex flex-col gap-4"
      default:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    }
  }

  return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products" direction={viewType === "list" ? "vertical" : "horizontal"} isDropDisabled>
          {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={getGridClass()}>
                {orderedProducts.map((product, index) => (
                    <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                      {(provided) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="group relative"
                          >
                            {renderProductComponent(product)}
                            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              Перетягніть для зміни порядку
                            </div>
                          </div>
                      )}
                    </Draggable>
                ))}
                {provided.placeholder}
              </div>
          )}
        </Droppable>
      </DragDropContext>
  )
}

export default DraggableProducts
