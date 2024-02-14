import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';

const UserPage = () => {
    function handleHome() {
        window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL + '/';
      }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("response", data);
        if (data.success) {
          setCategories(data.data); // Assuming the API response contains an array of categories
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    };
  
    return (
      <ProtectedRoute roles={['user']}>
        <div className="max-w-md mx-auto p-4">
  <div className="mb-4">
    <div className='ml-[80%] w-14 text-center cursor-pointer rounded font-semibold border-2 border-black w'
    onClick={handleHome}>home</div>
  <h1 className="text-4xl text-center mt-7 font-bold mb-4">User page</h1>
    <h1 className="text-2xl text-center mt-11 font-bold mb-4">Categories</h1>
  </div>
  {categories.map((category) => (
    <div key={category.id} className="border border-gray-300 rounded p-4 mb-4">
          <p className="font-bold">{category.name}</p>
          <p>{category.description}</p>
    </div>
  ))}
</div>

      </ProtectedRoute>
    );
  };
  
  export default UserPage;
  