import React, {useContext, useRef, useState } from 'react';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock } from 'react-icons/fa';
import styles from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const Signup = () => {
    const {setLogIn} = useContext(AuthContext);
    const errorRef = useRef();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/users/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({name, email, mobile, password}),
            });

            if(response.ok){
                const user = await response.json();
                setLogIn(true);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            }
            else if(response.status === 400){
                errorRef.current.textContent = "User Exists already";
            }
            else{
                errorRef.current.textContent = "Some error Occurred";
            }
        }
        catch(error){
            
        }

    };

    return (
        <div className={styles.container}>
            <div className={styles.signup}>
                <h1 className={styles.heading}>Feedback</h1>
                <h4 className={styles.heading}>Add your products and give us your valuable feedback</h4>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>
                            <FaUser size={20} />
                        </span>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>
                            <FaEnvelope size={20} />
                        </span>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>
                            <FaMobileAlt size={20} />
                        </span>
                        <input
                            className={styles.input}
                            type="tel"
                            placeholder="Mobile"
                            value={mobile}
                            required
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.icon}>
                            <FaLock size={20} />
                        </span>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <span ref={errorRef} className={styles.error}></span>
                    </div>
                    <div className={styles.login}>
                        Already have an account? <Link className={styles.link} to='/login'>Login</Link>
                    </div>
                    <button className={styles.signupbtn} type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
