import React, { useState, useEffect } from 'react';

interface Food {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
}

const FetchDataComponent: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/foods');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: Food[] = await response.json();
        setFoods(result); // Set the fetched data to the state
        setLoading(false); // Data loaded, set loading to false
      } catch (err: any) {
        setError(err.message); // If error occurs, set the error message
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Fetched Data:</h2>
      <ul>
        {foods.map((item) => (
          <li key={item.id}>
            {item.id}: {item.name}
            {item.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataComponent;
