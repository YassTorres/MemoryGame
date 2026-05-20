import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button"

function GameOverScreen()
{
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state;
    return(
    <>
     <div className="window"> </div>
     <section className="gameoverscreen box-container flex-wrap"> 
        <div className="hologram-box"> 
           <h1 className="title text-4xl! md:text-6xl! my-30! lg:mx-50! "> {message}</h1>
            
            <div className="animate-slide-down">
                <Button Style="animate-bounce [animation-delay:100ms] start-btn text-6xl" Text="PLAY AGAIN" OnClick={() => navigate("/game")}/>
            </div>

        </div>

    </section>
    </>)
}
export default GameOverScreen