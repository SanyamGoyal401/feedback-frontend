import React, { useState, useEffect, useContext } from 'react'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import styles from './Adder.module.css';
import LoginModal from '../../modals/loginModal/LoginModal';
import { ProductContext } from '../../contexts/ProductContext'
import { SortContext } from '../../contexts/SortContext.js';
import { FilterContext } from '../../contexts/FilterContext.js';
import AddModal from '../../modals/addProduct/AddModal';
import { ModalContext } from '../../contexts/ModalContext';

const Adder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {isLogInModalOpen , setLoginModal} = useContext(ModalContext);
    const { product, fetchProducts } = useContext(ProductContext);
    const { sortBy, setSortBy } = useContext(SortContext);
    const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);
    const { filter } = useContext(FilterContext);
    const [sort, setSort] = useState('downvotes');
    const [isAddModalOpen, setIsAddOpen] = useState(false);

    const handleClick = () => {
        sort === 'upvotes' ? setSort('downvotes') : setSort('upvotes');
    }
    const addClick = ()=>{
        if(user){
            setIsAddOpen(true)
        }
        else{
            setLoginModal(true);
        }
    }
    useEffect(() => {

        //check view Port width
        const updateViewPortWidth = () => {
            setViewPortWidth(window.innerWidth);
        };
        //Event listener for changing viewPort width
        window.addEventListener('resize', updateViewPortWidth);
        updateViewPortWidth();

        setSortBy(sort);
        fetchProducts(filter, sortBy);
        return () => {
            window.removeEventListener('resize', updateViewPortWidth);
          }
    }, [sort]);

    return (

        <div className={styles.adder}>
            <LoginModal isLogInModalOpen={isLogInModalOpen} setLoginModal={setLoginModal}/>
            <AddModal isModalOpen = {isAddModalOpen} setIsOpen = {setIsAddOpen}/>
            <div className={styles.box}>
                <h4>{product.length + " Suggestions"}</h4>
                <div className={styles.sortPanel} onClick={handleClick}>
                    {
                        viewportWidth < 500 ? "" : "Sort by: "
                    }
                    <span className={styles.black}>{"upvotes"} {sort === 'upvotes' ? <BsArrowUpShort size={25} /> : <BsArrowDownShort size={25} />}</span>
                </div>
                <div className={styles.addbtn} onClick={addClick}>
                    + Add product
                </div>
            </div>
        </div>
    )
}

export default Adder