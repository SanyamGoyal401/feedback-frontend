import React, { useContext } from 'react'
import styles from './Home.module.css';
import Header from '../../components/header/Header';
import Hero from '../../components/hero/Hero';
import Filter from '../../components/filter/Filter';
import Adder from '../../components/adder/Adder';
import Product from '../../components/product/Product.js';
import { ProductContext } from '../../contexts/ProductContext';

const Home = () => {

  const { product } = useContext(ProductContext);
  
  return (
    <>
      <div>
        <Header />
        <Hero />
      </div>
      <div className={styles.gridContainer}>
        <Filter />
        <Adder />
        <div className={styles.products}>
          {
            product.map((item, index) => (
              <Product
                key={index}
                category={item.category}
                comments={item.comments}
                desc={item.desc}
                _id={item._id}
                link={item.link}
                logo={item.logo}
                name={item.name}
                upvotes={item.upvotes}
              />
            ))
          }
        </div>

      </div>
    </>
  )
}

export default Home;