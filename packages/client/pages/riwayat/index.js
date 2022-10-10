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
  Select,
  HStack,
  Input,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import History from '../../components/HistoryTransaction/History';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../src/config/api';
import styles from './Product.module.css';
import ReactPaginate from 'react-paginate';
import { api_origin } from '../../constraint';

function Riwayat(props) {
  // console.log(props.totalPage);
  const { data: session } = useSession();
  const [user, setUser] = useState(props.user);
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState('transactionId');
  const [order, setOrder] = useState('ASC');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [formState, setFormState] = useState({ transactionId: '' });
  console.log(formState);

  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  // console.log(sorting);

  const btnSearchHandler = () => {
    // console.log('1');
    const filteredTransactions = data.filter((transaction) => {
      // console.log(transaction);
      return transaction.transactionId
        .toString()
        .includes(formState.transactionId);
    });
    // console.log(filteredTransactions);
    setFilteredTransactions(filteredTransactions);
  };
  const onHandleChange = (event) => {
    setFormState({ [event.target.name]: event.target.value });
  };

  useEffect(() => {
    fetchTransaction();
  }, [selected, page, sorting, order]);

  const onClickOrder = (e) => {
    // console.log(e.target.value);
    let splitting = e.target.value.split(' ');
    // console.log(splitting);
    setSorting(splitting[0]);
    setOrder(splitting[1]);
    // setSorting(e.target.value);
  };

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
        `/transactions/historyTransaction?selected=${selected}&page=${
          page + 1
        }&sorting=${sorting}&order=${order}`,
        config,
      );
      // console.log(res.data.data.restransactionStatus);
      setData(res.data.data.restransactionStatus);
      setFilteredTransactions(res.data.data.restransactionStatus);
      //   console.log(res.data.data.responseTransaction);
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
      <Flex>
        <Select
          value={sorting}
          placeholder="Urutkan"
          onChange={onClickOrder}
          w="fit-content"
          my={8}
          ml={20}
        >
          <option value="transactionId ASC">Transaction Id ASC</option>
          <option value="transactionId DESC">Transaction Id DESC</option>
          <option value="createdAt ASC">Date ASC</option>
          <option value="createdAt DESC">Date DESC</option>
        </Select>
        <HStack>
          <Input
            name="transactionId"
            type="text"
            placeholder="No. TransactionId"
            fontSize={14}
            fontWeight={400}
            onChange={onHandleChange}
            width={200}
            ml={1}
          />
          <HStack>
            <Button
              fontSize={14}
              colorScheme="twitter"
              onClick={btnSearchHandler}
            >
              Cari
            </Button>
          </HStack>
        </HStack>
      </Flex>

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
        {data.length ? (
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
        ) : (
          <VStack marginTop={105}>
            <Image
              src="/empty-cart-png-transparent-png"
              width={250}
              height={250}
            />
            <Text paddingTop={6} fontSize={18}>
              Tidak Ada Transaksi
            </Text>
          </VStack>
        )}
      </Tabs>
      <ReactPaginate
        forcePage={page}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(props.totalPage / 4)}
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
        user: resGetUser.data.data,
        transaction: restransactionUser.data.data.restransactionStatus,
        totalPage: restransactionUser.data.data.totalPage,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
