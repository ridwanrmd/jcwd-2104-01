import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosInstance from '../src/config/api';
import NextLink from 'next/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Text,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
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
  const [sawPassword, setSawPassword] = useState(false);
  const [sawConfirmPassword, setSawConfirmPassword] = useState(false);

  const router = useRouter();
  const toast = useToast();

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
      
      const res = await axiosInstance.post('/users/register', body);
      toast({
        title: 'Account created.',
        description: res.data.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // alert(res.data.message);
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
        justifyContent={'center'}
        alignItems={'center'}
        bgGradient="linear-gradient(153.41deg, #008DEB 0.81%, rgba(0, 141, 235, 0.56) 49.89%, rgba(0, 141, 235, 0.28) 95.87%)"
      >
        <Image
          alt={'Medbox Image'}
          objectFit={'cover'}
          position="absolute"
          width="136px"
          height="32px"
          left="56px"
          top="56px"
          src="/vector.svg"
        />

        <Image
          alt={'Register Image'}
          objectFit={'cover'}
          width="386.78px"
          height="430.84px"
          left="394.57px"
          top="253.48px"
          src="/login.png"
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading align={'center'} fontSize={'2xl'}>
            Daftar Medbox
          </Heading>
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
            <FormLabel>Last Name</FormLabel>
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
            <InputGroup>
              <Input
                type={sawPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                variant="filled"
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setSawPassword((sawPassword) => !sawPassword)}
                >
                  {sawPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={sawConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                placeholder="Confirm password"
                variant="filled"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setSawConfirmPassword(
                      (sawConfirmPassword) => !sawConfirmPassword,
                    )
                  }
                >
                  {sawConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={1}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            ></Stack>
            <Stack pt={'0.2'}>
              <Text pb={'1'} align={'center'}>
                Sudah memiliki akun?{' '}
                <NextLink href="/login">
                  <Link color={'red.400'}>Sign In</Link>
                </NextLink>
              </Text>
            </Stack>
            <Button
              colorScheme={'twitter'}
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
              Buat akun
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Register;
