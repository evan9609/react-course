import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({currentUser, setCurrentUser}) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [message, setMessage] = useState([])

  const handleValue = (e,fn) => {
    fn(e.target.value)
  }

  const handleLogin = async() => {
    try{
      await AuthService.login(email,password).then((res)=>{
      console.log(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      window.alert('登入成功,您現在將被重新導向到個人資料頁面');
      setCurrentUser(res.data)
      navigate('/profile')
      })
    }catch(e){
      setMessage(e.response.data)
    }
  }
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {Boolean(message.length) && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={(e)=>{handleValue(e,setEmail)}}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e)=>{handleValue(e,setPassword)}}
          />
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleLogin}>
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
