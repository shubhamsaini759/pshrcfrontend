import api from ".."
import { paths } from "../endpoints"

const token = localStorage.getItem('token')

export const casesList = async() =>{
    const url = await api.get(paths.deceasedlist,{ headers : { Authorization : token }})
    return url?.data
}

export const caseDetails = async(id) =>{
    const url = await api.get(paths.casedetails+id,{ headers : { Authorization : token }})
    return url?.data
}

export const createuser = async(data) =>{
    const url = await api.post(paths.createuser,data,{ headers : { Authorization : token, 'Content-Type' : 'multipart/form-data' } })
    return url?.data
}

export const userlist = async() =>{
    const url = await api.get(paths.userlist,{ headers : { Authorization : token }})
    console.log('url',url)
    return url?.data
}

export const deleteuser = async(id) =>{
    const url = await api.delete(paths.deleteuser+id,{ headers : { Authorization : token }})
    return url?.data
}

export const userdetails = async(id) =>{
    const url = await api.get(paths.userdetails+id,{ headers : { Authorization : token }})
    return url?.data
}