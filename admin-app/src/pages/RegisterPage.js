import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const fullName = useRef();
    const phoneNumber = useRef();
    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });
    const [errorMessage, setErrorMessage] = useState();

    const postData = async (
        userName,
        password,
        email,
        fullName,
        phoneNumber
    ) => {
        const response = await fetch("http://localhost:5000/add-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                email: email,
                fullName: fullName,
                phoneNumber: phoneNumber,
                isAdmin: true,
            }),
        });
        return response;
    };

    const loginHandle = () => {
        navigate("/login");
    };

    const submitHandle = (event) => {
        event.preventDefault();
        let isSubmit = true;
        if (
            !userName.current.value ||
            !password.current.value ||
            !email.current.value
        ) {
            window.alert("Please fill in field marked  *");
            isSubmit = false;
            return;
        }
        if (!email.current.value.includes("@")) {
            window.alert("Please fill in a valid email!");
            isSubmit = false;
            return;
        }
        if (isSubmit) {
            postData(
                userName.current.value,
                password.current.value,
                email.current.value,
                fullName.current.value,
                phoneNumber.current.value
            )
                .then((response) => {
                    if (!response.ok) {
                        response.json().then((data) => {
                            setErrorMessage(data.message);
                        });
                    } else {
                        response.json().then((data) => {
                            setErrorMessage(null);
                            userName.current.value = "";
                            password.current.value = "";
                            email.current.value = "";
                            fullName.current.value = "";
                            phoneNumber.current.value = "";
                            navigate("/login");
                        });
                    }
                })
                .catch((err) => {
                    console.log("err:", err);
                });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Booking Register Page</title>
            </Helmet>
            {!auth && (
                <div className={styles.contain}>
                    <h2>Sign Up</h2>
                    {errorMessage && (
                        <p style={{ textAlign: "center", color: "red" }}>
                            {errorMessage}
                        </p>
                    )}
                    <form className={styles.form}>
                        <div className={styles.inform}>
                            <label>Username (*)</label>
                            <input type="text" ref={userName} />
                        </div>
                        <div className={styles.inform}>
                            <label>Password (*)</label>
                            <input type="password" ref={password} />
                        </div>
                        <div className={styles.inform}>
                            <label>Email (*)</label>
                            <input type="email" ref={email} />
                        </div>
                        <div className={styles.inform}>
                            <label>Full name</label>
                            <input type="text" ref={fullName} />
                        </div>
                        <div className={styles.inform}>
                            <label>Phone number</label>
                            <input type="number" ref={phoneNumber} />
                        </div>
                        <button type="submit" onClick={submitHandle}>
                            Create Account
                        </button>
                    </form>
                    <div className={styles.button2}>
                        <p>or</p>
                        <button type="button" onClick={loginHandle}>
                            Login here
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

export default RegisterPage;
