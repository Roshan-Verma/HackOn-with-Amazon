import React from 'react'

const Budget = () => {
  return (
    <div>

        <div className='w-[70%] m-10 h-50 '>
            <div className="black flex  items-center justify-between bg-black rounded-md text-white p-4">
                <h2>Enter your budget amount : </h2>

                <input type="text" className="w-[70%] p-4 text-red-500 rounded-sm h-10 outline-none" />

                <button className='bg-[#ff9900] p-2 rounded-md'>
                    Submit
                </button>

            </div>
        </div>
    </div>
  )
}

export default Budget
