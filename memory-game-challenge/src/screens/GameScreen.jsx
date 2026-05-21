import { useEffect, useState } from "react"
import cardsData from "../data/cards.json";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import matchSFX from "../assets/sounds/correct.mp3";
import errorSFX from "../assets/sounds/incorrect.mp3";
import timerSFX from "../assets/sounds/ticking.mp3";
import backgroundSfx from "../assets/sounds/background.mp3"

const matchSound = new Audio(matchSFX);
const errorSound = new Audio(errorSFX);
const timerSound = new Audio(timerSFX);
function GameScreen()
{
    const [cards,setCards] = useState([]);
    const [revealCards,setRevealCards] = useState([]);
    const [matchCards,setMatchCards] = useState([]);
    const [isModal,setModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [timer,setTimer] = useState(30);
    const navigate = useNavigate();
    //AUDIOS

    useEffect(()=>{
       const shuffleCards = shuffle(cardsData.cards);
       //console.log(shuffleCards);
       setCards(shuffleCards); 
    },[])

    useEffect(() => {
    const interval = setInterval(() => {
        setTimer((time) => {
            if (time <= 0) 
            {
                clearInterval(interval);
                endGame("LOSE");
                return
            };
            const currentTime = time - 1
            if (currentTime <= 10) 
            {
                timerSound.currentTime = 0;
                timerSound.play();
            }
            return currentTime;
        });
      }, 1000);
    return () => clearInterval(interval);
  }, []);
    return(
     <>
    <div className="window"> </div>
    <section className="gamescreen flex-wrap"> 
        <Header timer={timer}/>
        {isModal && 
        <Modal closeModal={()=>{setModal(false)}}>
            {modalContent}
        </Modal>}
        <div className="hologram-box"> 
            <h2 className="title mt-20! text-amber-300!"> Choose your Pair Cards </h2>
            <div className={`card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 place-items-center px-20 lg:px-40 py-5 ${revealCards.length >= 2 ? "pointer-events-none" : ""}`}> 
                {cards.map((card)=>{
                    const flippedCards = revealCards.includes(card) || matchCards.includes(card);
                    return(
                    <Card
                    key={card.id}
                    id={card.id}
                    cardId = {card.cardID}
                    name = {card.name}
                    image = {card.image}
                    isFlipped={flippedCards}
                    onClickCard={() => revealCard(card)}
                    />
                )})}
            </div>
        </div>


    </section>
    </>)
    function revealCard(clickedCard)
    {
        if (revealCards.length >= 2) return;
        const selectedCards = [...revealCards,clickedCard];
        let delayTime;
        let isMatch;

        setRevealCards(selectedCards);
        if (selectedCards.length === 2) {
            if(selectedCards[0].cardID == selectedCards[1].cardID)
            {
                //console.log("ES UN MATCH");
                isMatch = true;
                const updatedMatchCards = [...matchCards,...selectedCards]
                setMatchCards(prev => [...prev, ...selectedCards]);
                checkCards(updatedMatchCards);
                matchSound.currentTime = 0;
                matchSound.play();
                delayTime = 800;
            }
            else
            {
                isMatch = false;
                errorSound.currentTime = 0;
                errorSound.play();
                delayTime = 500;
                //console.log("NO ES MATCH");
            }
             setTimeout(() => {
                    setRevealCards([]);
                }, delayTime);
             setTimeout(()=>{
                 setModal(true);
                 setModalContent(fillModalContent(selectedCards,isMatch))
             },800)
        }
        
    }
    //CHECK IF YOU CAN WIN
    function checkCards(updatedMatchCards){
        if(updatedMatchCards.length == cards.length)
        {
            endGame("WIN");
        }

    }
    function endGame(state)
    {
        timerSound.pause();
        timerSound.currentTime = 0;
        let message;
        switch (state) {
            case "WIN":
            message = "you did it";
                break;
            case "LOSE":
            message = "oops you didn't find them all"
                break;
            default:
                break;
        }
         navigate('/gameover',{state:message})
    }
    //GET HTML BY MODAL
     function fillModalContent(selectedCards, isMatch)
    {
        const cards = selectedCards;
        const htmlContent = 
        <div className="grid-modal grid grid-cols-2 w-full gap-3 place-items-center md:p-20">
            {cards.map((card)=>(
               <Card
                    key={card.id}
                    id={card.id}
                    cardId = {card.cardID}
                    name = {card.name}
                    image = {card.image}
                    customClass="animate-fade-in"
                />
            ))}
        </div>
        
        if(isMatch)
        {
            return  (
            <> 
            <h3 className="title text-amber-300!"> Nice! it's a match</h3>
            <img className="confetti" src="/confetti.gif" alt="congratulations"/>
            {htmlContent}
            </>
            )
        }
        else
        {
          return  (
            <> 
            <h3 className="title text-amber-300!"> Sorry, but this is not a match</h3>
            {htmlContent}
            </>
            )
        }
    }
    
}
//REVOLVER CARTAS
    function shuffle(data)
    {
        const cardsData =[...data]
         for (let i = cardsData.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
        }
        return cardsData;
    }
   
export default GameScreen