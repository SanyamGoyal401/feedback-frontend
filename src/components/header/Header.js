import React, { useContext } from 'react'
import styles from './Header.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';



const Header = () => {
    const {login, setLogIn} = useContext(AuthContext);
    const navigate = useNavigate();

    let handleLogout = async function () {
        try {
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                await response.json();
                setLogIn(false);
                localStorage.removeItem('user');
                navigate('/');
            }
            else { }
        }
        catch (error) {
        }
    }
    
    return (
        <header className={styles.header}>
            <h2>Feedback</h2>
            {login ? <div className={styles.user}>
                <h5 className={styles.element} onClick={handleLogout}>Log out</h5>
                <h5 className={styles.element}>Hello!</h5>
                <FaUserCircle className={styles.element} size={20} />
            </div> :
                <div className={styles.user}>
                    <Link className={styles.element} to='/login'><h5 >Log In</h5></Link>
                    <Link className={styles.element} to='/signup'><h5 >Sign up</h5></Link>
                </div>}
        </header>
    )
}

export default Header