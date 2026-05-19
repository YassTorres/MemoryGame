import soundOn from "../assets/images/sound--on.svg";
import soundOff from "../assets/images/sound--off.svg";
function Header({timer})
{
    return(
        <div className="header relative"> 
            <p className="text-8xl text-white"> {timer}</p>
            <img className="sound" src={soundOff} alt="soundMuted"/>
        </div>)
}
export default Header