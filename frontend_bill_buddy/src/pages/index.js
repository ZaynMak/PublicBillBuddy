import React, { useState, useCallback } from 'react';
import styles from '../styles/form.module.css';
import { createPerson, createBill } from '@/app/handleData';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [totalAmount, setTotalAmount] = useState('');
    const [numOfPeople, setNumOfPeople] = useState('');
    const [payers, setPayers] = useState([]);
    const [payerNames, setPayerNames] = useState([]);
    const [splitEvenly, setSplitEvenly] = useState(false);
    const [groupName, setGroupName] = useState('');
    const router = useRouter();

    const handleNumOfPeopleChange = useCallback((e) => {
        const numOfPeople = parseInt(e.target.value);
        if (!isNaN(numOfPeople) && numOfPeople >= 0) {
            setNumOfPeople(numOfPeople);
            const defaultPayerNames = Array(numOfPeople).fill('').map((_, index) => index === 0 ? 'Organizer' : `Payer #${index}`);
            setPayerNames(defaultPayerNames);
            setPayers(Array(numOfPeople).fill(''));
        } else {
            console.error('Invalid number of people');
        }
    }, []);

    const handleNameChange = useCallback((index, e) => {
        const newPayerNames = [...payerNames];
        newPayerNames[index] = e.target.value;
        setPayerNames(newPayerNames);
    }, [payerNames]);

    const handleAmountChange = useCallback((index, e) => {
        const newPayers = [...payers];
        newPayers[index] = e.target.value;
        setPayers(newPayers);
    }, [payers]);

    const handleSplitEvenlyChange = useCallback((e) => {
        setSplitEvenly(e.target.checked);
        if (e.target.checked) {
            const amountPerPerson = totalAmount / numOfPeople;
            const remainder = Math.floor(totalAmount * 100 % numOfPeople);
            const newPayers = Array(numOfPeople).fill(amountPerPerson.toFixed(2));
            for (let i = 0; i < remainder; i++) {
                newPayers[i] = (parseFloat(newPayers[i]) + 0.01).toFixed(2);
            }
            setPayers(newPayers);
        } else {
            setPayers(Array(numOfPeople).fill(''));
        }
    }, [totalAmount, numOfPeople]);

    const CreateGroup = () => {
        const [createPersonMutation, { personData, personLoading, personError }] = useMutation(createPerson);
        const [createBillMutation, { bill, billLoading, billError }] = useMutation(createBill);

        const handleSubmit = useCallback(async () => {
            let personIDs = [];
            for (let i = 0; i < numOfPeople; i++) {
                const name = payerNames[i];
                const amount = payers[i];
                await createPersonMutation({ variables: { name: name, amount: amount } }).then(({data}) => {
                    console.log("data", data);
                    personIDs.push(data.createPerson.person.id)
                })
                while (personLoading) {
                    // pass
                }
                if (personError) {
                    return;
                }
            }

            const billName = groupName;
            const billAmount = totalAmount.toString()
            createBillMutation({ variables: { name: billName, amount: billAmount, organizer: personIDs[0], participants: personIDs.slice(1) } }).then(({data}) => {
                console.log("data", data);
                router.push(`/organizer-view/${data.createBill.bill.id}`);
            })
            while (billLoading) {
                // pass
            }
            if (billError) {
                return;
            }
        }, [createPersonMutation, personLoading, personError, createBillMutation, billLoading, billError, router, groupName, totalAmount, numOfPeople, payerNames, payers]);

        if (personError) {
            return <p>Error: {personError.message}</p>;
        }
        if (billError) {
            return <p>Error: {billError.message}</p>;
        }

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className={styles.formItem}>
                    <label>Group Name:</label>
                    <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </div>
                <div className={styles.formItem}>
                    <label>Total Amount:</label>
                    <input type="number" step="0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                </div>
                <div className={styles.formItem}>
                    <label># of People Splitting:</label>
                    <input type="number" value={numOfPeople} onChange={handleNumOfPeopleChange} />
                </div>
                {payerNames.map((payerName, index) => (
                <div className={styles.dynamicInputContainer} key={index}>
                    <label>
                    <input
                        type="text"
                        value={payerName}
                        onChange={(e) => handleNameChange(index, e)}
                    />
                    </label>
                    <input
                    type="text"
                    value={payers[index]}
                    onChange={(e) => handleAmountChange(index, e)}
                    />
                </div>
                ))}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={splitEvenly}
                            onChange={handleSplitEvenlyChange}
                        />
                        Split Evenly
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <button id="submit-btn" type="submit">
                        Create Group
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Bill Buddy Form</h1>
            <CreateGroup />
        </div>
    );
};

export default Page;
