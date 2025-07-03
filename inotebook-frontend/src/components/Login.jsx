import React , {useState , useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { AlertContext } from "../context/alert/AlertContext"

function Login() {
    const {alert , showAlert } = useContext(AlertContext)
    let navigate = useNavigate();
    const [credentials , setCredentials] = useState({ email : "" , password : ""})
      const handleSubmit = async (e) =>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email , password: credentials.password }),
    });
    const json = await response.json();
    console.log(json)
    
    if(json.success){
        showAlert("success", "Logged in successfully");
        //save the authtoken redirect
        localStorage.setItem("token" , json.authtoken)
        navigate("/")
    }
    else{
        showAlert("danger", json.error || "logged in failed");
    }
    }

    const onChange = (e) =>{
        setCredentials({...credentials , [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
            <h2 className="text-center mb-4">Welcome Back!</h2>
            <p className="text-muted text-center">Login to access your notes securely</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label className="my-2" htmlFor="email">email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} placeholder="Enter email" onChange={onChange}
                    />
                </div>
                <div className="form-group my-2">
                    <label className="my-2" htmlFor="password">password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} placeholder="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
