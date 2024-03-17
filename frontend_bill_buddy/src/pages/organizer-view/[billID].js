import { useRouter } from 'next/router';
// import { getBill } from '../../api/bill';
import OrganizerView from '../organizerView';

const OrganizerViewPage = () => {
  const router = useRouter();
  const billID = router.query.billID;

  return (
    <>
      {billID ? <OrganizerView billID={billID} /> : <p>Cannot Find Bill</p>}
    </>
  );
};

export default OrganizerViewPage;
