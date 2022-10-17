import {
  Box,
  Button,
  Flex,
  Hide,
  Icon,
  IconButton,
  Show,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { BsFileText } from 'react-icons/bs';
import NextLink from 'next/link';

export default function Prescription(props) {
  const toast = useToast();

  const protectPrescription = () => {
    if (!props.user)
      return toast({
        description: 'Silahkan Login Terlebih Dahulu',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    if (!props.user.isVerified) {
      toast({
        description: 'Silahkan Verifikasi Akun Anda Terlebih Dahulu',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      redirect: {
        destination: '/admin';
      }
    }
  };
  return (
    <Box mx={{ base: '5', md: '10%' }}>
      <Show above="md">
        <Text mt="9" fontSize={'xl'} fontWeight="medium" lineHeight={'7'}>
          Punya Resep dari Dokter?
        </Text>
      </Show>
      <Flex
        bg="#F2F8FC"
        height={'10vh'}
        marginBottom="4"
        justifyContent={'space-between'}
        alignItems="center"
        mt="4"
      >
        <Icon
          as={BsFileText}
          width="15%"
          height="100%"
          color={'twitter.500'}
          p="2"
        />
        <Box p="4" width={'60%'}>
          <Show below="md">
            <Text fontWeight={'medium'} fontSize="sm" color="#262626">
              Punya Resep Dokter?
            </Text>
          </Show>
          <Hide below="md">
            <Text fontWeight={'normal'} fontSize="lg" color="#262626">
              Unggah Resep
            </Text>
          </Hide>
          <Show below="md">
            <Text
              fontWeight={'normal'}
              fontSize="xs"
              lineHeight="4"
              color={'#6E6E6E'}
            >
              klik disini untuk kirim foto resep dokter
            </Text>
          </Show>
          <Hide below="md">
            <Text
              fontWeight={'normal'}
              fontSize="sm"
              lineHeight="4"
              color={'#6E6E6E'}
            >
              klik tombol unggah untuk kirim foto resep dokter
            </Text>
          </Hide>
        </Box>
        <Show below="md">
          {!props.user?.isVerified ? (
            <IconButton
              fontSize={'5xl'}
              variant="link"
              color="twitter.500"
              icon={<ArrowForwardIcon />}
              onClick={protectPrescription}
            >
              Unggah Resep
            </IconButton>
          ) : (
            <NextLink href="/prescription">
              <Link
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <IconButton
                  fontSize={'5xl'}
                  variant="link"
                  color="twitter.500"
                  icon={<ArrowForwardIcon />}
                />
              </Link>
            </NextLink>
          )}
        </Show>
        {!props.user?.isVerified ? (
          <Hide below="md">
            <Button
              variant={'outline'}
              colorScheme="twitter"
              marginEnd={'4'}
              p="6"
              onClick={protectPrescription}
            >
              Unggah Resep
            </Button>
          </Hide>
        ) : (
          <NextLink href="/prescription">
            <Link
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Hide below="md">
                <Button
                  variant={'outline'}
                  colorScheme="twitter"
                  marginEnd={'4'}
                  p="6"
                >
                  Unggah Resep
                </Button>
              </Hide>
            </Link>
          </NextLink>
        )}
      </Flex>
    </Box>
  );
}
