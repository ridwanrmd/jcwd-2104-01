import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Hide,
  Image,
  Icon,
  Alert,
  AlertIcon,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { HiShoppingCart } from 'react-icons/hi';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api_origin } from '../../constraint';

export default function Navbar({ session, user }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="#FFFFFF"
        px={4}
        pos="sticky"
        left="0"
        right="0"
        top="0"
        zIndex="sticky"
        shadow={'md'}
      >
        {session && !user.isVerified ? (
          <Alert status="warning">
            <AlertIcon />
            Akun belum terverifikasi, klik tombol kirim untuk verifikasi lalu
            check email anda
            <Spacer />
            <Button variant={'solid'} colorScheme="twitter">
              Kirim
            </Button>
          </Alert>
        ) : null}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <NextLink href="/">
                <Link>
                  <Image src="/medbox.svg" alt="medbox" />
                </Link>
              </NextLink>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NextLink href={'/'}>
                <Link
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'gray.200',
                  }}
                >
                  Beranda
                </Link>
              </NextLink>
              <NextLink href="/product?page=1">
                <Link
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'gray.200',
                  }}
                >
                  Toko Obat
                </Link>
              </NextLink>

              <Link
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Riwayat
              </Link>
            </HStack>
          </HStack>

          <Flex alignItems={'center'} justifyContent="space-between">
            <Link href="google.com" paddingTop={'2'}>
              <Icon as={HiShoppingCart} h="50%" w="70%" marginInlineEnd={'5'} />
            </Link>
            {user ? (
              <Hide below="md">
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar size={'sm'} src={api_origin + user.image} />
                  </MenuButton>
                  <MenuList>
                    <NextLink href="/profile">
                      <Link>
                        <MenuItem>Profile</MenuItem>
                      </Link>
                    </NextLink>
                    <NextLink href="/change-password">
                      <Link>
                        <MenuItem>Ganti Password</MenuItem>
                      </Link>
                    </NextLink>
                    <MenuDivider />
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Hide>
            ) : (
              <Hide below="md">
                <Button
                  colorScheme="twitter"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </Hide>
            )}
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box bg="#FFFFFF" pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NextLink href={'/'}>
                <Link
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'gray.200',
                  }}
                >
                  Beranda
                </Link>
              </NextLink>
              <NextLink href="/product?page=1">
                <Link
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'gray.200',
                  }}
                >
                  Toko Obat
                </Link>
              </NextLink>

              <Link
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Riwayat
              </Link>
              <NextLink href={'/profile'}>
                <Link
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'gray.200',
                  }}
                >
                  Profile
                </Link>
              </NextLink>
              {session ? (
                <Button
                  colorScheme="twitter"
                  variant="link"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  colorScheme="twitter"
                  variant="link"
                  onClick={() => router.push('login')}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
