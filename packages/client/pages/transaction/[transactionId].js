import { Box, Button, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import Navbar from '../../components/Navbar';

function Transaction(props) {
  console.log(props);
  return (
    <>
      <Navbar />
      <Box
        display={['block', 'block', 'block']}
        //   mx={[5, 0, 235]}
        w={['40%', '60%', '40%']}
        mb={['100px', '200px', '359px']}
        justifyContent="center"
        mt="66px"
      >
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
          <Button w="405px" variant="main">
            Check Status Pembayaran
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
      props: { transaction: restransactionUser.data },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
