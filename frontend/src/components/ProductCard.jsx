import React, { useState } from 'react'
import { DeleteIcon, Edit, X } from 'lucide-react'
import { useProductStore } from '../store/product'
import { toast } from 'react-toastify'

const ProductCard = ( {product} ) => {

  const { deleteProduct, fetchProducts, updateProductData } = useProductStore();

  const [isOpen, setIsOpen] = useState(false);

  const [updateProduct, setUpdateProduct] = useState({
    name: product?.name,
    price: product?.price,
    image: product?.image,
  })

  // console.log(updateProduct);

  const handleDelete = async (pid) => {

    const { success, message } = await deleteProduct(pid);

    if (success) {
      toast.success(message)
      // console.log("message: " + message);
      fetchProducts();
      // setUpdateProduct()

    }
    else {
      toast.error(message)
    }

  }


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // ToggleModel.toggleModal = toggleModal;


  const handleUpadate = async (pid) => {

    // e.preventDefault;

    const { success, message } = await updateProductData(pid, updateProduct);

    if (success) {
      // console.log(updateProduct);
      toast.success(message);
      fetchProducts();
      setIsOpen(false);
      product.name = updateProduct.name;
    }
    else {
      toast.error(message)
    }
  }


  return (
    <div className='shadow-lg border rounded-lg flex flex-col overflow-hidden w-10/12 transition-all duration-100 hover:shadow-xl h-96 justify-between'>
      <img src={product?.image} alt="" className='w-full h-52 object-cover' />
      <div className='p-4 mb-1'>
        <h3 className='mb-1 font-bold capitalize'>
          {product?.name}
        </h3> 
        <p className=' font-bold text-xl mb-4'>${product?.price}</p>
        <div className='flex space-x-2'>

          {/* <button onClick={toggleModal}> </button> */}
          <button onClick={() => {
            // Assuming ToggleModel has a public method to trigger the modal
            setIsOpen(true);
          }}>
            <Edit className='text-blue-700 hover:cursor-pointer' />
          </button>

          <DeleteIcon className='w-10 hover:cursor-pointer text-red-700' onClick={() => handleDelete(product._id)} />
        </div>



        {isOpen && (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

              <div className="inline-block align-bottom rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ">
                {/* Your modal content here */}
                <div className="bg-gray-950 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 mt-32 h-[450px]">
                  <div className='flex items-center justify-between'>
                    <h1 className={` text-xl text-white`}>Update Product</h1>
                    <X onClick={toggleModal} className=' cursor-pointer text-white' />
                  </div>
                  <div className='flex flex-col my-20 mx-5'>
                    <div className="space-y-4 grid gap-3">
                      <input type="text" placeholder="Name" className="border bg-gray-800 text-white border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} value={updateProduct.name}
                      />
                      <input type="text" placeholder="Price" className="border bg-gray-800 text-white border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} value={updateProduct.price}
                      />
                      <input type="text" placeholder="Image URL or Address" className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })} value={updateProduct.image}
                      />
                      <button className='w-full bg-gray-900 p-3 text-white' onClick={() => handleUpadate(product._id)}>UPDATE</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
export default ProductCard