import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import ProductCart from '../../components/ProductCart/ProductCart';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import { api_origin } from '../../constraint';
import { ImLocation2 } from 'react-icons/im';

function Cart(props) {
  // console.log(props);
  // 0: {cartId: 1, productId: 2, quantity: 2, product: {…}}
  //1: {cartId: 2, productId: 3, quantity: 1, product: {…}}
  const { getCart } = props.cart.data;
  const [cartList, setCartList] = useState([]);
  const [changes, setChanges] = useState(0);
  const [harga, setHarga] = useState(0);

  const fetchCartList = async () => {
    const session = await getSession();
    const { accessToken } = session.user;
    // console.log(accessToken);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const get = await axiosInstance.get('/carts/getCart', config);
      // console.log(get);
      setCartList(get.data.data.getCart);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    const tempPrice = cartList.map((data) => {
      // console.log(data);
      return data.product.price * data.quantity;
    });
    const grandTotal = tempPrice.reduce((x, y) => x + y, 0);
    // setHarga(grandTotal);
    return grandTotal;
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  // console.log(getCart);
  const renderCartList = () => {
    return getCart.map((data) => {
      // console.log(data.cartId);

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
            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
              <GridItem colSpan={5} paddingX={2} alignItems="Center">
                <Button
                  leftIcon={<ImLocation2 />}
                  colorScheme="twitter"
                  variant="outline"
                >
                  Address
                </Button>
              </GridItem>

              <GridItem colSpan={5} padding={2} alignItems="Center">
                <Divider />
              </GridItem>

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
                    {/* Rp. {harga?.toLocaleString('id')} */}
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
                  <Text variant="subtitle-bold">
                    {/* Rp. {harga?.toLocaleString('id')} */}
                    Rp. {totalPrice()}
                  </Text>
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
    // console.log(session);
    if (!session) return { redirect: { destination: '/' } };

    // console.log(session);
    const userId = session.user.userId;
    const accessToken = session.user.accessToken;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // console.log(config);
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
    // console.log(resGetUser.data.data);
    const resGetCartUser = await axiosInstance.get('/carts/getCart', config);

    return {
      props: { cart: resGetCartUser.data },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
