import api from ".."
import { paths } from "../endpoints"


const token = localStorage.getItem('token')

export const createdeceased = async(data) =>{
    const url = await api.post(paths.createdeceased,data,{ headers : { "Authorization" : token }})
    return url
}


export const usercases = async(id) =>{
    const url = await api.get(paths.usercases+id,{ headers : { "Authorization" : token }})
    return url?.data
}


export const updatedeceased = async(data) =>{
    const url = await api.put(paths.updatedeceased,data,{ headers :{ "Authorization" : token, 'Content-Type ' : ' multipart/form-data'} })
    return url
}

export const deleteFile = async(data) => {
    const url = await api.put(paths.deleteFile,data,{ headers : { "Authorization" : token }})
    return url
}


export const rejectedData = async(data) => {
    
    const url = await api.post(paths.rejectedData,data,{ headers : { "Authorization" : token }})
    return url?.data
}



export const notifications = async(id) =>{
  
    const url = await api.get(paths.notifications+id,{ headers : { "Authorization" : token }})
    return url?.data
}

export const updateNotification = async(data) =>{
    console.log(data,'jd')
    const url = await api.put(paths.updateNotification,data,{ headers : { "Authorization" : token }})
    return url?.data
}


export const filterCase = async(data) =>{
    const url = await api.post(paths.filterCase+data)
    return url?.data
}


export const filtered = async(data) =>{
    const url = await api.post(paths.filterUser,data)
    return url?.data
}


export const filterUsercase = async(data) =>{
    const url = await api.post(paths.filterUsercase,data)
    return url?.data
}