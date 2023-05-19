import axios from 'axios'

export default axios.create({
    baseURL:  'https://api.giphy.com/v1/',
    timeout: 3000
})