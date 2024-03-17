// PayerConfirmation.js

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { getPerson } from '@/app/handleData';
import styles from '../../styles/paymentConfirmation.module.css';

const PayerConfirmation = () => {
  const router = useRouter();
  const { payerNumber } = router.query;

  const { loading: personLoading, error: personError, data: personData } = useQuery(getPerson, { variables: { id: payerNumber } });

  if (personLoading) return <p>Loading...</p>;
  if (personError) return <p>Error : {personError.message}</p>;

  const person = personData.person[0];

  return (
    <div className={styles.container}>
      <h1>{person.name}</h1>
      <br/>
      <p>Payment of ${person.amount} is completed, and the organizer has been notified.</p>
    </div>
  );
};

export default PayerConfirmation;
