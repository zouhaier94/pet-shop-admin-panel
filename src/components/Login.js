import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

export default function Login() {

    const [formData, setFormData] = React.useState({ email: "", password: "" })
    const navigate = useNavigate()

    const { dispatch } = React.useContext(AuthContext)

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)


        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                console.log(user)
                console.log("logged In")
                navigate("/home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }


    return (
        <div className="login--div1">
            <div className="login--div2">
                <div className="login--div3">
                    <h4 className="text-center text-3xl">Admin Panel</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <input
                                type="email"
                                className="login--email"
                                placeholder="Email"
                                onChange={handleChange}
                                name="email"
                            />
                            <input
                                type="password"
                                className="login--password"
                                placeholder="Password"
                                onChange={handleChange}
                                name="password"
                            />
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="login--submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
