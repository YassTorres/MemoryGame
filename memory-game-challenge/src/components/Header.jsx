import soundOn from "../assets/images/sound--on.svg";
import soundOff from "../assets/images/sound--off.svg";
import backgroundSfx from "../assets/sounds/background.mp3"
import { useEffect, useState } from "react";
const backgroundMusic = new Audio(backgroundSfx)
backgroundMusic.loop = true;
function Header({timer})
{
    const [isMuted,setMuted] = useState(true);
    useEffect(() => {
        return () => {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        };
    }, []);
     function muted()
     {
        if(isMuted)
        {
            setMuted(false);
            backgroundMusic.play();
        }
        else
        {
            setMuted(true)
            backgroundMusic.pause();
        }
     }
    return(
        <div className="header relative"> 
            <p className="text-6xl lg:text-8xl text-white"> {timer}</p>
            <img className="sound" src={isMuted ? soundOff : soundOn} alt="soundMuted" onClick={()=>{muted()}}/>
        </div>)
}

export default Header