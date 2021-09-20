import React, {useState} from "react"
import "./forgotPassword.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Resetpassword = ({ setLoginUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        emailid: localStorage.getItem('verifyEmail'),
        password:"",
        email: ""

    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const resetPassword = () => {
        const { password, email } = user
        if(password ){
            if(password === email){
                axios.post("http://localhost:4545/user/resetPassword", user)
                .then( res => {
                    alert(res.data.message)
                    history.push("/login")
                })
            } else {
                alert("Password and Confirm password must bs same...!")
            }

        }else{
            alert("Please provide password")

        }
            
        
    }

    return (
        <div className="login">
            <h1>Reset Password</h1>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <input type="password" name="email" value={user.email} onChange={handleChange}  placeholder="Enter password again" ></input>
            <div className="button" onClick={resetPassword}>Reset password</div>
        </div>
    )
}

export default Resetpassword