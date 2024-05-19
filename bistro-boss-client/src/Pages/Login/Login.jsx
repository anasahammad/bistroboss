
import { useEffect, useRef, useState } from "react";
import authenticationImg from "../../assets/asset/others/authentication1.png"

import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state || "/"
    const { signIn} = useAuth()
    const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    }, [])
    const handleLogin = event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result=> {
            console.log(result.user);
            navigate(from)
        })
    }

    const handleCaptchaValidate = (e)=>{
        const user_captcha_value = e.target.value;
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
           return alert('Validation completed! Please login ')
        }
        else{
            setDisabled(true)
           return alert("Please try again")
        }
    }
    return (
        <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <img  className="w-[600px] h-[400px]" src={authenticationImg} alt="" />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input onBlur={handleCaptchaValidate} type="text" name="captcha" placeholder="type here" className="input input-bordered" required />
         
         
        </div>
        <div className="form-control mt-6">
          <button disabled={disabled} className="btn bg-[#d1a054b3] text-white">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Login;