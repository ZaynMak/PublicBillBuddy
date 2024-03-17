import { useRouter } from 'next/router';
// import { getBill } from '../../api/bill';
import GroupPay from '../GroupPay';

const GroupPage = () => {
  const router = useRouter();
  const billID = router.query.billId;

  return (
    <>
      {billID ? <GroupPay billID={billID} /> : <p>Cannot Find Bill</p>}
    </>
  );
};

export default GroupPage;
