// PaymentInfo.js

import React from "react";
import styles from '../styles/paymentInfo.module.css';

const PaymentInfo = ({ person, handlePay }) => {

    return (
        <div className={styles.container}>
            <h3>{person.name}</h3>
            <div className={styles.fieldContainer}>
                <label>Name on Card:</label>
                <input type="text" />
            </div>
            <div className={styles.fieldContainer}>
                <label>Card Number:</label>
                <input type="text" />
            </div>
            <div className={styles.fieldContainer}>
                <label>Exp. Date:</label>
                <input type="text" />
            </div>
            <div className={styles.fieldContainer}>
                <label>CCV:</label>
                <input type="text" />
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => handlePay(person)}>Pay with Card Details</button>
            </div>
        </div>
    );
};

export default PaymentInfo;
