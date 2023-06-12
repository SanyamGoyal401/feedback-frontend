import React, { useContext, useEffect, useState } from 'react'
import styles from './Filter.module.css';
import { ProductContext } from '../../contexts/ProductContext.js';
import { FilterContext } from '../../contexts/FilterContext.js';
import { SortContext } from '../../contexts/SortContext.js';


const Filter = () => {

  //context and states
  const {filter, setFilter} = useContext(FilterContext);
  const {sortBy} = useContext(SortContext);
  const {fetchProducts} = useContext(ProductContext);
  const [viewportWidth, setViewPortWidth] = useState(window.innerWidth);
  const [categories, setCategories] = useState([]);
  const [activeItems, setActiveItems] = useState([]);


  const handleClick = function (data, filter, setfilter, index, setActiveItems) {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(index)) {
        return prevActiveItems.filter((item) => item !== index);
      } else {
        return [...prevActiveItems, index];
      }
    });
    if (filter.includes(data)) {
      setfilter(filter.filter((item) => item !== data));
    }
    else {
      setfilter([...filter, data]);
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

    //fetch Categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://feedback-backend-lc12.onrender.com/api/products/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const categories = await response.json();
          setCategories(categories.categories);
        }
        else {
          setCategories([]);
        }
      }
      catch (error) {
      }
    };

    fetchCategories();
    fetchProducts(filter, sortBy);
    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    }
  }, [filter]);

  return (
    <div className={styles.filter}>
      <div className={styles.feedback}>
        {
          viewportWidth > 768 ? <div><h2><br /><br />Feedback</h2>
            <h4>Apply Filters:</h4></div> :
            <h4>Filters</h4>
        }
      </div>
      <div className={styles.filterContainer}>
        {
          categories.map((item, index) => (
            <div className={styles.filterOption + ` ${styles.index} ${activeItems.includes(index) ? styles.active : ''}`} key={index} onClick={() => handleClick(item, filter, setFilter, index, setActiveItems)}>{item}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Filter;