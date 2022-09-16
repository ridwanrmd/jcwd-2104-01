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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { HiShoppingCart } from 'react-icons/hi';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
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
            <Link href="/cart" paddingTop={'2'}>
              <Icon as={HiShoppingCart} h="50%" w="70%" marginInlineEnd={'5'} />
            </Link>
            <Hide below="md">
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                </MenuButton>
                <MenuList>
<<<<<<< HEAD
                  <MenuItem>Profile</MenuItem>
=======
                  <NextLink href="/profile">
                    <Link>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                  </NextLink>
>>>>>>> a09dcf5e775b7d319d9547aa106761bbaca10097
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
              <Button
                colorScheme="teal"
                variant="link"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
