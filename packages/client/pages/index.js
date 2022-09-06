import Head from 'next/head';
import axios from '../src/config/api';
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import Prescription from '../components/Prescription';

export default function Home() {
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

  return (
    <Box>
      <Head>
        <title>Medbox</title>
        <meta name="description" content="Best Medical Store in da world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Banner />

      <Prescription />

      <Category />

      {/* Start Rekomendasi Obat */}
      <Box mx={{ base: '5', md: '10%' }} marginTop="2vh">
        <Flex mt="9" justifyContent={'space-between'}>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            fontWeight={{ base: 'normal', md: 'semibold' }}
            lineHeight={'7'}
          >
            Rekomendasi Obat & Vitamin
          </Text>
          <Link
            color={'twitter.500'}
            _hover={{
              textDecoration: 'none',
            }}
            href={'#'}
          >
            Lihat Semua
          </Link>
        </Flex>
        <Flex
          justifyContent={'space-between'}
          overflow={{ base: 'scroll', md: 'auto' }}
          sx={{
            // for Chrome, Safari and Opera
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            // for IE, Edge and Firefox
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {/* Render Product Here */}
          {/* Max 5 */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Flex>
      </Box>
      {/* End Rekomendasi Obat */}
    </Box>
  );
}
