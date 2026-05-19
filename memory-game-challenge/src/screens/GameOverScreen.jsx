import { useLocation } from "react-router-dom";
import { Link } from 'react-router';
import Button from "../components/Button"

function GameOverScreen()
{
    const location = useLocation();
    const message = location.state;
    return(
    <>
     <div className="window"> </div>
     <section className="gameoverscreen box-container flex-wrap"> 
        <div className="hologram-box"> 
           <h1 className="title text-6xl! my-30! mx-50! "> {message}</h1>
            
            <Link to="/game" className="animate-slide-down">
            <Button Style="animate-bounce [animation-delay:100ms] start-btn text-6xl" Text="PLAY AGAIN" OnClick={() => console.log("START AGAIN")}/>
            </Link>

        </div>

    </section>
    </>)
}
export default GameOverScreen