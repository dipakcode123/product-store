import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  // const product = new Array(products);
  
  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts])

  // console.log("products", products );


  return (
    <div className=' xl:container p-12'>
      <div className=' space-y-5'>
        <h2 className=' text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-center mb-16'>Current Products 🚀</h2>


      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-10">
        {
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>


       {
        products.length === 0 && (
          <p className='  text-xl text-center font-bold text-gray-500 flex justify-center'>
          No products found! { "" }
        <Link to={'/create'} >
          <span className=' text-blue-500 hover:underline pl-2'>Create Product</span>
        </Link>
        </p>
        )
       }
      </div>
    </div>
  )
}

export default HomePage
