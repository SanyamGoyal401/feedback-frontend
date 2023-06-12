import React from 'react';
import styles from './Error.module.css';
import { Link } from 'react-router-dom';



const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorHeading}>Oops!</h1>
      <p className={styles.errorText}>It seems you've accessed an invalid page.</p>
      <p className={styles.errorText}>Please go back or return to the home page.</p>
      <Link to='/' className={styles.errorLink}>Go to Home Page</Link>
    </div>
  );
};

export default Error;
