import Modal from 'react-modal'
import React, {useState, useEffect, useRef, useContext } from 'react';
import { FaUser, FaMobileAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './SignUpModal.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModal from '../loginModal/LoginModal';
import { ModalContext } from '../../contexts/ModalContext';


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

const SignUpModal = ({isSignUpModalOpen, setSignUpModal}) => {
    const{setLogIn} = useContext(AuthContext);
    const{isLogInModalOpen, setLoginModal} = useContext(ModalContext);
    const navigate = useNavigate();
    const errorRef = useRef();
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);

    const handleLoginClick = (e)=>{
        e.preventDefault();
        setSignUpModal(false);
        setLoginModal(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/users/', {
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
                setSignUpModal(false);
            }
            else {
                errorRef.current.textContent = 'Some error occured!';
            }
        }
        catch (error) {
            errorRef.current.textContent = 'Some error occured!';
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
            isOpen={isSignUpModalOpen}
            ariaHideApp = {false}
            onRequestClose={setSignUpModal(false)}
        >
            <div className={styles.signupModal}>
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
                        Already have an account? <span className={styles.link}onClick={handleLoginClick}>LogIn</span>
                    </div>
                    <LoginModal isLogInModalOpen={isLogInModalOpen} setLoginModal={setLoginModal}/>
                    <button className={styles.signupbtn} type="submit">Signup</button>
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

export default SignUpModal;