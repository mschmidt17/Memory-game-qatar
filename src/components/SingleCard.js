import './singleCard.css'
import rihla from "../img/rihla-training.png"

export default function SingleCard({ card, handleChoice, cardFlipped, disabled, clicks, setClicks }) {    
    const handleClick = () => {
        if(clicks !== card.id) {
            if (!disabled) {
                handleChoice(card);
                setClicks(card.id)
            }
        }        
    }

    return (
        <div className="card">
            <div className={cardFlipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="Card front" />
                <img
                    className="back" 
                    src={rihla}
                    onClick={handleClick}
                    alt="Card back"
                />
            </div>
        </div>
    )
}