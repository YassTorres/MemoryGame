import Button from "../components/Button"
import logo from "../assets/images/logo.svg"
import { Link } from 'react-router';

function StartScreen()
{
    return(
    <>
    <div className="window"> </div>
     <section className="startscreen box-container flex-wrap"> 
        <div className="hologram-box"> 
            <picture className="logo animate-slide-up"> 
                <img className="my-10" src={logo} alt="memory-game-logo"/> 
            </picture>
            
            <Link to="/game" className="animate-slide-down">
             <Button Style="animate-bounce [animation-delay:100ms] start-btn text-6xl" Text="START GAME" OnClick={() => console.log("START")}/>
            </Link>

        </div>

    </section>
    </>)
}
export default StartScreen