import React from 'react';

type KeyboardPadProps = {
    onButtonClick: (value: string) => void;
};

const KeyboardPad: React.FC<KeyboardPadProps> = ({ onButtonClick }) => {
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*', 
        '1', '2', '3', '-', 
        '0', '. | °', '=', '+', 
        'pow', 'log', 'exp', 'sqrt',
        '(', ')', 'x', 'AC',
        'sin', 'cos', 'tan', "DEL",
    ];

    return (
        <div className="flex-col justify-center items-center w-full">
            <div className="grid grid-cols-4 gap-2 p-4">
                {buttons.map((button) => (
                <button
                    key={button}
                    onClick={() => onButtonClick(button)}
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {button}
                </button>
                ))}
            </div>
            <button 
                onClick={() => onButtonClick("CALC")} 
                className='bg-cyan-600 w-full hover:bg-cyan-700 text-black font-bold py-2 px-15 rounded focus:outline-none focus:shadow-outline'
            >
                CALCULATE
            </button>
        </div>
    );
};

export default KeyboardPad;