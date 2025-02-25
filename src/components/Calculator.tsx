import React, { useState } from "react";

export const Calculator: React.FC = () => {
    const [displayValue, setDisplayValue] = useState<string>("0");
    const [expression, setExpression] = useState<string>("");
    const [lastOperation, setLastOperation] = useState<string>("");
    const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
    
    const mathSymbols = "+-*/";

    const evaluateExpression = (exp: string): string => {
        try {
            const result = Function('"use strict";return (' + exp + ')')();
            const num = Number(result);
            // If it's a whole number, don't show decimals
            if (Number.isInteger(num)) {
                return num.toString();
            }
            // Otherwise show up to 4 decimal places without trailing zeros
            return num.toFixed(4).replace(/\.?0+$/, '');
        } catch {
            return "Error";
        }
    };
    
    const Clear = () => {
        setDisplayValue("0");
        setExpression("");
        setLastOperation("");
        setIsNewNumber(true);
        // Force a re-render to ensure "0" is displayed
        setTimeout(() => setDisplayValue("0"), 0);
    };
    
    const EnterNumbers = (number: string) => {
        if (lastOperation === "=") {
            setExpression(number);
            setDisplayValue(number);
            setLastOperation("");
            setIsNewNumber(false);
        } else if (isNewNumber) {
            setDisplayValue(number);
            setExpression(expression + number);
            setIsNewNumber(false);
        } else {
            // Always concatenate numbers unless it's a new number after an operator
            setDisplayValue(displayValue === "0" ? number : displayValue + number);
            setExpression(expression + number);
        }
    };

    const EnterSymbol = (symbol: string) => {
        if (lastOperation === "=") {
            setExpression(displayValue + symbol);
            setIsNewNumber(true);
            setLastOperation(symbol);
            return;
        }

        if (expression === "" && symbol === "-") {
            setDisplayValue("-");
            setExpression("-");
            setIsNewNumber(false);
            return;
        }

        const lastChar = expression.slice(-1);
        const secondLastChar = expression.slice(-2, -1);

        if (mathSymbols.includes(lastChar)) {
            // Transform double minus into plus
            if(symbol === "-" && lastChar === "-") {
                setExpression(expression.slice(0, -1) + "+")
            } 
            // Allow adding a negative sign after other operators (e.g., "2*-3")
            else if (symbol === "-" && lastChar !== "-") {
                setExpression(expression + symbol);
            } 
            // Handle case with three consecutive operators (remove two previous operators)
            else if (mathSymbols.includes(secondLastChar)) {
                setExpression(expression.slice(0, -2) + symbol);
            } 
            // Replace last operator with the new one
            else {
                setExpression(expression.slice(0, -1) + symbol);
            }
        } 
        // Allow starting with negative numbers or adding symbols after numbers/parentheses
        else if (expression !== "" || symbol === "-") {
            setExpression(expression + symbol);
        }

        setIsNewNumber(true);
        setLastOperation(symbol);
    };

    const Evaluate = () => {
        //prevents evaluating if the last expression char is a symbol
        if (!expression || mathSymbols.includes(expression.slice(-1))) return;

        let result = evaluateExpression(expression);
        setDisplayValue(result);
        setExpression(result);
        setLastOperation("=");
        setIsNewNumber(true);
    };

    const Decimal = () => {
        if (lastOperation === "=") {
            setDisplayValue("0.");
            setExpression("0.");
            setLastOperation("");
            setIsNewNumber(false);
            return;
        }

        if (isNewNumber) {
            setDisplayValue("0.");
            setExpression(expression + "0.");
            setIsNewNumber(false);
        } else if (!displayValue.includes(".")) {
            setDisplayValue(displayValue + ".");
            setExpression(expression + ".");
        }
    };

    return (
<div id="calculator" className="border-4 border-gray-800 rounded-md shadow-lg w-80 flex flex-col p-3 bg-gray-700 mx-auto">
    <div id="display-container" className="bg-black h-20 mb-3 rounded-sm px-2 overflow-hidden">
        <div id="formula-display" className="h-10 flex justify-end items-center p-1 text-white text-lg font-mono overflow-x-auto">{expression}</div>
        <div id="display" className="h-10 flex justify-end items-center p-1 text-white text-2xl font-mono overflow-x-auto">{displayValue}</div>
    </div>
    <div id="buttonContainer" className="h-80 grid grid-cols-4 gap-1">
        <button id="clear" className="bg-red-700 hover:bg-red-600 transition-colors text-white p-4 col-span-2 flex justify-center items-center border border-gray-900 rounded-sm" onClick={Clear}>AC</button>
        <button id="divide" className="bg-gray-500 hover:bg-gray-400 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterSymbol("/")}>/</button>
        <button id="multiply" className="bg-gray-500 hover:bg-gray-400 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterSymbol("*")}>x</button>

        <button id="seven" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("7")}>7</button>
        <button id="eight" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("8")}>8</button>
        <button id="nine" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("9")}>9</button>
        <button id="subtract" className="bg-gray-500 hover:bg-gray-400 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterSymbol("-")}>-</button>

        <button id="four" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("4")}>4</button>
        <button id="five" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("5")}>5</button>
        <button id="six" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("6")}>6</button>
        <button id="add" className="bg-gray-500 hover:bg-gray-400 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterSymbol("+")}>+</button>

        <button id="one" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("1")}>1</button>
        <button id="two" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("2")}>2</button>
        <button id="three" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("3")}>3</button>
        <button id="equals" className="bg-blue-800 hover:bg-blue-700 transition-colors text-white row-span-2 p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={Evaluate}>=</button>

        <button id="zero" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white col-span-2 p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={() => EnterNumbers("0")}>0</button>
        <button id="decimal" className="bg-gray-600 hover:bg-gray-500 transition-colors text-white p-4 flex justify-center items-center border border-gray-900 rounded-sm" onClick={Decimal}>.</button>
    </div>
</div>
    );
};