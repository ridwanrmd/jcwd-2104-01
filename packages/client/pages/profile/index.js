import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import EditProfile from '../../components/EditProfile';
export default function lohe() {
  let user = {
    first_name: 'lohe',
    last_name: 'jamal',
    birthDate: '2022-09-05',
    phone: '081212',
    email: 'lalala@mail.com',
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { first_name, last_name, birthDate, phone, email } = user;
  const [first, setfirst] = useState(user);
  const onChangeHandler = (e) => {
    setfirst({ ...first, [e.target.name]: e.target.value });
  };
  const onSaveProfile = async (body) => {
    try {
      const res = await axiosInstance.patch('/users', body);
      alert(res.data.message);
      onClose();
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  };
  return (
    <>
      <Navbar />
      <Box
        height={'80vh'}
        marginInline={{ base: '2', md: '35%' }}
        shadow={{ base: 'unset', md: 'md' }}
      >
        <Box marginInline={'6'} borderBottom="1px solid #C2CED6">
          <Text
            mt="9"
            fontSize={{ base: 'md', md: 'md' }}
            fontWeight="medium"
            lineHeight={'6'}
          >
            Profile
          </Text>
          <HStack mt="4" mb="6">
            <Image
              rounded={'full'}
              width="20%"
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
            <VStack align={'start'} paddingStart="4">
              <Text
                fontSize={{ base: 'md', md: 'md' }}
                fontWeight="medium"
                lineHeight={'6'}
              >
                Jamal
              </Text>
              <Text
                fontSize={{ base: 'md', md: 'md' }}
                fontWeight="medium"
                lineHeight={'6'}
              >
                081219449920
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Box mt="2" mx="6" borderBottom="1px solid #C2CED6">
          <VStack mb="6">
            <Text
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
            >
              Yuk lengkapi data dulu
            </Text>
            <Text
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
              color="#878686"
            >
              Isi nama, profil dan alamat rumahmu
            </Text>
            <Button colorScheme={'twitter'} w="full" onClick={onOpen}>
              Lengkapi Profil
            </Button>
          </VStack>
        </Box>
      </Box>
      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        userProfile={first}
        onSaveProfile={onSaveProfile}
      />
      {/* <Box>
        <Input
          name="first_name"
          value={first.first_name}
          onChange={onChangeHandler}
        ></Input>
        <Input
          name="last_name"
          value={first.last_name}
          onChange={onChangeHandler}
        ></Input>
        <Input
          name="birthDate"
          value={first.birthDate}
          onChange={onChangeHandler}
          type="date"
          max="2017-01-01"
        ></Input>
        <Input
          name="phone"
          value={first.phone}
          onChange={onChangeHandler}
        ></Input>
        <Input
          name="email"
          value={first.email}
          onChange={onChangeHandler}
        ></Input>
        <Button onClick={onClickHandler}>Confirm</Button>
      </Box> */}
    </>
  );
}
