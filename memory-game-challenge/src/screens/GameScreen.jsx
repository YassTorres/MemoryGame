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
    useEffect(()=>{
       const shuffleCards = shuffle(cardsData.cards);
       //console.log(shuffleCards);
       setCards(shuffleCards); 
    },[])
    return(
     <>
    <section className="gamescreen flex-wrap"> 
        {isModal && 
        <Modal>
            {modalContent}
        </Modal>}
        <div className="hologram-box"> 
            <h2 className="title"> Choose your Pair Cards </h2>
            <div className="card-container grid grid-cols-3 w-full gap-3 place-items-center h-screen p-30"> 
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
        let isMatch;

        setRevealCards(selectedCards);
        if (selectedCards.length === 2) {

            if(selectedCards[0].cardID == selectedCards[1].cardID)
            {
                //console.log("ES UN MATCH");
                isMatch = true;
                setMatchCards(selectedCards);
            }
            else
            {
                isMatch = false;
                console.log("no es un match");
            }
            setModal(true);
            setModalContent(modalContent(isMatch))
             setTimeout(() => {
                    setRevealCards([]);
                }, 1000);

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
    function modalContent(isMatch)
    {
        let content;
        if(isMatch)
        {
            content = <h1>ES UN MATCH</h1>
        }
        else
        {
            content = <h1> NO ES MATCH</h1>
        }
        return content
    }
export default GameScreen