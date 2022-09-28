import { Alert, Box, Button, Flex, Stack, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession, useSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import ListPTransaction from '../../components/CardTransaction/ListPTransaction';
import NextLink from 'next/link';

function Transaction(props) {
  const { data: session } = useSession();
  const { getTransactData } = props.transaction.data;

  const [transactionList, setTransactionList] = useState([]);
  const [statusTrans, setStatusTrans] = useState([]);
  const router = useRouter();
  // console.log(transactionList);
  const CancelOrder = async () => {
    try {
      const { transactionId } = router.query;
      console.log(transactionId);
      const cancel = await axiosInstance.post(
        `/transactions/cancelTransaction/${transactionId}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const confrimOrder = async () => {
    try {
      const { transactionId } = router.query;
      const updateStatus = await axiosInstance.post(
        `/transactions/confirmTransaction/${transactionId}`,
      );
      // console.log(updateStatus.data.data.updatedTransaction);
      setStatusTrans(updateStatus.data.data.updatedTransaction);
    } catch (error) {
      console.log(error);
    }
  };

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
    return (
      <ListPTransaction data={transactionList} statusTrans={statusTrans} />
    );
  };

  return (
    <>
      <Navbar session={session} user={props.user} />
      <Box
        display={['block', 'block', 'block']}
        // //   mx={[5, 0, 235]}
        // w={['40%', '40%', '40%']}
        mb={['100px', '200px', '59px']}
        justifyContent="center"
        mt="66px"
      >
        {renderListTransaction()}

        <Stack
          mt="56px"
          w="826px"
          direction={['column', 'column', 'row']}
          spacing="16px"
        >
          <Button w="405px" variant="main-outline">
            Kembali Ke Beranda
          </Button>
          <Flex
            direction={'row'}
            align="center"
            gap="1rem"
            mt="2rem"
            justifyContent={'center'}
            // width={'100%'}
          >
            <NextLink href={'/riwayat'}>
              <Button
                size={'xs'}
                colorScheme={'twitter'}
                onClick={confrimOrder}
              >
                Delivered Order
              </Button>
            </NextLink>
            <NextLink href={'/riwayat'}>
              <Button size={'xs'} colorScheme={'twitter'} onClick={CancelOrder}>
                Cancel Order
              </Button>
            </NextLink>
          </Flex>
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
