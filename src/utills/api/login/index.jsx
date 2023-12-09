import api from ".."
import { paths } from "../endpoints"




export const login = async(data) =>{
    const url = await api.post(paths.login,data)
    return url?.data
}


export const veriFyAccount = async(data) =>{
    console.log(data,'otps')
    const url = await api.post(paths.veriFyAccount,data)
    return url?.data
}