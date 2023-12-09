import axios from "axios";
const API_URL = 'http://localhost:8080/api/user';

class AuthService {
  login(email,password){
    return axios.post(API_URL + '/login', {email, password})
  }
  logout(){
    // 登入時有設置web json token,如果沒有等同登出
    localStorage.removeItem('user')
  }
  register(username, email, password, role){
    return axios.post(API_URL + '/register',{
      username, email, password, role
    })
  }
  getCurrentUser(){
    console.log(localStorage.getItem('user'))
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()