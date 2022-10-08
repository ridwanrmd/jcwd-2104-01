import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import History from '../../components/HistoryTransaction/History';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import styles from './Product.module.css';
import ReactPaginate from 'react-paginate';

function Riwayat(props) {
  const { data: session } = useSession();
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  useEffect(() => {
    fetchTransaction();
  }, [selected]);

  const fetchTransaction = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const res = await axiosInstance.get(
        `/transactions/historyTransaction?selected=${selected}&page=${page}`,
        config,
      );
      setData(res.data.data.restransactionStatus);
    } catch (error) {
      console.log(error);
    }
  };
  function selectedStatus() {
    return data?.map((x, i) => {
      return <History data={x} selected={selected} key={i} />;
    });
  }
  return (
    <div>
      <div>
        <Navbar session={session} user={props.user} />
      </div>
      <Text fontSize={30} fontWeight={'semibold'} my={8} ml={20}>
        Riwayat Pemesanan
      </Text>
      <Tabs onChange={(i) => setSelected(i)} mx={90}>
        <TabList justifyContent={'center'}>
          <Tab>Semua</Tab>
          <Tab>Menunggu Pembayaran</Tab>
          <Tab>Menunggu Konfimasi Pembayaran</Tab>
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
    if (!session) return { redirect: { destination: '/' } };

    const userId = session.user.userId;
    const accessToken = session.user.accessToken;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
    const restransactionUser = await axiosInstance.get(
      `/transactions/historyTransaction`,
      config,
      { params: context.query },
    );

    return {
      props: {
        user: resGetUser.data.data,
        transaction: restransactionUser.data,
        totalPage: restransactionUser.data.totalPage,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
