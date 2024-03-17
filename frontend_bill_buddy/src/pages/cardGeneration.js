import React from 'react';
import styles from '../styles/card.module.css';

const CardGenerate = () => {
  return (
    <div className={styles.cardContainer}>
      <h1>Your One-Time Payment Card is Generated</h1>
      <img className={styles.cardImage} src="/mock_card.jpg" alt="Image of credit card details" />
    </div>
  );
};

export default CardGenerate;
