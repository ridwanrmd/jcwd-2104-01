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
import { api_origin } from '../../constraint';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import EditProfile from '../../components/EditProfile';
export default function Profile(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(props.user);

  const onSaveProfile = async (body) => {
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const updateProfile = {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        gender: body.gender,
        birthDate: body.birthDate,
      };

      if (body.profileImages) {
        const gambar = body.profileImages;
        const data = new FormData();
        const fileName = Date.now() + gambar.name;
        data.append('name', fileName);
        data.append('gambar', gambar);

        updateProfile.image = `/public/user/${fileName}`;
        try {
          await axiosInstance.post('/users/upload', data, config);
        } catch (error) {
          return alert(error.response.data.message);
        }
      }

      try {
        const res = await axiosInstance.patch('/users', updateProfile);
        alert(res.data.message);
      } catch (error) {
        return alert(error.response.data.message);
      }

      const resGetUser = await axiosInstance.get(
        `/users/${user.userId}`,
        config,
      );
      setUser(resGetUser.data.data);
      onClose();
    } catch (error) {
      console.log({ error });
      return alert(error.response.data.message);
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
              objectFit={'cover'}
              rounded={'full'}
              width="80px"
              height="80px"
              alt="gambar profile"
              // src={api_origin + user.image}
            />
            <VStack align={'start'} paddingStart="4">
              <Text
                fontSize={{ base: 'md', md: 'md' }}
                fontWeight="medium"
                lineHeight={'6'}
              >
                {`${user.first_name} ${user.last_name}`}
              </Text>
              <Text
                fontSize={{ base: 'md', md: 'md' }}
                fontWeight="medium"
                lineHeight={'6'}
              >
                {user.phone}
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
        userProfile={user}
        onSaveProfile={onSaveProfile}
      />
    </>
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
    return {
      props: { user: resGetUser.data.data },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
