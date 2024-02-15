import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';

const ClientPage = () => {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
  
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

    function handleHome() {
        window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL+'/';
    }

    const handleCreate = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/client`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: newName,
              description: newDescription,
            }),
          });
          if (response.ok) {
            fetchCategories(); // Refresh the categories after creation
            setNewName(''); // Clear the create form
            setNewDescription('');
          } else {
            console.error('Failed to create category:', response.statusText);
          }
        } catch (error) {
          console.error('Failed to create category:', error.message);
        }
      };
  
    return (
      <ProtectedRoute roles={['client']}>
        <div className="max-w-md mx-auto p-4">
  <div className="mb-4">
  <div className='ml-[80%] w-14 text-center cursor-pointer rounded font-semibold border-2 border-black w'
    onClick={handleHome}>home</div>
  <h1 className="text-4xl text-center mt-11 font-bold mb-4">Client page</h1>
    <h2 className="text-lg font-bold mb-2">Create New Category</h2>
    <input
      type="text"
      placeholder="Name"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
    />
    <input
      type="text"
      placeholder="Description"
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
    />
    <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Create Category
    </button>
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
  
  export default ClientPage;
  