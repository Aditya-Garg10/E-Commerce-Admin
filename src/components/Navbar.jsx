import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-[10vh] justify-between px-10 flex items-center w-full bg-white'>
            <h1 className='text-3xl font-bold sm:text-lg text-black'>Capie.</h1>
            <div className="flex justify-center sm:gap-2 items-center font-semibold gap-8">

               <Link to="/admin/addProduct"><button className='px-8 sm:px-4  sm:py-2 sm:text-xs text-nowrap sm:rounded-none border-2 py-2 rounded-full text-black'>Upload Product</button></Link>
                <Link to="/admin"><button className='px-8 py-2 sm:px-4 sm:rounded-none sm:text-xs rounded-full bg-primary text-white'>Home</button></Link>
            </div>
        </div>
    )
}

export default Navbar
