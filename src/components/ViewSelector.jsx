'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setViewType, selectViewType } from '@/redux/slices/uiSlice';
import { FaTh, FaThLarge, FaList } from 'react-icons/fa';

const ViewSelector = () => {
  const dispatch = useDispatch();
  const currentViewType = useSelector(selectViewType);

  const handleViewChange = (viewType) => {
    dispatch(setViewType(viewType));
  };

  return (
      <div className="flex justify-end">
        <button
            onClick={() => handleViewChange("card")}
            className={`p-2 ${currentViewType === "card" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            title="Картки"
        >
          <FaTh className="h-5 w-5" />
        </button>

        <button
            onClick={() => handleViewChange("large")}
            className={`p-2 ${currentViewType === "large" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            title="Великі картки"
        >
          <FaThLarge className="h-5 w-5" />
        </button>

        <button
            onClick={() => handleViewChange("list")}
            className={`p-2 ${currentViewType === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            title="Список"
        >
          <FaList className="h-5 w-5" />
        </button>
      </div>
  );
}

export default ViewSelector
