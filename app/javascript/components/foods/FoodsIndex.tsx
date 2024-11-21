import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchFoods } from '../../store/foodsSlice'

const FetchDataComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: foods, status, error } = useAppSelector((state) => state.foods)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFoods())
    }
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {foods.map((item) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataComponent;
