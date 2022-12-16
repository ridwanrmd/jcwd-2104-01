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
  Spacer,
} from '@chakra-ui/react';
import { TextField } from '../components/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function Register() {
  const [disabled, setDisabled] = useState(false);
  const [sawPassword, setSawPassword] = useState(false);
  const [sawConfirmPassword, setSawConfirmPassword] = useState(false);

  const router = useRouter();
  const toast = useToast();

  // redirect to home if already login
  const { data: session } = useSession();
  if (session) router.replace('/');

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validate = Yup.object({
    first_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First Name is Required')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    last_name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Last Name is Required')
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    email: Yup.string().email('Email is invalid').required('Email is Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Min 8 Characters, a Number and a Letter',
      ),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .max(15)
      .required('A phone number is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const onRegisterClick = async ({
    first_name,
    last_name,
    email,
    password,
    phone,
  }) => {
    try {
      const body = {
        first_name,
        last_name,
        email,
        phone,
        password,
      };

      const res = await axiosInstance.post('/users/register', body);
      toast({
        title: 'Berhasil membuat akun baru',
        description: res.data.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.replace('/login');
    } catch (error) {
      console.log(error);
      if (error.response) return alert(error.response.data.message);
      setDisabled(false);
      alert(error.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        onRegisterClick({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        setDisabled(true);
      }}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => (
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
              src="/Vector.svg"
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
              <Field name="first_name">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    name="first_name"
                    type="text"
                  />
                )}
              </Field>
              <Field name="last_name">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    name="last_name"
                    type="text"
                  />
                )}
              </Field>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    name="email"
                    type="text"
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    name="phone"
                    type="number"
                  />
                )}
              </Field>
              <Field name="password">
                {({ field }) => (
                  <InputGroup>
                    <TextField
                      {...field}
                      label="Password"
                      name="password"
                      type={sawPassword ? 'text' : 'password'}
                      width="128%"
                    />
                    <Spacer />
                    <Button
                      alignSelf={'center'}
                      variant={'ghost'}
                      onClick={() =>
                        setSawPassword((sawPassword) => !sawPassword)
                      }
                    >
                      {sawPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputGroup>
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field }) => (
                  <InputGroup>
                    <TextField
                      {...field}
                      label="Confirm Password"
                      name="confirmPassword"
                      type={sawConfirmPassword ? 'text' : 'password'}
                      width="105%"
                    />
                    <Spacer />
                    <Button
                      alignSelf={'center'}
                      variant={'ghost'}
                      onClick={() =>
                        setSawConfirmPassword(
                          (sawConfirmPassword) => !sawConfirmPassword,
                        )
                      }
                    >
                      {sawPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputGroup>
                )}
              </Field>
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
                  onClick={handleSubmit}
                >
                  Buat akun
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
    </Formik>
  );
}

export default Register;