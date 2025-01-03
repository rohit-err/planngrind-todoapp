import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-indigo-900 text-white py-3 px-5 shadow-md'>
        <div className="logo">
            <span className='font-bold text-xl text-violet-300'>iTask</span>
        </div>
        <ul className="flex gap-8">
          <li className='cursor-pointer hover:text-violet-300 hover:font-bold transition-all'>
            Home
          </li>
          <li className='cursor-pointer hover:text-violet-300 hover:font-bold transition-all'>
            Your Tasks
          </li>
        </ul>
    </nav>
  )
}

export default Navbar


