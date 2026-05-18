function Button({Style,Text,OnClick}){
return(
    <button className={Style + " btn"} onClick={OnClick}>  {Text} </button>
)
}
export default Button