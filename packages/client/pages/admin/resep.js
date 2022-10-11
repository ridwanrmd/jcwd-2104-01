import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AdminResep from '../../components/AdminResep';
import AdminSidebar from '../../components/AdminSidebar';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';

export default function Resep(props) {
  const [prescription, setPrescription] = useState();
  const [productList, setProductList] = useState();
  const [productRacikanList, setProductRacikanList] = useState();
  const fetchPrescription = async () => {
    try {
      const getAllPrescription = await axiosInstance.get('/prescriptions/');
      setPrescription(getAllPrescription.data.data);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchPrescription();
  }, []);

  useEffect(() => {
    const getProductList = async () => {
      const result = await axiosInstance.get('/product/all');
      const racikan = await axiosInstance.get('/product/all?isRacikan=1');
      setProductList(result.data.result);
      setProductRacikanList(racikan.data.result);
    };
    getProductList();
  }, []);

  const renderPrescription = () => {
    return prescription?.map((data) => (
      <AdminResep
        productRacikanList={productRacikanList}
        productList={productList}
        data={data}
        fetchPrescription={fetchPrescription}
      />
    ));
  };

  return (
    <Flex justifyContent="center">
      <AdminSidebar user={props.user} />
      <Flex width="85%" direction="column">
        <Text
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="semibold"
          marginStart="20"
        >
          Resep dokter
        </Text>
        <Box w="90%" mx="auto">
          <Flex direction="column" w="100%" h="100%">
            {renderPrescription()}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });
    if (!session) return { redirect: { destination: '/' } };

    const { userId, accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
    if (!resGetUser.data.data.isAdmin)
      return { redirect: { destination: '/' } };

    return {
      props: {
        user: resGetUser.data.data,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
