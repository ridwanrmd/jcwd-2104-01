import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import ProductCart from '../../components/ProductCart/ProductCart';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import { ImLocation2 } from 'react-icons/im';
import ShippingAddress from '../../components/ShippingAddress';

function Cart(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCart } = props.cart.data;
  const [user, setUser] = useState(props.user);
  const [cartList, setCartList] = useState([]);
  const [changes, setChanges] = useState(0);
  const [harga, setHarga] = useState(0);
  const [modalSelect, setModalSelect] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  // console.log(selectedAddress);

  let name = `${user.first_name} ${user.last_name}`;
  const recipient = name.toUpperCase();

  const fetchCartList = async () => {
    const session = await getSession();
    const { accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const get = await axiosInstance.get('/carts/getCart', config);
      setCartList(get.data.data.getCart);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    const tempPrice = cartList.map((data) => {
      return data.product.price * data.quantity;
    });
    const grandTotal = tempPrice.reduce((x, y) => x + y, 0);
    return grandTotal;
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  useEffect(() => {
    fetchUserMainAddress();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const getUserAddresses = await axiosInstance.get(
        `/addresses/userAddress`,
        config,
      );
      // console.log(getUserAddresses.data.data);
      setUserAddresses(getUserAddresses.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserMainAddress = async () => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const getUserMainAddress = await axiosInstance.get(
        `/addresses/mainAddress`,
        config,
      );
      // console.log(getUserMainAddress.data.data);
      setSelectedAddress(getUserMainAddress.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCartList = () => {
    return getCart.map((data) => {
      return (
        <ProductCart
          key={data.cartId}
          props={props}
          cartId={data.cartId}
          productImage={data.product.productImage}
          productName={data.product.productName}
          desc={data.product.desc}
          price={data.product.price}
          quantity={data.quantity}
          unit={data.product.unit}
          stock={data.product.stock}
          fetchCartList={fetchCartList}
          Cartlist={cartList}
          setChanges={setChanges}
          totalPrice={totalPrice}
        />
      );
    });
  };

  return (
    <>
      <Navbar />
      <Grid
        mb="40px"
        templateColumns="repeat(6,1fr)"
        paddingX={[0, 6, 6]}
        gap={4}
      >
        <GridItem colSpan={[0, 6, 6]} padding={2}>
          <Text variant="title" display={['none', 'flex']}>
            Daftar Pesanan
          </Text>
        </GridItem>
        <GridItem colSpan={[6, 4, 4]}>
          <Box
            paddingX={4}
            paddingY={[0, 4]}
            boxShadow={[
              'none',
              '0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08);',
            ]}
            borderRadius="8px"
          >
            <Grid
              templateColumns="repeat(5, 1fr)"
              gap={2}
              borderBottom="1px solid #C2CED6"
            >
              <GridItem paddingBottom={3} colSpan={3} paddingX={2}>
                <HStack>
                  <ImLocation2 />
                  <Text colorScheme="twitter" as="b">
                    Alamat Pengiriman
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
            <HStack borderBottom="1px solid #C2CED6">
              <VStack pl={2} width={650} py={2} mr={1} align={'start'}>
                <Text alignItems="left" as="b">
                  {recipient}
                </Text>
                <Text>{user.phone}</Text>
                <Text>{selectedAddress?.address.toUpperCase()}</Text>
                <Text>
                  {`${selectedAddress?.city_name}, ${selectedAddress?.province}`}
                </Text>
              </VStack>
              <Box
                pl="2"
                boxShadow={[
                  'none',
                  '0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08);',
                ]}
                borderRadius="8px"
                border="1px"
                color="blue.400"
              >
                <VStack align={'start'} pr={2}>
                  <Text>Kurir : JNE, Regular</Text>
                  <Text>Berat : 1 kg</Text>
                  <Text>Biaya : Rp 30.000</Text>
                </VStack>
              </Box>
            </HStack>

            <HStack px={2} py={3} spacing={2} borderBottom="6px solid #C2CED6">
              <Button
                colorScheme="twitter"
                variant="outline"
                onClick={() => setModalSelect(true)}
              >
                Pilih Alamat Lain
                <ShippingAddress
                  isOpen={modalSelect}
                  onClose={() => setModalSelect(false)}
                  userAddresses={userAddresses}
                  setSelectedAddress={setSelectedAddress}
                  fetchUserAddresses={fetchUserAddresses}
                />
              </Button>

              <Button colorScheme="twitter" variant="outline">
                Pilih Metode Pengiriman
              </Button>
            </HStack>
            <Grid
              borderBottom="6px solid #C2CED6"
              templateColumns="repeat(5, 1fr)"
              gap={6}
              pl={2}
              py={3}
            >
              ceritanya cart list ceritanya cart list ceritanya cart list
              ceritanya cart list ceritanya cart list ceritanya cart list
              ceritanya cart list
              {renderCartList()}
            </Grid>
          </Box>
        </GridItem>
        <GridItem colSpan={[6, 2, 2]}>
          <Box
            boxShadow={[
              'none',
              '0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08);',
            ]}
            borderRadius="8px"
            display={['none', 'grid', 'grid']}
          >
            <Box padding={5}>
              <Stack spacing={4}>
                <Box>
                  <Text variant="subtitle">Total</Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    variant="subtitle-bold"
                    color="#737A8D"
                    fontWeight="400"
                  >
                    Grand total
                  </Text>
                  <Text variant="subtitle-bold" color="#737A8D">
                    Rp. {totalPrice()}
                  </Text>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text variant="subtitle-bold">Total</Text>
                  <Text variant="subtitle-bold">Rp. {totalPrice()}</Text>
                </Box>
                <Button
                  mt={3}
                  variant="outline"
                  colorScheme="twitter"
                  //   onClick={() => buyItems()
                  //   disabled={selectedItem.length === 0}
                >
                  Bayar
                </Button>
              </Stack>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default Cart;

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
    const resGetCartUser = await axiosInstance.get('/carts/getCart', config);

    return {
      props: {
        cart: resGetCartUser.data,
        user: resGetUser.data.data,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
