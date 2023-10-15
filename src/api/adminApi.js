import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import axios from "axios"
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../store/slices/loaderSlice';

const baseURL = "http://localhost:5000/api"

export const login = (email, password) => {
    return async dispatch => {
        try{
            dispatch(showLoader())
            const response = await axios.post(`${baseURL}/auth/login`, {
                email, 
                password
            } )
        
        dispatch(setUser(response.data.user))
        localStorage.setItem("token", response.data.token)
        const user = await axios.get(baseURL + '/auth', 
        { headers: {Authorization: 'Bearer ' + response.data.token} })
        dispatch(hideLoader())
        console.log("User",user)
        // for (let i = 0; i < user.data.authorities.length; i++) {
        //     if (user.data.authorities[i] === "ROLE_ADMIN") {
        //       localStorage.setItem('admin_access_token', response.access_token)
        //       localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()));
        //       localStorage.setItem('admin_user', JSON.stringify(data))
        //       history.push("/admin/main");
        //     }
        //     if (user.data.authorities[i] === "ROLE_OPERATOR") {
        //       data.role = "OPERATOR"
        //       localStorage.setItem('operator_user', JSON.stringify(data))
        //       localStorage.setItem('operator_tokenTime', JSON.stringify(new Date().getTime()))
        //       localStorage.setItem('operator_access_token', response.access_token)
        //       history.push("/operator/orders");
        //     }
        //   }
        // console.log(response.data)
        }catch(e){
        console.log(e.response.data.message)
        }
    }
}

// async function checkToken() {
// 	var tokenTime = localStorage.getItem('admin_tokenTime');
// 	var difference = Math.floor(((Date.now() - tokenTime) / 1000) / 60);
// 	if (difference < 4) {
// 		return
// 	} else {
// 		const user = localStorage.getItem('admin_user')
// 		await axiosClient.post('/auth/login', user).then(response => {
// 			localStorage.setItem('admin_access_token', response.data.access_token)
// 			localStorage.setItem("admin_tokenTime", JSON.stringify(new Date().getTime()));
// 		})
// 		return
// 	}
// }

// function httpStatusChecker(error) {
// 	console.log(error);
// 	console.log(error.response.status === 401);
// 	if (!error.response) {
// 		toast.error("Ошибка: Нет подключение к интернету")
// 		return;
// 	}
// 	if (error.response.status === 400) {
// 		toast.error(error.response.data.message)
// 		return;
// 	}
// 	if (error.response.status === 401) {
// 		checkToken()
// 		toast.error("Ошибка: Неверный логин или пароль")
// 		return;
// 	}
// 	if (error.response.status === 404) {
// 		toast.error("Ошибка: Не найдено")
// 		return;
// 	}
// 	if (error.response.status === 415) {
// 		toast.error("Ошибка: Не поддерживаемый тип")
// 		return;
// 	}
// 	if (error.response.status === 500) {
// 		toast.error("Системная ошибка:" + error.response.data.message)
// 		return;
// 	}
// }

