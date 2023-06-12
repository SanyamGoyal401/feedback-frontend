import Modal from 'react-modal'
import React, {useState, useEffect, useRef, useContext } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './LoginModal.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const LoginModal = ({ isModalOpen, setIsOpen }) => {
    const{setLogIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const wpassRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/users/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                setLogIn(true);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
                setIsOpen(false);
            }
            else {
                wpassRef.current.textContent = 'Wrong Password!';
            }
        }
        catch (error) {

        }
    };


    useEffect(() => {
        //check view Port width
        const updateViewPortWidth = () => {
          setViewPortWidth(window.innerWidth);
        };
        //Event listener for changing viewPort width
        window.addEventListener('resize', updateViewPortWidth);
        updateViewPortWidth();
    
        return () => {
          window.removeEventListener('resize', updateViewPortWidth);
        }
      }, []);

    return (
        <Modal
            style={customStyles}
            isOpen={isModalOpen}
            ariaHideApp = {false}
            onRequestClose={closeModal}
        >
            <div className={styles.loginModal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3>Log in to Continue</h3>
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
                    <button className={styles.loginbtn} type="submit">Login</button>
                </form>
                {
                    viewportWidth > 768 ? <div className={styles.feedbackHead}>
                        <h2>Feedback</h2>
                        <br/>
                        <h4>Add your product and rate other items..........</h4>
                    </div> : ''
                }
            </div>
        </Modal>
    )
}

export default LoginModal;