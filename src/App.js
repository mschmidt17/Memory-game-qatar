import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard.js';

//IMAGENES SELECCIONES
import img1 from "./img/holanda.png"
import img2 from "./img/belgica.png"
import img3 from "./img/brasil.png"
import img4 from "./img/argentina.png"
import img5 from "./img/croacia.png"
import img6 from "./img/ecuador.png"
import img7 from "./img/mexico.png"
import img8 from "./img/qatar.png"
import img9 from "./img/suiza.png"
import img10 from "./img/uruguay.png"
import img11 from "./img/tunez.png"
import img12 from "./img/francia.png"

import congrats from  "./img/congrats.gif"




const cardImages = [
  { "src": img1, matched: false },
  { "src": img2, matched: false },
  { "src": img3, matched: false },
  { "src": img4, matched: false },
  { "src": img5, matched: false },
  { "src": img6, matched: false },
  { "src": img7, matched: false },
  { "src": img8, matched: false },
  { "src": img9, matched: false },
  { "src": img10, matched: false },
  { "src": img11, matched: false },
  { "src": img12, matched: false },
]

export default function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState([])

  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      
      .sort(() => Math.random() - 0.5)                        
      .map((card) => ({ ...card, id: Math.random() }))        

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setWin([])
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        
  }

  
  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
      setWin(cards.filter(c => c.matched === false))
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      { win.length === 2? <img src={congrats} alt='congratulations!!!' className='congrats'/> : null }
      <h1 className='title'>Qatar 2022</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

