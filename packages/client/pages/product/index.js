import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Icon,
  Box,
  Stack,
  Link,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Hide,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  SearchIcon,
  HamburgerIcon,
  CloseIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
export default function Product(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const router = useRouter();
  // let cate = 'obat makan';
  // useEffect(() => {
  //   router.push(`/profile?category=${cate}&page=1`);
  // }, []);
  // console.log(router.asPath + `&pages=1`); hasilnya : /profile?category=obat%20makan&page=1&pages=1
  // console.log(router.query); hasilnya {category : obat makan, page: 1}
  // <Link href={{ pathname: '/search', query: { keyword: 'this way' } }}>
  //   <a>path</a>
  // </Link>;

  // Hanya sekedar catatan, akan di hapus pada waktunya
  return (
    <>
      <Navbar />
      <Flex direction={{ md: 'row', base: 'column' }} marginTop="6">
        <Flex
          marginStart={2}
          direction="column"
          flexGrow={'0.4'}
          flexShrink="0"
        >
          <Flex justifyContent="space-evenly">
            <InputGroup w={'70%'} backgroundColor="white" mb="4">
              <Input type="text" placeholder="Cari Obat" />
              <InputRightElement>
                <Button
                  variant={'solid'}
                  bgColor={'transparent'}
                  rounded="none"
                >
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <IconButton
              variant={'unstyled'}
              size={'md'}
              icon={
                isOpen ? (
                  <CloseIcon />
                ) : (
                  <Icon
                    as={AiOutlineSetting}
                    w="70%"
                    h="70%"
                    paddingTop={'2'}
                  />
                )
              }
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
          <Hide below="md">
            <Stack as={'nav'}>
              <Link
                paddingStart={4}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Semua Obat
              </Link>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Kategory
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex direction={'column'}>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Batuk & Flu
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Demam & Sakit Kepala
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Antibiotik & Anti Kamur
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Minyak angin & Balsam
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Pencernaan
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Vitamin
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Asthma
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          P3K
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Mata
                        </Link>
                      </NextLink>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Urutkan
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex direction="column">
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Harga: Rendah ke Tinggi
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Harga : Tinggi ke Rendah
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Nama: A ke Z
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Nama : Z ke A
                        </Link>
                      </NextLink>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Button
                leftIcon={<AddIcon />}
                textColor="twitter.500"
                variant="Link"
              >
                Unggah Resep
              </Button>
            </Stack>
          </Hide>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'}>
              <Link
                paddingStart={4}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
                href={'#'}
              >
                Semua Obat
              </Link>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Kategory
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex direction={'column'}>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Batuk & Flu
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Demam & Sakit Kepala
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Antibiotik & Anti Kamur
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Minyak angin & Balsam
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Pencernaan
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Vitamin
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Asthma
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          P3K
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Mata
                        </Link>
                      </NextLink>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Urutkan
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex direction="column">
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Harga: Rendah ke Tinggi
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Harga : Tinggi ke Rendah
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Nama: A ke Z
                        </Link>
                      </NextLink>
                      <NextLink href="#">
                        <Link
                          marginBlock={1}
                          _hover={{
                            textDecoration: 'none',
                            bg: 'gray.200',
                          }}
                        >
                          Nama : Z ke A
                        </Link>
                      </NextLink>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Button
                leftIcon={<AddIcon />}
                textColor="twitter.500"
                variant="Link"
              >
                Unggah Resep
              </Button>
            </Stack>
          </Box>
        ) : null}
        <Flex
          borderStart={{ md: '1px solid #C2CED6', base: 'unset' }}
          flexGrow={'0.60'}
        >
          <Flex flexWrap="wrap" justify="center">
            {/* Render Product Here */}
            {/* Max 5 */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

//   export async function getServerSideProps(context) {
//     try {
//       const session = await getSession({ req: context.req });
//       if (!session) return { redirect: { destination: '/' } };
//       const { userId, accessToken } = session.user;
//       const config = {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       };
//       const resGetUser = await axiosInstance.get(`/users/${userId}`, config);
//       return {
//         props: { user: resGetUser.data.data },
//       };
//     } catch (error) {
//       const errorMessage = error.message;
//       return { props: { errorMessage } };
//     }
//   }
