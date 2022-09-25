import { Box, Button, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession, useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import ListPTransaction from '../../components/CardTransaction/ListPTransaction';
function Transaction(props) {
  const { data: session } = useSession();
  const { getTransactData } = props.transaction.data;

  const [transactionList, setTransactionList] = useState([]);
  const router = useRouter();

  // console.log(router.query.transactionId);
  useEffect(() => {
    fetchTransactionList();
  }, []);

  const fetchTransactionList = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const { transactionId } = router.query;
      console.log(transactionId);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const get = await axiosInstance.get(
        `/transactions/dataTransaction/${transactionId}`,
        config,
      );
      // console.log(get.data.data.getTransactData);
      setTransactionList(get.data.data.getTransactData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(transactionList);
  const renderListTransaction = () => {
    return <ListPTransaction data={transactionList} />;
  };

  return (
    <>
      <Navbar session={session} user={props.user} />
      <Box
        display={['block', 'block', 'block']}
        // //   mx={[5, 0, 235]}
        // w={['40%', '40%', '40%']}
        mb={['100px', '200px', '359px']}
        justifyContent="center"
        mt="66px"
      >
        {renderListTransaction()}
        {/* <MenungguPembayaranComWT />
          <MenungguPembayaranComRinOr />
          <MenungguPembayaranComMetPeb transaction={transaction} /> */}
        <Stack
          mt="56px"
          w="826px"
          direction={['column', 'column', 'row']}
          spacing="16px"
        >
          <Button w="405px" variant="main-outline">
            Kembali Ke Beranda
          </Button>
        </Stack>
      </Box>
    </>
  );
}
export default Transaction;

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });
    // console.log(session);
    if (!session) return { redirect: { destination: '/' } };

    // console.log(session);

    const userId = session.user.userId;
    const accessToken = session.user.accessToken;
    const { transactionId } = context.params;
    // console.log(transactionId);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // console.log(config);
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
    // console.log(resGetUser.data.data);
    const restransactionUser = await axiosInstance.get(
      `/transactions/dataTransaction/${transactionId}`,
      config,
    );

    return {
      props: { user: resGetUser.data, transaction: restransactionUser.data },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
