import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './favoritos.css'


function Favoritos() {

    const [listaFilmes, setListaFilmes] = useState([])

    useEffect(() => {
        async function readLocalStorage() {
            await setListaFilmes(JSON.parse(localStorage.getItem("@minhalista")))
        }
        readLocalStorage()
        console.log(listaFilmes)

    }, [])

    async function deletarFilme(id){
        let novaLista = listaFilmes.filter(( filmeSalvo ) => filmeSalvo.id !== id)
        setListaFilmes(novaLista)
        localStorage.setItem("@minhalista", JSON.stringify(novaLista))
    }

    return (
        <div className="principal">
            <div className="containerFav">
                <h1><a className="heart">❤</a> Seus filmes favoritos</h1>
                {
                listaFilmes.map((filme) => {
                    return (
                        <div className='filmeFav'>
                            <div className='infosEsquerda'>
                                <img alt={filme.title} className='posterFav' src={'https://image.tmdb.org/t/p/w500/'+filme.poster_path} />
                                <span className='tituloFav'>{filme.title}</span>
                            </div>
                            <div className='infosDireita'>
                                <Link to={"/filme/"+filme.id}>
                                    <button className='bto-info'><i class="material-icons">info</i></button>
                                </Link>
                                <button onClick={() => {deletarFilme(filme.id)}} className='bto-retirar'><i class="material-icons">heart_broken</i></button>
                            </div>
                        </div>
                    )
                })             
                }
            </div>
        </div>
    )
}

export default Favoritos