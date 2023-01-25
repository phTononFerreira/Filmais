import axios from 'axios'
// URL: https://api.themoviedb.org/3/
// API_KEY = "68ecc2589de11d7d81e0e23f7d06c000"

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'

})

export default api