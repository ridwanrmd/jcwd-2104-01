import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosInstance from '../src/config/api';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';

function Register() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterProcess, setisRegisterProcess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  // redirect to home if already login
  const { data: session } = useSession();
  if (session) router.replace('/');

  const onRegisterClick = async () => {
    try {
      setisRegisterProcess(true);
      const body = {
        first_name,
        last_name,
        email,
        phone,
        password,
        confirmPassword,
      };
      console.log(body);
      await axiosInstance.post('/users/register', body);
      console.log('');
    } catch (error) {
      console.log(error);
      if (error.response) return alert(error.response.data.message);
      alert(error.message);
    } finally {
      setisRegisterProcess(false);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        background={
          'linear-gradient(153.41deg, #008DEB 0.81%, rgba(0, 141, 235, 0.56) 49.89%, rgba(0, 141, 235, 0.28) 95.87%);'
        }
        boxShadow={'2xl'}
      >
        <Image
          alt={'Register Image'}
          objectFit={'cover'}
          src={'login/orang.png'}
          zIndex={'popover'}
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign up</Heading>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              type="name"
              value={first_name}
              placeholder="First Name"
              variant="filled"
              onChange={(event) => setFirst_name(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name Name</FormLabel>
            <Input
              type="name"
              value={last_name}
              placeholder="Last Name"
              variant="filled"
              onChange={(event) => setLast_name(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              placeholder="Email"
              variant="filled"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="string"
              value={phone}
              placeholder="Phone Number"
              variant="filled"
              onChange={(event) => setPhone(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              variant="filled"
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              variant="filled"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            ></Stack>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              disabled={disabled}
              onClick={() => {
                onRegisterClick();
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                }, 5000);
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Register;
