
import { setUser } from '../store/slices/userSlice';
import axios from "axios"
import {store} from "../store"
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../store/slices/loaderSlice';

const baseURL = "http://localhost:5000/api"


const axiosClient = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'accept': 'application/json',
	},
});

export const login = async (email, password) => {
        try{
            store.dispatch(showLoader())
            const response = await axios.post(`${baseURL}/auth/login`, {
                email, 
                password
            })  
            store.dispatch(hideLoader())
            return response  
        }catch(err){
         toast.error(err.response.data.message)
         store.dispatch(hideLoader())
        }
}

export async function GET(URL) {
    try{
    store.dispatch(showLoader())
    // await checkToken()
	const data = await axios.get(`${baseURL}${URL}`, 
    { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
        store.dispatch(hideLoader())
        return data.data
    }catch(err){
    store.dispatch(hideLoader())
    toast.error(err.response.data.message)
    }
}

export async function POST(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.post(`${baseURL}${URL}`, payload,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			toast.success(data.data.message)
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function DELETE(URL) {
    try{
	const response = axios.delete(`${baseURL}${URL}`,
	{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
    store.dispatch(hideLoader())
    return response.data
	}catch(err){
	store.dispatch(hideLoader())
	toast.error(err.response.data.message)
	}
}

export async function FILE(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const formData = new FormData()
		formData.append('file', payload)
		const data = await axios.post(`${baseURL}${URL}`, formData,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			toast.success(data.data.message)
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function DELETEFILE(URL, payload){
	try{
		store.dispatch(showLoader())
		// await checkToken()
		const data = await axios.delete(`${baseURL}${URL}`,
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
			store.dispatch(hideLoader())
			return data.data
		}catch(err){
		store.dispatch(hideLoader())
		toast.error(err.response.data.message)
		}
}

export async function PGET(URL, loader = true, payload = {}) {
	var params = "";
	if (Object.entries(payload).length > 0) {
		params = getPath(payload);
	}
	if (loader) {
		store.dispatch(showLoader());
	}
	// await checkToken()
	const data = await axiosClient.get(`${URL}` + params, { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
    .catch(error => (error))
	if (loader) {
		store.dispatch(hideLoader());
	}
	return data
}

function getPath(payload, url) {
	let iterations = Object.entries(payload).length;
	var pathArr = "?";
	if (url)
		url.includes("?") ? pathArr = '&' : pathArr = '?'
	for (let key in payload) {
		if (!--iterations) {
			pathArr += key + "=" + payload[key];
		} else {
			pathArr += key + "=" + payload[key] + "&";
		}
	}
	return pathArr;
}

// export async function DELETE(URL, loader = true) {
// 	// await checkToken()
// 	if (loader) {
// 		store.dispatch(showLoader());
// 		const data = await axiosClient.delete(`${URL}`,
// 			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } })
// 			.then(response => response.data).catch(error => httpStatusChecker(error));
// 		store.dispatch(hideLoader());
// 		return data
// 	} else {
// 		return await axiosClient.delete(`${URL}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin_access_token') } }).then(response => response.data).catch(error => httpStatusChecker(error));
// 	}
// }



async function checkToken() {
	var tokenTime = localStorage.getItem('admin_tokenTime');
	var difference = Math.floor(((Date.now() - tokenTime) / 1000) / 60);
	if (difference < 4) {
		return
	} else {
		const user = localStorage.getItem('admin_user')
		await axios.post(`${baseURL}/auth/login`, user).then(response => {
			localStorage.setItem('admin_access_token', response.data.access_token)
			localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()));
		})
		return
	}
}

function httpStatusChecker(error) {
	console.log(error);
	console.log(error.response.status === 401);
	if (!error.response) {
		toast.error("Ошибка: Нет подключение к интернету")
		return;
	}
	if (error.response.status === 400) {
		toast.error(error)
		return;
	}
	if (error.response.status === 401) {
		// checkToken()
		toast.error("Ошибка: Неверный логин или пароль")
		return;
	}
	if (error.response.status === 404) {
		toast.error("Ошибка: Не найдено")
		return;
	}
	if (error.response.status === 415) {
		toast.error("Ошибка: Не поддерживаемый тип")
		return;
	}
	if (error.response.status === 500) {
		toast.error("Системная ошибка:" + error)
		return;
	}
}

