import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  Text,
  ModalBody,
  FormControl,
  VStack,
  HStack,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import EditAddress from '../../components/EditAddress';
import AddAddress from '../../components/AddAddress';

function ShippingAddress(props) {
  const {
    isOpen,
    onClose,
    setSelectedAddress,
    userAddresses,
    fetchUserAddresses,
    useDisclosure,
  } = props;
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  // const [Addresses, setAddresses] = useState(userAddresses);
  // const [selectedAddress, setSelectedAddress] = useState();
  // console.log(userAddresses);
  const toast = useToast();

  const onUpdateisMain = async (addressId) => {
    try {
      const res = await axiosInstance.patch(`/addresses/isMain/${addressId}`);

      fetchUserAddresses();
    } catch (error) {
      alert('error cuy');
    }
  };

  const renderAddress = () => {
    return userAddresses.map((address) => (
      <Box
        my="2"
        mx="2"
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        width={480}
        key={address.addressId}
      >
        <HStack>
          <Box width={350} align="start">
            {address.isMain == 1 && (
              <Text
                ms="2"
                fontFamily="inherit"
                color="red"
                fontSize={{ base: 'sm', md: 'sm' }}
              >
                Alamat Utama
              </Text>
            )}
            <Text
              marginStart={2}
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
            >
              {address.address}
            </Text>
            <Text
              marginStart={2}
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
              // width={250}
            >
              {address.city_name}, {address.province}
            </Text>
            <HStack>
              <Button
                variant="ghost"
                size="xs"
                colorScheme={'twitter'}
                onClick={() => {
                  setModalEdit(true);
                }}
              >
                Ubah Alamat
                <EditAddress
                  isOpen={modalEdit}
                  onClose={() => setModalEdit(false)}
                  fetchUserAddresses={fetchUserAddresses}
                  // addressId={currentAddress?.addressId}
                  // address={currentAddress?.address}
                  // province_name={currentAddress?.province}
                  // city={currentAddress?.city_name}
                />
              </Button>
              {address.isMain == 0 && (
                <Button
                  colorScheme={'twitter'}
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    onUpdateisMain(address.addressId);
                  }}
                >
                  <Text size="xs">Jadikan Alamat Utama</Text>
                </Button>
              )}
            </HStack>
          </Box>
          <Box>
            <Button
              value={address}
              colorScheme="twitter"
              size="sm"
              onClick={() => {
                setSelectedAddress(address);
                onClose();
              }}
            >
              Pilih Alamat
            </Button>
          </Box>
        </HStack>
      </Box>
    ));
  };
  return (
    <Modal isOpen={isOpen} size={'xl'} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pilih Alamat Pengiriman</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl px={2} py={3}>
            <Box
              border="1px"
              borderRadius="3px"
              overflow="scroll"
              height="35vh"
              mb={6}
            >
              {renderAddress()}
            </Box>
            <Box align="center">
              <Button
                colorScheme="twitter"
                onClick={() => {
                  setModalAdd(true);
                }}
              >
                Tambah Alamat Pengiriman
                <AddAddress
                  isOpen={modalAdd}
                  onClose={() => setModalAdd(false)}
                  fetchUserAddresses={fetchUserAddresses}
                />
              </Button>
            </Box>
          </FormControl>
          {/* <ModalFooter>
            <Button
              // isDisabled={disabled}
              colorScheme="twitter"
              // mr={3}
              align="center"
              // onClick={() => onAddAddress()}
            >
              Tambah Alamat Pengiriman
            </Button>
          </ModalFooter> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ShippingAddress;
