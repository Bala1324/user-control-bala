import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import VerifyUser from "./components/verifyUser/VerifyUser"
import Resetpassword from "./components/forgotPassword/ForgotPassword"
import VerifyOTP from "./components/verifyOTP/VerifyOTP"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect ,useState } from 'react';
//cart
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Provider from './shoping/src/Provider'


function App() {

  const [ user, setLoginUser] = useState({})

  useEffect(() =>{
    localStorage.getItem("myUser")
  }, [])
  const updateUser = (user) =>{
    localStorage.setItem("myUser", JSON.stringify(user));
    setLoginUser(user);
  }


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Provider updateUser={updateUser} /> : <Login updateUser={updateUser}/>
            }
          </Route>
          <Route path="/login">
            <Login updateUser={updateUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/verifyUser">
            <VerifyUser />
          </Route>
          <Route path="/verifyOtp">
            <VerifyOTP />
          </Route>
          <Route path="/resetpassword">
            <Resetpassword />
          </Route>
          <Route path = "/cart" component = {Provider}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
