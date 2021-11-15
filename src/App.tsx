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

    const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([] )

    function checkForColumnOfFour() {
        for (let i = 0; i < 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfFour.forEach(square => currentColorArrangement[square] = '');
            }
        }
    }

    function checkForColumnOfThree() {
        for (let i = 0; i < 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfThree.forEach(square => currentColorArrangement[square] = '');
            }
        }
    }


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
    }, []); // if there was width: if the width would change the createBoard will rerender

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForColumnOfThree();
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer);
    }, [checkForColumnOfThree(), checkForColumnOfFour(), currentColorArrangement])


  return (
    <div className="app">
        <div className="game">
            {currentColorArrangement.map((candyColor: string, index: number) => (
                <img
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                />)
            )}
        </div>
    </div>
  );
}

export default App;
