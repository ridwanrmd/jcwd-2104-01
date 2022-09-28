import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import History from '../../components/HistoryTransaction/History';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import styles from './Product.module.css';
import ReactPaginate from 'react-paginate';

function Riwayat(props) {
  console.log(props.totalPage);
  const { data: session } = useSession();
  const [user, setUser] = useState(props.user);
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  // console.log(data);
  console.log(page);
  // useEffect(() => {
  //   setPage(router.query.page - 1);
  // }, []);
  const handlePageClick = (e) => {
    // let pages = e.selected + 1;
    setPage(e.selected);
    // const path = router.asPath;
    // let replaced = path.replace(`page=${router.query.page}`, `page=${pages}`);
    // router.push(replaced);
  };

  useEffect(() => {
    fetchTransaction();
  }, [selected]);

  const fetchTransaction = async () => {
    try {
      const session = await getSession();
      const userId = session.user.userId;
      const { accessToken } = session.user;
      //   console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      //   console.log(config);
      const res = await axiosInstance.get(
        `/transactions/historyTransaction?selected=${selected}&page=${page}`,
        config,
      );
      // console.log(res.data.data.restransactionStatus);
      setData(res.data.data.restransactionStatus);
      //   console.log(res.data.data.responseTransaction);
    } catch (error) {
      console.log(error);
    }
  };
  function selectedStatus() {
    return data?.map((x, i) => {
      // console.log(x);
      return <History data={x} selected={selected} />;
    });
  }
  return (
    <div>
      <div>
        <Navbar session={session} user={user} />
      </div>
      <Text fontSize={30} fontWeight={'semibold'} my={8} ml={20}>
        Riwayat Pemesanan
      </Text>
      <Tabs onChange={(i) => setSelected(i)} mx={90}>
        <TabList justifyContent={'center'}>
          <Tab>Semua</Tab>
          <Tab>Menuggu Pembayaran</Tab>
          <Tab>Menuggu Konfimasi Pembayaran</Tab>
          <Tab>Diproses</Tab>
          <Tab>DiBatalkan</Tab>
          <Tab>Dikirim</Tab>
          <Tab>Pesanan Dikonfirmasi</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
          <TabPanel>
            <div>{selectedStatus()}</div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ReactPaginate
        forcePage={page}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(props.totalPage / 12)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pagenum}
        previousLinkClassName={styles.pagenum}
        nextLinkClassName={styles.pagenum}
        activeLinkClassName={styles.active}
        disabledClassName={styles.disabled}
      />
    </div>
  );
}
export default Riwayat;
export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });
    // console.log(session);
    if (!session) return { redirect: { destination: '/' } };

    // console.log(session);

    const userId = session.user.userId;
    const accessToken = session.user.accessToken;
    // console.log(transactionId);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // console.log(config);
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
    // console.log(resGetUser.data.data);
    const restransactionUser = await axiosInstance.get(
      `/transactions/historyTransaction`,
      config,
      { params: context.query },
    );

    return {
      props: {
        user: resGetUser.data,
        transaction: restransactionUser.data,
        totalPage: restransactionUser.data.totalPage,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
