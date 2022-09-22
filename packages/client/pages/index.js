import Head from 'next/head';
import axios from '../src/config/api';
import { useEffect, useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import axiosInstance from '../src/config/api';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import Prescription from '../components/Prescription';
import { useRouter } from 'next/router';

export default function Home(props) {
  const router = useRouter();
  // this is just testing api connection, possibly could be remove
  const [checkApi, setCheckApi] = useState('');
  const fetchApi = async () => {
    try {
      const result = await axios.get();
      setCheckApi(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  console.log(checkApi);
  // end of testing api
  const { data: session } = useSession();

  const renderCard = () => {
    return props.product.map((products) => {
      return <ProductCard key={products.productId} product={products} />;
    });
  };

  return (
    <Box>
      <Head>
        <title>Medbox</title>
        <meta name="description" content="Best Medical Store in da world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar session={session} user={props.user} />

      <Banner />

      <Prescription />

      <Category />

      <Box mx={{ base: '5', md: '10%' }} marginTop="2vh">
        <Flex mt="9" justifyContent={'space-between'}>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            fontWeight={{ base: 'normal', md: 'semibold' }}
            lineHeight={'7'}
          >
            Rekomendasi Obat & Vitamin
          </Text>
          <Button
            variant="link"
            colorScheme="twitter"
            onClick={() => router.push('/product?page=1')}
          >
            Lihat Semua
          </Button>
        </Flex>
        <Flex
          justifyContent={'space-between'}
          overflow={{ base: 'scroll', md: 'auto' }}
        >
          {renderCard()}
        </Flex>
      </Box>
    </Box>
  );
}
export async function getServerSideProps(context) {
  try {
    const resGetProduct = await axiosInstance.get(`/product`, {
      params: { pageSize: 5 },
    });

    const session = await getSession({ req: context.req });
    if (session) {
      try {
        const { userId, accessToken } = session.user;
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const resGetUser = await axiosInstance.get(`/users/${userId}`, config);

        return {
          props: {
            product: resGetProduct.data.result,
            totalPage: resGetProduct.data.totalPage,
            user: resGetUser.data.data,
          },
        };
      } catch (error) {
        const errorMessage = error.message;
        return { props: { errorMessage } };
      }
    }
    return {
      props: {
        product: resGetProduct.data.result,
        totalPage: resGetProduct.data.totalPage,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
