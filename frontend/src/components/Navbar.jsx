import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import add_icon from '../assets/add.png'
import {  Moon,  PlusSquare, Sun } from 'lucide-react'
import { useProductStore } from '../store/product'

const Navbar = ({ color, setBgColor }) => {

    const { products } = useProductStore();

    return (
        <div className={`container px-2 max-w-6xl mx-auto`}>
            <div className="flex  h-16 items-center justify-between sm:flex-row ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 uppercase font-bold text-center text-[22px] sm:text-3xl">
                    <Link to={'/'}>Product Store 🛒</Link>
                </span>
                <div className="flex">
                    <Link to={'/create'}>
                        <button className='  px-2 py-1.5 border border-gray-500 rounded mx-1'>
                            <PlusSquare size={18} />
                        </button>
                    </Link>
                    <button onClick={()=> { color === "bg-gray-900" ? setBgColor("bg-white"): setBgColor("bg-gray-900")}} className=' px-2 py-1.5 border border-gray-500 rounded'>
                        {
                            color === "bg-gray-900" ? <Sun size={18} /> : <Moon size={18} />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
