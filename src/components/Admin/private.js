import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import SideBar from "./SideBar.jsx"

const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
}

const isOperatorAuthenticated = () => {
    const token = localStorage.getItem('operator_access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  function checkUserRole(rest) {
    if (rest.path.includes('/admin')) {
      if (JSON.parse(localStorage.getItem('admin_user')).role === 'ADMIN') {
        return "ADMIN"
      }
  }
    if (rest.path.includes('/operator')) {
      if (JSON.parse(localStorage.getItem('operator_user')).role === 'OPERATOR') {
        return "OPERATOR"
      }
  }
    if (JSON.parse(localStorage.getItem('user')).role === 'USER') {
      return "USER"
    }
  }

const isAdminAuthenticated = () => {
    // const token = localStorage.getItem('admin_access_token');
    const token = true
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  
 export const AdminPrivateRoute = () => {
    let token = "efnjknfekjn"
    return (
      token ? <SideBar> <Outlet/> </SideBar>  : <Navigate to="/admin/login" />
    )
 }

// export function AdminPrivateRoute({ component: Component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           isAdminAuthenticated() ? (
//             rest.path.includes('/admin')
//             //  && checkUserRole(rest) === "ADMIN"
//               ?
//               <Component {...props}/>
//               :
//               <Navigate
//                 to={{
//                   pathname: "/admin/login"
//                 }}
//               />
//           ) 
//           : (
//             <Navigate
//               to={{
//                 pathname: "/admin/login"
//               }}
//             />
//           )
//         }
//       />
//     );
//   }