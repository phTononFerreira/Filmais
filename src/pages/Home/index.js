import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css';
function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function apiTrendingAllWeek(pages = 1) {
            setLoading(true);
            let listaFilmes = [];
            for (let i = 1; i <= pages; i++) {
                const response = await api.get("trending/movie/week", {
                    params: {
                        api_key: "68ecc2589de11d7d81e0e23f7d06c000",
                        language: "pt-BR",
                        page: i,
                    }
                })
                const listaFilmesPag = await response.data.results.map(filme => ({
                    ...filme,
                    vote_average: filme.vote_average.toFixed(1),
                    first_air_date: (filme.first_air_date ?? "").split("-")[0],
                    release_date: (filme.release_date ?? "").split("-")[0]
                }))
                listaFilmes = [...listaFilmes, ...listaFilmesPag]
            }
            setLoading(false);
            setFilmes(listaFilmes)
        }
        apiTrendingAllWeek(100);
    }, [])

    return (
        <div>
            {loading ? (
                <div className="loading">
                    <p>Carregando filmes...</p>
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    <div className="poster-principal">
                    </div>
                    <div className="grade-filmes">
                        {filmes.map((filme) => {
                            return (
                                <Link to={"/filme/" + filme.id}>
                                    <div key={filme.id} className="filme">
                                        <img alt="poster" className="poster" src={"https://image.tmdb.org/t/p/w500" + filme.poster_path} />
                                        <div className="poster-gradient"></div>
                                        <div className="detalhes">
                                            <span className="titulo">{filme.title || filme.name}</span>
                                            <span className="avaliacao"><i class="material-icons">star</i>{" " + filme.vote_average}</span>
                                            <span className="ano">{filme.first_air_date || filme.release_date}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Home