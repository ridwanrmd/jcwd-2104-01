import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

function ChangePassword(props) {
  // console.log({ props });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const { userId } = props;

  // console.log(token);
  if (!props) {
    return router.replace('/');
  }

  // useEffect(() => {
  //   if (newPassword !== ConfirmPassword) {
  //     return setErrorMessage("Password Doesn't Match");
  //   } else {
  //     return;
  //   }
  // }, [newPassword, ConfirmPassword]);

  const body = {
    oldPassword,
    newPassword,
    ConfirmPassword,
    userId,
  };

  const onClick = async () => {
    const response = await axiosInstance.patch(`/user/updatePassword/`, body);
    if (response.data.code == 400) {
      setErrorMessage(response.data.message);
    } else {
      router.replace('/');
      // console.log(response.error.message);
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.700">
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={'white'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel>Current Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="current password"
              _placeholder={{ color: 'gray.500' }}
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Text color={'red.400'} fontSize={'lg'} fontWeight={'semibold'}>
            {errorMessage}
          </Text>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={onClick}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ChangePassword;

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
    const resGetUser = await axiosInstance.get(`/user/${userId}`, config);
    // console.log(resGetUser.data.data);

    return {
      props: resGetUser.data.data,
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
