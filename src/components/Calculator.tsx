import React, { useState } from "react";

export const Calculator: React.FC = () => {
    const [expression, setExpression] = useState<string>("");
    const [currentNumber, setCurrentNumber] = useState<string>("0");
    const [lastWasEquals, setLastWasEquals] = useState<boolean>(false);
    
    const mathSymbols = "+-*/";

    const Clear = () => {
        setExpression("");
        setCurrentNumber("0");
        setLastWasEquals(false);
    };

    const EnterNumbers = (number: string) => {
        if (lastWasEquals) {
            setExpression("");
            setCurrentNumber(number);
            setLastWasEquals(false);
            return;
        }

        // Handle leading zeros
        if (currentNumber === "0" && number === "0") return;
        if (currentNumber === "0" && number !== "0") {
            setCurrentNumber(number);
            if (mathSymbols.includes(expression.slice(-1))) {
                setExpression(expression + number);
            } else {
                setExpression(number);
            }
            return;
        }

        if (mathSymbols.includes(currentNumber)) {
            setCurrentNumber(number);
        } else {
            setCurrentNumber(currentNumber + number);
        }

        setExpression(expression + number);
    };

    const EnterSymbol = (symbol: string) => {
        setLastWasEquals(false);
        const lastChar = expression.slice(-1);
        const secondLastChar = expression.slice(-2, -1);

        // Handle starting with negative
        if (expression === "" && symbol === "-") {
            setExpression("-");
            setCurrentNumber("-");
            return;
        }

        // Don't start with other operators
        if (expression === "" && symbol !== "-") return;

        // Handle consecutive operators
        if (mathSymbols.includes(lastChar)) {
            if (symbol === "-" && lastChar !== "-" && !mathSymbols.includes(secondLastChar)) {
                setExpression(expression + symbol);
                setCurrentNumber(symbol);
            } else if (mathSymbols.includes(secondLastChar)) {
                setExpression(expression.slice(0, -2) + symbol);
                setCurrentNumber(symbol);
            } else {
                setExpression(expression.slice(0, -1) + symbol);
                setCurrentNumber(symbol);
            }
            return;
        }

        setExpression(expression + symbol);
        setCurrentNumber(symbol);
    };

    const Evaluate = () => {
        if (!expression || mathSymbols.includes(expression.slice(-1))) return;

        try {
            // Remove trailing operators
            let evalExp = expression;
            while (mathSymbols.includes(evalExp.slice(-1))) {
                evalExp = evalExp.slice(0, -1);
            }

            let result = Function('"use strict";return (' + evalExp + ')')();
            
            // Handle precision
            result = Number(parseFloat(result.toString()).toPrecision(12));
            
            setExpression(evalExp);
            setCurrentNumber(result.toString());
            setLastWasEquals(true);
        } catch (error) {
            setCurrentNumber("Error");
            setLastWasEquals(true);
        }
    };

    const Decimal = () => {
        if (lastWasEquals) {
            setExpression("0.");
            setCurrentNumber("0.");
            setLastWasEquals(false);
            return;
        }

        // If last character is an operator, add "0."
        if (mathSymbols.includes(expression.slice(-1))) {
            setExpression(expression + "0.");
            setCurrentNumber("0.");
            return;
        }

        // Find last number in expression
        let lastNumber = currentNumber;
        if (mathSymbols.includes(lastNumber)) {
            lastNumber = "0";
        }

        // Don't add decimal if number already has one
        if (lastNumber.includes(".")) return;

        if (expression === "" || currentNumber === "0") {
            setExpression(expression + "0.");
            setCurrentNumber("0.");
        } else {
            setExpression(expression + ".");
            setCurrentNumber(lastNumber + ".");
        }
    };

    return (
        <div id="calculator" className="border h-100 w-80 flex flex-col p-2 bg-gray-700">
            <div id="display-container" className="bg-black h-20 mb-2 px-2">
                <div id="formula-display" className="h-10 flex justify-end p-1 text-white text-2xl">{expression}</div>
                <div id="display" className="h-10 flex justify-end p-1 text-white text-2xl">{currentNumber}</div>
            </div>
            <div id="buttonContainer" className="h-80 grid grid-cols-4">
                <button id="clear" className="bg-red-700 text-white p-4 col-span-2 flex justify-center items-center" onClick={Clear}>AC</button>
                <button id="divide" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("/")}>/</button>
                <button id="multiply" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("*")}>x</button>

                <button id="seven" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("7")}>7</button>
                <button id="eight" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("8")}>8</button>
                <button id="nine" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("9")}>9</button>
                <button id="subtract" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("-")}>-</button>

                <button id="four" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("4")}>4</button>
                <button id="five" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("5")}>5</button>
                <button id="six" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("6")}>6</button>
                <button id="add" className="bg-gray-500 text-white p-4 flex justify-center items-center" onClick={() => EnterSymbol("+")}>+</button>

                <button id="one" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("1")}>1</button>
                <button id="two" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("2")}>2</button>
                <button id="three" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={() => EnterNumbers("3")}>3</button>
                <button id="equals" className="bg-blue-800 text-white row-span-2 p-4 flex justify-center items-center" onClick={Evaluate}>=</button>

                <button id="zero" className="bg-gray-600 text-white col-span-2 p-4 flex justify-center items-center" onClick={() => EnterNumbers("0")}>0</button>
                <button id="decimal" className="bg-gray-600 text-white p-4 flex justify-center items-center" onClick={Decimal}>.</button>
            </div>
        </div>
    );
};