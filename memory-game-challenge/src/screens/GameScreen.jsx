import { useEffect, useState } from "react"
import cardsData from "../data/cards.json";
import Card from "../components/Card";
import Modal from "../components/Modal";


function GameScreen()
{
    const [cards,setCards] = useState([]);
    const [revealCards,setRevealCards] = useState([]);
    const [matchCards,setMatchCards] = useState([]);
    const [isModal,setModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [timer,setTimer] = useState(30);

    useEffect(()=>{
       const shuffleCards = shuffle(cardsData.cards);
       //console.log(shuffleCards);
       setCards(shuffleCards); 
    },[])

    useEffect(() => {
    if (timer <= 0) 
    {
        endGame("LOSE");
        return
    };
    let interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
    return(
     <>
    <section className="gamescreen flex-wrap"> 
        <div className="header"> <p className="text-8xl text-white"> {timer}</p> </div>
        {isModal && 
        <Modal closeModal={()=>{setModal(false)}}>
            {modalContent}
        </Modal>}
        <div className="hologram-box"> 
            <h2 className="title mt-20!"> Choose your Pair Cards </h2>
            <div className="card-container grid grid-cols-3 w-full gap-3 place-items-center px-40 py-5"> 
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
                delayTime = 800;
            }
            else
            {
                isMatch = false;
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
    function checkCards(updatedMatchCards){
        if(updatedMatchCards.length == cards.length)
        {
            endGame("WIN");
        }

    }
    function endGame(state)
    {
        switch (state) {
            case "WIN":
                console.log("GANASTE")
                break;
            case "LOSE":
                console.log("PERDISTE")
                break;
            default:
                break;
        }
    }
     function fillModalContent(selectedCards, isMatch)
    {
        const cards = selectedCards;
        const htmlContent = 
        <div className="grid grid-cols-2 w-full gap-3 place-items-center p-20">
            {cards.map((card)=>(
               <Card
                    key={card.id}
                    id={card.id}
                    cardId = {card.cardID}
                    name = {card.name}
                    image = {card.image}
                />
            ))}
        </div>
        
        if(isMatch)
        {
            return  (
            <> 
            <h3 className="title"> Nice! it's a match</h3>
            {htmlContent}
            </>
            )
        }
        else
        {
          return  (
            <> 
            <h3 className="title"> Sorry, but this is not a match</h3>
            {htmlContent}
            </>
            )
        }
    }
    
}
//REVOLVER CARTAS
    function shuffle(data)
    {
         for (let i = data.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        return data;
    }
   
export default GameScreen