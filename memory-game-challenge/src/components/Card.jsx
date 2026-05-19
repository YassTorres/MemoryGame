import { useEffect } from "react";
import { useState } from "react"

function Card({id,cardId,name,image,isFlipped = null,onClickCard = null})
{
    const [isFlip, setFlip] = useState(isFlipped);
    //VOLTEAR CARTAS
    useEffect(() => {
        setFlip(isFlipped);
    }, [isFlipped]);
    
    function handleClick(){
       if (isFlip) return;
       setFlip(true);
       onClickCard();
    }
    return(
        <div className={`card ${isFlip && " flipped"}`} onClick={()=>{handleClick()}}> 
            <div className="reverse-card"> 
                <span className="text-8xl text-amber-300"> ? </span>
            </div>
            <div className="card-image">
                <img src={"/cards/" + image} alt={name + "-img"}/>
            </div>
            <div className="card-content"> 
                <h2 className="cardTitle"> {name} </h2>
            </div>
        </div>
    )
}
export default Card