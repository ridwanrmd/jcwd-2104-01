import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { api_origin } from '../../constraint';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import EditProfile from '../../components/EditProfile';
import AddAddress from '../../components/AddAddress';
import EditAddress from '../../components/EditAddress';

export default function Profile(props) {
  // console.log(props.addresses);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(props.user);
  // const [userAddresses, setUserAddresses] = useState(props.addresses);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const renderAddress = () => {
    return props.addresses.map((address) => (
      <Box
        mb="4"
        paddingY={2}
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        width={440}
        key={address.addressId}
      >
        <HStack>
          <Box>
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
              width={255}
            >
              {address.address}
            </Text>
            <Text
              marginStart={2}
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
              width={250}
            >
              {address.city_name}, {address.province}
            </Text>
          </Box>
          <Spacer />
          <HStack paddingEnd={2}>
            <Button
              variant="ghost"
              size="sm"
              colorScheme={'twitter'}
              onClick={() => setModalEdit(true)}
            >
              Rubah
              <EditAddress
                isOpen={modalEdit}
                onClose={() => setModalEdit(false)}
                address={address.address}
                addressId={address.addressId}
              />
            </Button>
            <Button variant="ghost" size="sm" colorScheme={'twitter'}>
              Hapus
            </Button>
          </HStack>
        </HStack>
      </Box>
    ));
  };

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
        marginBlock="6"
        height={'83vh'}
        width={'80vh'}
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
          <HStack mt="4" mb="1" pb="2">
            <Image
              objectFit={'cover'}
              rounded={'full'}
              width="80px"
              height="80px"
              alt="gambar profile"
              src={api_origin + user.image}
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
          <VStack mb="3">
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
              Isi nama dan profilmu
            </Text>
            <Button colorScheme={'twitter'} w="full" onClick={onOpen}>
              Lengkapi Profil
              <EditProfile
                isOpen={isOpen}
                onClose={onClose}
                userProfile={user}
                onSaveProfile={onSaveProfile}
              />
            </Button>
          </VStack>
        </Box>
        <Box mt="2" mx="6" borderBottom="1px solid #C2CED6">
          <Text
            mt="5"
            mb="2"
            fontSize={{ base: 'md', md: 'md' }}
            fontWeight="medium"
            lineHeight={'6'}
            as="u"
          >
            Alamat
          </Text>
          <Box overflow="scroll" height="24.5vh">
            {renderAddress()}
          </Box>
        </Box>
        <Box mb="4" mt="5" mx="6">
          <Button
            colorScheme={'twitter'}
            w="full"
            onClick={() => setModalAdd(true)}
          >
            Tambahkan Alamat
            <AddAddress
              isOpen={modalAdd}
              onClose={() => setModalAdd(false)}
              renderAddress={renderAddress}
            />
          </Button>
        </Box>
      </Box>
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

    const resGetAddress = await axiosInstance.get(
      `/addresses/userAddress`,
      config,
    );
    // console.log(resGetAddress.data.data);

    return {
      props: {
        user: resGetUser.data.data,
        addresses: resGetAddress.data.data,
        session,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
