import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import { ImLocation2 } from 'react-icons/im';
import ShippingAddress from '../../components/ShippingAddress';
import ShippingMethod from '../../components/ShippingMethod';
import AddAddressNew from '../../components/AddAddressNew';

function ShippingCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedAddress,
    selectedShipper,
    selectedShippingCost,
    setSelectedAddress,
    setSelectedShipper,
    setSelectedShippingCost,
  } = props;
  const [userAddresses, setUserAddresses] = useState(props.addresses);
  const [modalKurir, setModalKurir] = useState(false);
  const [modalAdd, setModalAdd] = useState();

  const name = `${props.user.first_name} ${props.user.last_name}`;

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
      setSelectedAddress(getUserMainAddress.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOngkirBox = () => {
    const splitCost = selectedShippingCost.split(',');
    const row1 = `${selectedShipper.toUpperCase()}, ${splitCost[0]}`;
    const row3 = `Rp ${Number(splitCost[1]).toLocaleString('id')}`;
    const row4 = `${splitCost[2]} hari`;
    const row4Post = `${splitCost[2]}`;
    return (
      <Box
        padding="2"
        boxShadow={[
          'none',
          '0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08);',
        ]}
        borderRadius="8px"
        border="1px"
        color="blackAlpha.800"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
      >
        <Grid pb="2px" templateColumns="repeat(3, 1fr)" gap={1}>
          <GridItem colSpan={1} w="100%">
            Kurir
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <HStack>
              <Text pr="5px">:</Text>
              <Text>{row1}</Text>
            </HStack>
          </GridItem>
        </Grid>
        <Grid pb="2px" templateColumns="repeat(3, 1fr)" gap={1}>
          <GridItem colSpan={1} w="100%">
            Berat
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <HStack>
              <Text pr="5px">:</Text>
              <Text>1 Kg</Text>
            </HStack>
          </GridItem>
        </Grid>
        <Grid pb="2px" templateColumns="repeat(3, 1fr)" gap={1}>
          <GridItem colSpan={1} w="100%">
            Biaya
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <HStack>
              <Text pr="5px">:</Text>
              <Text>{row3}</Text>
            </HStack>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          <GridItem colSpan={1} w="100%">
            Estimasi
          </GridItem>
          <GridItem colSpan={2} w="100%">
            <HStack>
              <Text pr="5px">:</Text>
              {selectedShipper == 'pos' ? (
                <Text>{row4Post}</Text>
              ) : (
                <Text>{row4}</Text>
              )}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <VStack pt={5} align="start">
        <HStack pb={1} width="100%" borderBottom="2px solid #C2CED6">
          <ImLocation2 />
          <Text colorScheme="twitter" as="b">
            Alamat Pengiriman
          </Text>
        </HStack>
        <HStack width="100%" borderBottom="2px solid #C2CED6">
          <VStack pl={2} width="70%" pb={2} mr={2} align={'start'}>
            <Text alignItems="left" as="b">
              {name.toUpperCase()}
            </Text>
            <Text>{props.user.phone}</Text>
            {!selectedAddress ? (
              <Text color="red.500">Anda belum memiliki alamat pengiriman</Text>
            ) : (
              <>
                <Text>{selectedAddress.address}</Text>
                <Text>{`${selectedAddress.city_name}, ${selectedAddress.province}`}</Text>
              </>
            )}
          </VStack>
          {selectedShippingCost && renderOngkirBox()}
        </HStack>
        <HStack px={2} pt={3} spacing={2}>
          {!selectedAddress ? (
            <Button
              colorScheme="twitter"
              variant="outline"
              onClick={() => setModalAdd(true)}
            >
              + Tambah Alamat
              <AddAddressNew
                isOpen={modalAdd}
                onClose={() => setModalAdd(false)}
                fetchUserAddresses={fetchUserAddresses}
                fetchUserMainAddress={fetchUserMainAddress}
              />
            </Button>
          ) : (
            <>
              <Button colorScheme="twitter" variant="outline" onClick={onOpen}>
                Pilih Alamat Lain
                <ShippingAddress
                  isOpen={isOpen}
                  onClose={onClose}
                  userAddresses={userAddresses}
                  setSelectedAddress={setSelectedAddress}
                  setSelectedShipper={setSelectedShipper}
                  setSelectedShippingCost={setSelectedShippingCost}
                  fetchUserAddresses={fetchUserAddresses}
                  setSelectedAlamat={props.setSelectedAlamat}
                />
              </Button>
              <Button
                colorScheme="twitter"
                variant="outline"
                onClick={() => setModalKurir(true)}
              >
                Pilih Metode Pengiriman
                <ShippingMethod
                  isOpen={modalKurir}
                  onClose={() => setModalKurir(false)}
                  destination={selectedAddress?.city_id}
                  setSelectedShippingCost={setSelectedShippingCost}
                  setSelectedShipper={setSelectedShipper}
                />
              </Button>
            </>
          )}
          {/*  */}
        </HStack>
      </VStack>
    </Box>
  );
}

export default ShippingCard;
