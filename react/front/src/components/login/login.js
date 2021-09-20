import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ updateUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const [ userRegister, setuserRegister] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleChangeRegister = e => {
        const { name, value } = e.target
        setuserRegister({
            ...userRegister,
            [name]: value
        })
    }

    

    const login = () => {
        console.log(user);
        axios.post("http://localhost:4545/user/login", user)
        .then(res => {
            alert(res.data.message)
            updateUser(res.data.user)
            console.log("userDetails", res.data.user);
            history.push("/cart")
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:4545/user/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
<div>
<div class="login-wrap">
	<div class="login-html">
		<input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">Sign In</label>
		<input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Sign Up</label>
		<div class="login-form">
			<div class="sign-in-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input" name="email" value={user.email} onChange={handleChange}/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password"  name="password" value={user.password} onChange={handleChange}/>
				</div>
				<div class="group">
					<input id="check" type="checkbox" class="check" />
					<label for="check"><span class="icon"></span> Keep me Signed in</label>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign In"  onClick={login}/>
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<a href="#forgot">Forgot Password?</a>
				</div>
			</div>
			<div class="sign-up-htm">
				<div class="group">
					<label for="user" class="label">Username</label>
					<input id="user" type="text" class="input" name="name" value={userRegister.name} placeholder="Your Name" onChange={ handleChangeRegister }/>
				</div>
				<div class="group">
					<label for="pass" class="label">Password</label>
					<input id="pass" type="password" class="input" data-type="password" name="password" value={userRegister.password} placeholder="Your Password" onChange={ handleChangeRegister }/>
				</div>
				<div class="group">
					<label for="pass" class="label">Repeat Password</label>
					<input id="pass" type="password" class="input" data-type="password" name="reEnterPassword" value={userRegister.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChangeRegister }/>
				</div>
				<div class="group">
					<label for="pass" class="label">Email Address</label>
					<input id="pass" type="text" class="input"name="email" value={userRegister.email} placeholder="Your Email" onChange={ handleChangeRegister }/>
				</div>
				<div class="group">
					<input type="submit" class="button" value="Sign Up"  onClick={register} />
				</div>
				<div class="hr"></div>
				<div class="foot-lnk">
					<label for="tab-1">Already Member?</label>
				</div>
			</div>
		</div>
	</div>
</div>
            </div>
    )
}

export default Login

