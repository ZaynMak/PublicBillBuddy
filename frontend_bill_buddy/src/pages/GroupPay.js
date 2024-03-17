import React, { useState } from "react";
import PaymentInfo from "./PaymentInfo";
import { getBill, updatePerson } from "@/app/handleData";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import styles from '../styles/groupPay.module.css';

const GroupPay = ({ billID }) => {
    const [person, setPerson] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [updatePersonMutation, { personData, personLoading, personError }] = useMutation(updatePerson);
    const router = useRouter();

    console.log(billID);

    const { loading: billLoading, error: billError, data: billData } = useQuery(getBill, { variables: { id: billID } });
    if (billLoading) return <p>Loading...</p>;
    if (billError) return <p>Error : {billError.message}</p>;

    const bill = billData.bill[0]

    const allPeople = [bill.organizer, ...bill.participants];

    const handlePay = (person) => {
        updatePersonMutation({ variables: { id: person.id } });
        router.push(`/payer-confirmation/${person.id}`);
    };

    return (
        showPayment ?
            <PaymentInfo person={person} handlePay={handlePay} />
            :
            <div className={styles.container}>
                <h1>{bill.name}</h1>
                <h2>${bill.amount}</h2>
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPeople.map((item) => (
                            <tr key={item.id} onClick={() => {
                                setPerson(item)
                                setShowPayment(true)
                            }}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td className={styles.checkboxInput}>
                                    <input
                                        disabled
                                        type="checkbox"
                                        checked={item.paid}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
};

export default GroupPay;
