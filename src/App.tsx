import React, {useEffect, useState} from 'react';

const width = 8;
const candyColours = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]



function App() {

    const [currentColorArangement, setCurrentColorArrangement] = useState<string[]>([] )

    function createBoard() {
        const randomColorArrangement = [];

        for (let i = 0; i < width * width; i++){
            const randomNumberFrom0To5 = Math.floor(Math.random() * candyColours.length);
            const randomColor = candyColours[randomNumberFrom0To5];

            randomColorArrangement.push(randomColor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    }

    useEffect(() => {
        createBoard();
    }, [width]); // if the width would change the createBoard will rerender

  return (
    <div className="app">
        <div className="game">
            {currentColorArangement.map((candyColor: string, index: number) => (
                <img
                    key={index}
                    style={{backgroundColor: candyColor}}
                />)
            )}
        </div>
    </div>
  );
}

export default App;
