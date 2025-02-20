import React from "react";


export const Calculator : React.FC = () => {
    
    const formul

    const clear = () => {

    }

    return (
        <div id="calculator" className="border h-100 w-80 flex flex-col p-1">
            <div id="display-container" className=" bg-black h-20 mb-2">
                <div id="formula-display" className="h-10 flex justify-end p-1 text-white text-2xl">2+2</div>
                <div id="immediate-display" className="h-10 flex justify-end p-1 text-white text-2xl">4</div>
            </div>
            <div id="buttonContainer" className="h-80 grid grid-cols-4">

                <div id="clear" className="bg-red-700 text-white p-4 col-span-2 flex justify-center items-center">AC</div>
                <div id="divide" className="bg-gray-500 text-white p-4 flex justify-center items-center">/</div>
                <div id="multiply" className="bg-gray-500 text-white p-4 flex justify-center items-center">x</div>

                <div id="seven" className="bg-gray-600 text-white p-4 flex justify-center items-center">7</div>
                <div id="eight" className="bg-gray-600 text-white p-4 flex justify-center items-center">8</div>
                <div id="nine" className="bg-gray-600 text-white p-4 flex justify-center items-center">9</div>
                <div id="subtract" className="bg-gray-500 text-white p-4 flex justify-center items-center">-</div>
            
            
                <div id="four" className="bg-gray-600 text-white p-4 flex justify-center items-center">4</div>
                <div id="five" className="bg-gray-600 text-white p-4 flex justify-center items-center">5</div>
                <div id="six" className="bg-gray-600 text-white p-4 flex justify-center items-center">6</div>
                <div id="add" className="bg-gray-500 text-white p-4 flex justify-center items-center">+</div>

                
                <div id="one" className="bg-gray-600 text-white p-4 flex justify-center items-center">1</div>
                <div id="two" className="bg-gray-600 text-white p-4 flex justify-center items-center">2</div>
                <div id="three" className="bg-gray-600 text-white p-4 flex justify-center items-center">3</div>
                <div id="equals" className="bg-blue-800 text-white row-span-2 p-4 flex justify-center items-center">=</div>

                <div id="zero" className="bg-gray-600 text-white col-span-2 p-4 flex justify-center items-center">0</div>
                <div id="decimal" className="bg-gray-600 text-white p-4 flex justify-center items-center">.</div>
                
            </div>
        </div>
    )
}