import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import { api_origin } from '../../constraint';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Image,
  Show,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
  // console.log(product);
  const router = useRouter();
  const [show, setShow] = useState(false);

  const addToCart = async () => {
    const session = await getSession();
    const userId = session.user.userId;
    const { accessToken } = session.user;
    // console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const body = {
      quantity: 1,
      productId: product.productId,
    };
    await axiosInstance.post('/carts/add-to-cart', body, config);
  };
  const handleToggle = () => setShow(!show);
  const renderCategory = () => {
    return product.Categories.map((category) => {
      return (
        <Button
          key={category.categoryId}
          width={'max-content'}
          variant="link"
          fontSize={{ base: 'sm', md: 'md' }}
          color="#039177"
          onClick={() =>
            router.push(
              `/product?page=1&category=${category.category}&orderBy=price&order=ASC`,
            )
          }
        >
          {category.category}
        </Button>
      );
    });
  };
  return (
    <>
      <Navbar />
      <Show below="md">
        <Box
          marginBlock={'5'}
          marginInline="3"
          onClick={() => router.push('/product?page=1')}
        >
          <ArrowBackIcon fontSize={'4xl'} />
        </Box>
      </Show>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxWidth="100vw"
        mx={{ base: 'unseet', md: '20' }}
        marginBlock="5"
        marginInline="5"
      >
        <Flex
          flexGrow={'1'}
          justifyContent={'center'}
          flexShrink="0"
          paddingInline={'20'}
        >
          <Image
            src={api_origin + product.productImage}
            h="20vh"
            w={{ base: '50vw', md: '20vw' }}
            alt="gambar product"
          />
        </Flex>
        <Flex direction={'column'} flexGrow={'2'}>
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="medium">
            {product.productName}
          </Text>
          <Text
            fontSize="sm"
            fontWeight="normal"
          >{`Per ${product.unit} - Stock ${product.stock}`}</Text>
          <Text fontSize={{ base: 'md', md: 'xl' }}>Kategori : </Text>
          {renderCategory()}
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="medium"
          >{`Rp. ${product.price.toLocaleString('id')}`}</Text>
          {product.stock != 0 ? (
            <Button
              onClick={addToCart}
              w="max-content"
              variant={'solid'}
              colorScheme="twitter"
              marginBlock={'2'}
            >
              Tambah
            </Button>
          ) : (
            <Button
              w="max-content"
              variant={'solid'}
              isDisabled={true}
              marginBlock={'2'}
            >
              Tambah
            </Button>
          )}
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeigh="medium">
            Deskripsi :{' '}
          </Text>
          <Collapse startingHeight={22} in={show}>
            {product.desc}
          </Collapse>
          {product.desc.length > 40 && (
            <Box
              as="button"
              width={'fit-content'}
              size="sm"
              color={'#008DEB'}
              onClick={handleToggle}
              mt="1rem"
            >
              Show {show ? 'Less' : 'More'}
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const resGetProduct = await axiosInstance.get(
      `/product/${context.params.url}`,
    );
    return {
      props: {
        product: resGetProduct.data.result,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
