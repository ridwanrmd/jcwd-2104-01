import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Box,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoginProcess, setIsLoginProcess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const { data: session } = useSession();
  if (session) router.replace('/');

  const onLoginClick = async () => {
    setIsLoginProcess(true);
    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    // console.log(response);
    if (email == '') {
      setIsLoginProcess(false);
      return setErrorEmail('Email field is empty');
    }
    if (password == '') {
      setIsLoginProcess(false);
      return setErrorMessage('Password field is empty');
    }
    if (!response.error) {
      router.replace('/');
    } else {
      setErrorMessage(response.error);
    }
    setIsLoginProcess(false);
  };

  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          bgGradient="linear-gradient(153.41deg, #008DEB 0.81%, rgba(0, 141, 235, 0.56) 49.89%, rgba(0, 141, 235, 0.28) 95.87%)"
        >
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            position="absolute"
            width="136px"
            height="32px"
            left="56px"
            top="56px"
            src="/vector.svg"
          />

          <Image
            alt={'Login Image'}
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
            <Heading fontSize={'2xl'}>Masuk ke MedBox</Heading>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <Text color={'red.400'} fontSize={'lg'} fontWeight={'semibold'}>
              {errorEmail}
            </Text>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
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
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <NextLink href={'/forgot'}>
                  <Link color={'blue.500'}>Forgot password?</Link>
                </NextLink>
              </Stack>
              <NextLink href={'/register'}>
                <Link color={'blue.500'}>New To Us?</Link>
              </NextLink>
              <Button
                colorScheme={'twitter'}
                variant={'solid'}
                isLoading={isLoginProcess}
                onClick={onLoginClick}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
export default Login;
