import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
    })
    //请求拦截器
    instance.interceptors.request.use(config => {
        //发送请求之前做点什么
        return config
    }, error => {
        console.log(error)
    })
	//响应拦截器
    instance.interceptors.response.use(res => {
        //对响应结果做点什么
        return res
    }, error => {
        console.log(error)
    })
    return instance(config)
}

