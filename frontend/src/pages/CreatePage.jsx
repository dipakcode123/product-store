import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CreatePage = ({ color }) => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  const { createProduct } = useProductStore();
  
  

  const handleAddProduct = async (e) => {
    e.preventDefault();

   const { success, message } = await createProduct(newProduct);

   if (success) {
    toast.success(message);
    setNewProduct({
      name: "",
      price: "",
      image: ""
    });
    navigate('/');
   } else {
    toast.error(message)
   }

  }


  return (
    <div className='text-center w-[600px] mx-auto mt-12'>
      <h1 className=' text-4xl my-12'>Create New Product</h1>
      <form className='border p-5 rounded text-left'>
        <p className='text-xl py-2'>Product Name</p>
        <input type="text" className={`border ${color === "bg-gray-900" ? "border-white" : "border-black"} bg-transparent rounded px-2 py-1 w-full mb-2`} placeholder='Enter product name' onChange={(e)=> setNewProduct({ ...newProduct, name: e.target.value})}  value={newProduct.name}/>
        <p className='text-xl py-2'>Product Price</p>
        <input type="number" className={`border ${color === "bg-gray-900" ? "border-white" : "border-black"} bg-transparent rounded px-2 py-1 w-full `} placeholder='Enter product price' onChange={(e)=> setNewProduct({ ...newProduct, price: e.target.value})}  value={newProduct.price}/>
        <p className='text-xl py-3'>Product Image</p>
        <label htmlFor="image">
          <input type="text"  className={`border ${color === "bg-gray-900" ? "border-white" : "border-black"} bg-transparent rounded px-2 py-1 w-full `} placeholder='image address'onChange={(e)=> setNewProduct({ ...newProduct, image: e.target.value})}  value={newProduct.image} />
        </label>
        <input type="file" hidden id='image' />
        <div className='text-center'>
          <button className='py-2 text-white uppercase font-bold shadow-lime-600 px-6 mt-5 w-full bg-green-800 text-lg rounded border' onClick={handleAddProduct}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePage
