import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const password = useRef();
    const email = useRef();
    const [errorMessage, setErrorMessage] = useState(null);
    const userData = useSelector((state) => {
        return state.authSlice.userData;
    });
    const dispatch = useDispatch();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });

    const saveToLocalStorage = (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const postLoginData = async (email, password) => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        return response;
    };

    const loginHandle = () => {
        navigate("/register");
    };

    const submitHandle = (event) => {
        event.preventDefault();

        let isSubmit = true;
        if (!password.current.value || !email.current.value) {
            setErrorMessage("Please fill in field marked * !");
            isSubmit = false;
            return;
        }
        if (!email.current.value.includes("@")) {
            setErrorMessage("Please fill in a valid email!");
            isSubmit = false;
            return;
        }
        if (isSubmit) {
            postLoginData(email.current.value, password.current.value)
                .then((response) => {
                    if (!response.ok) {
                        response.json().then((data) => {
                            setErrorMessage(
                                data.message || "Cannot check login now!"
                            );
                            dispatch(authSliceActions.authUpdate(false));
                            dispatch(authSliceActions.userDataUpdate(null));
                        });
                    } else {
                        response.json().then((data) => {
                            setErrorMessage(null);
                            dispatch(authSliceActions.authUpdate(true));
                            saveToLocalStorage(data);
                            dispatch(authSliceActions.userDataUpdate(data));
                            password.current.value = "";
                            email.current.value = "";
                            navigate("/");
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Booking Login Page</title>
            </Helmet>
            {!auth && (
                <div className={styles.contain}>
                    <h2>Login</h2>
                    {errorMessage && (
                        <p style={{ textAlign: "center" }}>{errorMessage}</p>
                    )}
                    <form className={styles.form}>
                        <div className={styles.inform}>
                            <label>Email (*)</label>
                            <input type="email" ref={email} />
                        </div>
                        <div className={styles.inform}>
                            <label>Password (*)</label>
                            <input type="password" ref={password} />
                        </div>

                        <button type="submit" onClick={submitHandle}>
                            Login
                        </button>
                    </form>
                    <div className={styles.button2}>
                        <p>or</p>
                        <button type="button" onClick={loginHandle}>
                            Create Account
                        </button>
                    </div>
                </div>
            )}
            {auth && (
                <p style={{ textAlign: "center", marginTop: "3em" }}>
                    You are in login now!
                </p>
            )}
        </div>
    );
};

export default LoginPage;
