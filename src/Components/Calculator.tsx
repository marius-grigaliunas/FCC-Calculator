import React from "react";


export const Calculator : React.FC = () => {

    return (
        <div id="calculator" className="border h-100 w-66 flex flex-col p-1">
            <div id="display" className="border h-20 border-red-500 mb-2">

            </div>
            <div id="buttonContainer" className="border h-80 border-green-400 grid grid-cols-4 w-64">

                <div className="bg-red-700 text-white p-4 col-span-2 flex justify-center items-center">AC</div>
                <div className="bg-gray-500 text-white p-4 flex justify-center items-center">/</div>
                <div className="bg-gray-500 text-white p-4 flex justify-center items-center">x</div>

                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">7</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">8</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">9</div>
                <div className="bg-gray-500 text-white p-4 flex justify-center items-center">-</div>
            
            
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">4</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">5</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">6</div>
                <div className="bg-gray-500 text-white p-4 flex justify-center items-center">+</div>

                
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">1</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">2</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">3</div>
                <div className="bg-blue-800 text-white row-span-2 p-4 flex justify-center items-center">=</div>

                <div className="bg-gray-600 text-white col-span-2 p-4 flex justify-center items-center">0</div>
                <div className="bg-gray-600 text-white p-4 flex justify-center items-center">.</div>
                
            </div>
        </div>
    )
}