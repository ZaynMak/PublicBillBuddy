import React, { useState, useEffect } from 'react';
import styles from '../styles/organizerView.module.css';
import Loading from '@/components/loading';
import { useQuery } from "@apollo/client";
import { getBill } from '@/app/handleData';
import { useRouter } from 'next/navigation';


const OrganizerView = ({ billID }) => {

    const router = useRouter();

    const { loading: billLoading, error: billError, data: billData } = useQuery(getBill, { variables: { id: billID } });
    if (billLoading) return <p>Loading...</p>;
    if (billError) return <p>Error : {billError.message}</p>;

    const bill = billData.bill[0]

    const allPeople = [bill.organizer, ...bill.participants];

    const generateCard = () => {
        let allPaid = true;
        allPeople.forEach((item) => {
            if (!item.paid) {
                allPaid = false;
            }
        });

        if (allPaid) {
            router.push('/cardGeneration');
        } else {
            alert('Not everyone has paid yet');
        }
    }


    return (
        <div className={styles.contentContainer}>
            <h1>{bill.name}</h1>
            <p onClick={() => router.push(`/group-pay/${billID}`)}
                style={{ color: 'blue', textDecoration: "underline" }}> localhost:3000/group-pay/{billID} </p>
            <br />
            <Loading />
            <div className={styles.completed}>
                <h1>Ready to Pay</h1>
                {allPeople.map((item, index) => (
                    item.paid ? <p key={index}>{item.name}</p> : null
                ))}
            </div>
            <div className={styles.notCompleted}>
                <h1>Waiting for: </h1>
                {allPeople.map((item, index) => (
                    item.paid ? null : <p key={index}>{item.name}</p>
                ))}
            </div>
            <br />
            <button onClick={() => generateCard()}>Generate Payment Card</button>
        </div>
    );
};

export default OrganizerView;