import { IoIosArrowUp, IoMdSend } from 'react-icons/io'
import { BsDot } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import { MdModeComment } from 'react-icons/md';
import styles from './Product.module.css';
import { useContext, useEffect, useState } from 'react';
import EditModal from '../../modals/editProduct/EditModal';
import { ProductContext } from '../../contexts/ProductContext';
import { AuthContext } from '../../contexts/AuthContext';

const Product = ({ _id, name, category, desc, link, logo, upvotes, comments }) => {

    const { fetchProducts } = useContext(ProductContext);
    const {login} = useContext(AuthContext);
    const [vote, setVote] = useState(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [isEditModalOpen, setIsEditOpen] = useState(false);

    //function to open EditModal
    const addClick = () => {
        setIsEditOpen(true);
    }

    //Collapsible component
    const toggle = () => {
        setOpen(!open);
    };

    //Toggle Upvote or downvote
    const toggleVote = async (e) => {
        e.preventDefault();
        if (vote === 'upvote') {
            setVote('downvote');
        }
        else {
            setVote('upvote');
        }
    }

    //Upvote when vote value changes
    useEffect(() => {
        const upvote = async () => {
            console.log(vote);
            try {
                const response = await fetch(`https://feedback-backend-lc12.onrender.com/api/products/${vote}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id }),
                });

                if (response.ok) {
                    await response.json();
                    fetchProducts();
                }
                else {
                }
            }
            catch (error) {
            }
        }
        if (vote) {
            upvote();
        }

    }, [vote]);

    //make request to add comment 
    const sendComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://feedback-backend-lc12.onrender.com/api/products/comment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id, comment }),
            });

            if (response.ok) {
                await response.json();
                setComment('');
                fetchProducts();
            }
            else {
            }
        }
        catch (error) {
        }
    }

    return (
        <>
            <div className={styles.product}>
                <div className={styles.icon}>
                    <img src={logo} alt={name} className={styles.img} />
                </div>
                <div className={styles.name}>
                    <h4>{name}</h4>
                </div>
                <div className={styles.upvotes} onClick={toggleVote}>
                    <div><IoIosArrowUp size={20} /></div>
                    <div>{upvotes}</div>
                </div>
                <div className={styles.desc}>{desc}</div>
                <div className={styles.categories}>
                    {category.map((item, index) => (<div key={index} className={styles.category}>{item}</div>))}
                </div>
                <div className={styles.commentbtn} onClick={toggle}>
                    <div>
                        <FaRegCommentDots size={20} />
                    </div>
                    <div> Comment</div>
                </div>
                {(login) ? <div className={styles.editbtn} onClick={addClick}>Edit</div> : ''}
                <EditModal
                    isModalOpen={isEditModalOpen}
                    setIsOpen={setIsEditOpen}
                    _id={_id}
                    nameP={name}
                    descP={desc}
                    linkP={link}
                    logoP={logo}
                    categoryP={category}
                />
                <div className={styles.comment}>
                    <div>{comments.length}</div>
                    <div><MdModeComment size={20} /></div>
                </div>
                {
                    open && <div className={styles.commentSection}>
                        <div className={styles.commentinput}>
                            <input className={styles.input} type='text' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)}>
                            </input>
                            <div><IoMdSend size={30} className={styles.sendbtn} onClick={sendComment} /></div>
                        </div>
                        <div className={styles.commentbox}>
                            {comments.map((item, index) => (<div className={styles.commenttxt} key={index}><BsDot size={40} className={styles.dotIcon} /> <div className={styles.commentTxt}>{item}</div> </div>))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Product;