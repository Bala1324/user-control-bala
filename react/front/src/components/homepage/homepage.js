import React from "react"
import "./homepage.css"

const Homepage = ({updateUser}) => {
//    const [ user, setUser] = useState(res.body.users)
 

    return (
        <div className="homepage">
            <h1>Hello </h1>
            <div className="button" onClick={() => updateUser({})} >Logout</div>
        </div>
    )
}

export default Homepage