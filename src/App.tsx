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
        for (let i = 0; i <= 39; i++) {
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

    function checkForRowOfFour() {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64];

            if (notValid.includes(i)) continue;
            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = '');
            }
        }
    }
    function checkForRowOfThree() {
        for (let i = 0; i < 60; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64];

            if (notValid.includes(i)) continue;

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfThree.forEach(square => currentColorArrangement[square] = '');
            }
        }
    }

    function moveIntoSquareBelow() {
        for (let i = 0; i < 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColours.length);
                currentColorArrangement[i] = candyColours[randomNumber];
            }
            if ((currentColorArrangement[i + width]) === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = '';
            }
        }
    }

    function dragStart() {
        console.log('start')
    }

    function dragDrop() {
        console.log('drop')
    }

    function dragEnd() {
        console.log('end')
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
            checkForRowOfFour();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer);
    }, [moveIntoSquareBelow(),  checkForColumnOfFour(),checkForRowOfThree(),checkForRowOfFour(),  currentColorArrangement])


  return (
    <div className="app">
        <div className="game">
            {currentColorArrangement.map((candyColor: string, index: number) => (
                <img
                    key={index}
                    style={{backgroundColor: candyColor}}
                    alt={candyColor}
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                />)
            )}
        </div>
    </div>
  );
}

export default App;
