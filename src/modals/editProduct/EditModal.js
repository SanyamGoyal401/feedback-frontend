import Modal from 'react-modal'
import React, {useState, useEffect, useRef } from 'react';
import styles from './EditModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {ProductContext }from '../../contexts/ProductContext.js';

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

const EditModal = ({ isModalOpen, setIsOpen, _id, nameP, linkP, logoP, descP, categoryP }) => {
    const navigate = useNavigate();
    const wpassRef = useRef();
    const [name, setName] = useState(nameP);
    const [cat, setCat] = useState(categoryP.join(','));
    const [logo, setLogo] = useState(logoP);
    const [link, setLink] = useState(linkP);
    const [desc, setDesc] = useState(descP);
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);
    const {fetchProducts} = useContext(ProductContext);

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let category = cat.split(',');
        let user = JSON.parse(localStorage.getItem('user'));
        let token = user.token;
        try {
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/products/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id,  token, name, category, logo, link, desc,  }),
            });

            if (response.ok) {
                await response.json();
                navigate('/');
                fetchProducts();
                setIsOpen(false);
            }
            else {
                wpassRef.current.textContent = 'Some Error Occured!';
            }
        }
        catch (error) {
            console.log(error);
            wpassRef.current.textContent = 'Some Error Occured!';
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
            <div className={styles.addModal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3>Edit Product</h3>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Name of the company"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Category"
                            required
                            value={cat}
                            onChange={(e) => setCat(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Add logo url"
                            required
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Link of product"
                            required
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Add description"
                            required
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <span ref={wpassRef} className={styles.wpass}></span>
                    </div>
                    <button className={styles.addbtn} type="submit">+Add</button>
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

export default EditModal;







// Meditech India
// Health,Medicine
// https://www.meditech-india.com/gifs/logo.jpg
// https://www.meditech-india.com/
// Fast and secure delivery of medicines