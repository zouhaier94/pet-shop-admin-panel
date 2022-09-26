import React from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"


export default function Home() {

    const { dispatch } = React.useContext(AuthContext)

    const handleLogout = () => {
        //localStorage.clear() 
        dispatch({ type: "LOGOUT" })
    }


    return (
        <>
            <div className="nav">
                <ul className="nav--items">
                    <Link to="/add"><div className="li--style">ADD</div></Link>
                    <Link to="/delete"><div className="li--style">DELETE</div></Link>
                    <Link to="/messages"><div className="li--style">MESSAGES</div></Link>
                    <Link to="/">
                        <div onClick={handleLogout} className="li--style--logout">LOGOUT</div>
                    </Link>
                </ul>
            </div>
        </>
    );
}
