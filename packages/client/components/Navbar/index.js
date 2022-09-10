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
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image src="/medbox.svg" alt="medbox" />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
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
                Beranda
              </Link>
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
                Toko Obat
              </Link>

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
                  <MenuItem>Profile</MenuItem>
                  <NextLink href="/change-password">
                    <Link>
                      <MenuItem>Ganti Password</MenuItem>
                    </Link>
                  </NextLink>
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
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
              <Link
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Beranda
              </Link>
              <Link
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Toko Obat
              </Link>

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
              <Link
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Profile
              </Link>
              <Link
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Logout
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
