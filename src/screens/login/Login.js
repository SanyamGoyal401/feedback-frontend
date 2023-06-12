import React, {useState, useRef, useContext} from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {

    const{setLogIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const wpassRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/users/auth',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({email, password}),
            });

            if(response.ok){
                const user = await response.json();
                setLogIn(true);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            }
            else{
                wpassRef.current.textContent = 'Wrong Password!';
            }
        }
        catch(error){
            
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <h1 className={styles.heading}>Feedback</h1>
                <h4 className={styles.heading}>Add your products and give us your valuable feedback</h4>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                            <FaLock size={20} />
                        </span>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <span ref={wpassRef} className={styles.wpass}></span>
                    </div>
                    <div className={styles.signup}>
                        Don't have an account? <Link className={styles.link} to='/signup'>Sign up</Link>
                    </div>
                    <button className={styles.loginbtn}  type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
