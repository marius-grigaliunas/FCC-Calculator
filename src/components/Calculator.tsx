import React, { useState } from "react";


export const Calculator : React.FC = () => {
    
    const [expression, setExpression] = useState<string>("")
    const [pressedButton, setPressedButton] = useState<string>("0")

    const mathSymbols = "+-*/"

    const Clear = () => {
        setExpression("")
        setPressedButton("0")
    }

    const EnterNumbers = (number: string) => {
        if(pressedButton === "0") {
            setPressedButton(number)
            setExpression(number)
        } else  if(mathSymbols.includes(pressedButton[0])){
            setPressedButton(number)
            setExpression(expression + number)
        } else {
            setExpression(expression + number)
            setPressedButton(pressedButton + number)
        }
    }

    const EnterSymbol = (symbol: string) => {
        setPressedButton(symbol)
        if(expression[expression.length-1] != symbol)
            setExpression(expression + symbol)
    }

    const Evaluate = () => {
        const result = eval(expression)

        setExpression(expression + `=${result}`)
        setPressedButton(result)
    }

    const Decimal = () => {

        const decimalCheck = (exp: string) => {
            if(exp.includes("."))
                return false
            else
                return true
        }

        /*if(!pressedButton.includes(".")) {
            setPressedButton(pressedButton + ".")
            setExpression(expression + ".")
        }*/

        if (mathSymbols.includes(expression[expression.length-1])) {
            console.log("duhas")
            setPressedButton("0.")
            setExpression(expression + "0.")
        } else if(!pressedButton.includes(".")) {
            setPressedButton(pressedButton + ".")
            setExpression(expression + ".")
        }
    }

    return (
        <div id="calculator" className="border h-100 w-80 flex flex-col p-2 bg-gray-700">
            <div id="display-container" className=" bg-black h-20 mb-2 px-2">
                <div id="formula-display" className="h-10 flex justify-end p-1 text-white text-2xl">{expression}</div>
                <div id="display" className="h-10 flex justify-end p-1 text-white text-2xl">{pressedButton}</div>
            </div>
            <div id="buttonContainer" className="h-80 grid grid-cols-4">

                <button id="clear" className="bg-red-700 text-white p-4 col-span-2 flex justify-center items-center" onClick={Clear}>AC</button>
                <button id="divide" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("/")} >/</button>
                <button id="multiply" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("*")} >x</button>

                <button id="seven" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("7")} >7</button>
                <button id="eight" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("8")} >8</button>
                <button id="nine" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("9")} >9</button>
                <button id="subtract" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("-")} >-</button>
            
            
                <button id="four" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("4")} >4</button>
                <button id="five" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("5")} >5</button>
                <button id="six" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("6")} >6</button>
                <button id="add" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("+")} >+</button>

                
                <button id="one" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("1")} >1</button>
                <button id="two" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("2")} >2</button>
                <button id="three" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("3")} >3</button>
                <button id="equals" className="bg-blue-800 text-white row-span-2 p-4 flex justify-center items-center" onClick={Evaluate}>=</button>

                <button id="zero" className="bg-gray-600 text-white col-span-2 p-4 flex justify-center items-center" onClick={() => EnterNumbers("0")} >0</button>
                <button id="decimal" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={Decimal} >.</button>
                
            </div>
        </div>
    )
}