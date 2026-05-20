import Button from "../components/Button"
import logo from "../assets/images/logo.svg"
import { Link, useNavigate } from 'react-router';

function StartScreen()
{
    const navigate = useNavigate();
    return(
    <>
    <div className="window"> </div>
     <section className="startscreen box-container flex-wrap"> 
        <div className="hologram-box"> 
            <picture className="logo animate-slide-up"> 
                <img className="my-10" src={logo} alt="memory-game-logo"/> 
            </picture>
            
            <div className="animate-slide-down">
                <Button Style="animate-bounce [animation-delay:100ms] start-btn text-6xl" Text="START GAME" OnClick={() => navigate("/game")}/>
            </div>

        </div>

    </section>
    </>)
}
export default StartScreen