import { Link } from "react-router-dom"
import './header.css'

function Header(){
    return(
        <header>
            <Link to="/" >
                <img width="80px" className="logo" alt="Logo" src="https://cdn.discordapp.com/attachments/746544819773636611/1065278701048180776/film-logo-png-transparent.png"/>
            </Link>
            <Link className="fav-bto" to="/favoritos">❤ Filmes favoritos</Link>
        </header>
    )
}

export default Header