import axios from 'axios'
import store from '@/store/'

const request =  axios.create({
    baseURL:'http://ttapi.research.itcast.cn/'
})

request.interceptors.request.use(config=>{
    const {user} = store.state
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
},error=>{
    return Promise.reject(error)
})

export default request