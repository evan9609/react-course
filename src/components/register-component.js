import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('');
  let [message, setMessage] = useState('');

  const handleValue = (e,fn) => {
    fn(e.target.value)
  }

  const handleRegister = () => {
    AuthService.register(username,email,password,role).then(()=>{
      window.alert('註冊成功,您現在將被導向登入頁面')
      navigate('/login')
    }).catch((e)=>{
      setMessage(e.response.data)
    })

  }

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={(e)=>{handleValue(e,setUsername)}}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={(e)=>{handleValue(e,setEmail)}}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={(e)=>{handleValue(e,setPassword)}}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">身份：</label>
          <input
            onChange={(e)=>{handleValue(e,setRole)}}
            type="text"
            className="form-control"
            placeholder="只能填入student或是instructor這兩個選項其一"
            name="role"
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleRegister}>
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
