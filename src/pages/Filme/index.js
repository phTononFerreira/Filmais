import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import './filme.css'

function Filme() {

    const { id } = useParams()
    const [filme, setFilme] = useState({})
    const [error, setError] = useState()
    const [hasFilm, setHasFilm] = useState()

    async function hasFilmVerify() {
        const minhaLista = localStorage.getItem("@minhalista")
        let filmesSalvos = await JSON.parse(minhaLista) || []

        if (filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)) {
            setHasFilm(true)
            document.querySelector(".bto-addFav").style.color = "#ff004c"
            document.querySelector(".bto-addFav").style.backgroundColor = "white"
        } else {
            setHasFilm(false)
            document.querySelector(".bto-addFav").style.color = "white"
            document.querySelector(".bto-addFav").style.backgroundColor = "#ff004c"
        }

    }

    useEffect(() => {
        hasFilmVerify()
    })


    useEffect(() => {

        async function search(ID) {
            await hasFilmVerify()
            let response = ""
            try {
                response = await api.get(`movie/${ID}`, {
                    params: {
                        api_key: "68ecc2589de11d7d81e0e23f7d06c000",
                        language: "pt-BR",
                    }
                })
            } catch (e) {
                setError(true)
            }

            const filmeD = {
                ...response.data,
                vote_average: response.data.vote_average.toFixed(1),
                first_air_date: (response.data.first_air_date ?? "").split("-")[0],
                release_date: (response.data.release_date ?? "").split("-")[0]
            }

            setFilme(filmeD)
        }
        search(id)
    }, [])

    if (error)
        return (
            <div>
                <div className="container">
                    <h1>☹ Não foi possível encontrar o filme!</h1>
                </div>
            </div>
        )



    async function salvarFilme() {
        const minhaLista = localStorage.getItem("@minhalista")
        let filmesSalvos = JSON.parse(minhaLista) || []

        await hasFilmVerify()

        if (hasFilm) {
            filmesSalvos = filmesSalvos.filter((filmeSalvo) => filmeSalvo.id !== filme.id);
            setHasFilm(false)
        } else {
            filmesSalvos.push(filme)
            setHasFilm(true)
        }
        localStorage.setItem("@minhalista", JSON.stringify(filmesSalvos))
    }

    return (
        <div className="filmeEspecifico">
            <div className="container">
                <h1>{(filme.title || filme.name) ?? ""}</h1>
                <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.backgroundColor = "#202020";
                    }}
                    alt="backdrop" className="backdrop"
                />
                <span className="resumo">{filme.overview}</span> <br />
                <div className="detalhes-esp">
                    <span className="avaliacao-esp"><i class="material-icons">star</i>{filme.vote_average}</span>
                    <span className="duracao"><i class="material-icons">schedule</i>{filme.runtime}min</span>
                </div>
                <div className="opcoes">
                    <button onClick={salvarFilme} className="bto-addFav">{hasFilm ? "❤" : "❤ Adicionar aos favoritos"}</button>
                    <a target="blank" rel="external" className="bto-trailer" href={`https://www.youtube.com/results?search_query=${(filme.title || filme.name) ?? ""} Trailer`}><i class="material-icons">play_arrow</i>Trailer</a>
                </div>
            </div>
        </div>
    )
}

export default Filme