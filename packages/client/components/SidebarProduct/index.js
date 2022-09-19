import React, { useState } from 'react';
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Show,
} from '@chakra-ui/react';
import { AiOutlineSetting } from 'react-icons/ai';
import { SearchIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

export default function SidebarProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onClickLink = (e) => {
    router.push(
      `/product?page=1&category=${e.target.value}&orderBy=price&order=ASC`,
    );
  };

  const onClickOrder = (e) => {
    let splitter = e.target.value.split(' ');
    let paths = router.asPath;
    if (router.query.orderBy) {
      let replaceOrder = paths.replace(
        `orderBy=${router.query.orderBy}&order=${router.query.order}`,
        `orderBy=${splitter[0]}&order=${splitter[1]}`,
      );
      router.push(replaceOrder);
    } else {
      router.push(
        `/product?page=1&orderBy=${splitter[0]}&order=${splitter[1]}`,
      );
    }
  };

  const onSearchHandler = () => {
    const path = router.asPath;
    if (router.query.productName) {
      let replaceProduct = path.replace(
        `productName=${router.query.productName}`,
        `productName=${search}`,
      );
      router.push(replaceProduct);
    } else {
      router.push(`${path}&productName=${search}`);
    }
  };

  const renderCategory = () => {
    let kategori = [
      'Batuk dan Flu',
      'Demam dan Sakit Kepala',
      'Antibiotik dan Anti Jamur',
      'Minyak Angin dan Balsam',
      'Pencernaan',
      'Vitamin',
      'Asthma',
      'P3K',
      'Mata',
    ];
    return kategori.map((category) => {
      return (
        <Button
          key={category}
          width={'max-content'}
          variant={'link'}
          color="#1a202c"
          fontWeight={'normal'}
          fontSize={'md'}
          value={category}
          onClick={onClickLink}
        >
          {category}
        </Button>
      );
    });
  };

  return (
    <>
      <Flex
        marginStart={2}
        direction="column"
        maxWidth={{ base: 'full', md: '30vw' }}
        flexShrink="0"
      >
        <Flex justifyContent="space-evenly">
          <InputGroup w={'70%'} backgroundColor="white" mb="4">
            <Input
              type="text"
              placeholder="Cari Obat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <Button
                variant={'solid'}
                bgColor={'transparent'}
                rounded="none"
                onClick={onSearchHandler}
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
                <Icon as={AiOutlineSetting} w="70%" h="70%" paddingTop={'2'} />
              )
            }
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        <Show above="md">
          <Stack as={'nav'}>
            <Button
              marginStart="4"
              width={'max-content'}
              variant={'link'}
              color="#1a202c"
              fontWeight={'normal'}
              fontSize={'md'}
              value=""
              onClick={onClickLink}
            >
              Semua Obat
            </Button>
            <Accordion allowMultiple>
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
                  <Flex direction={'column'}>{renderCategory()}</Flex>
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
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="price ASC"
                      onClick={onClickOrder}
                    >
                      Harga: Rendah ke Tinggi
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="price DESC"
                      onClick={onClickOrder}
                    >
                      Harga: Tinggi ke Rendah
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="productName ASC"
                      onClick={onClickOrder}
                    >
                      Nama: A ke Z
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="productName DESC"
                      onClick={onClickOrder}
                    >
                      Nama: Z ke A
                    </Button>
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
        </Show>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'}>
            <Button
              marginStart="4"
              width={'max-content'}
              variant={'link'}
              color="#1a202c"
              fontWeight={'normal'}
              fontSize={'md'}
              value=""
              onClick={onClickLink}
            >
              Semua Obat
            </Button>
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
                  <Flex direction={'column'}>{renderCategory()}</Flex>
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
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="price ASC"
                      onClick={onClickOrder}
                    >
                      Harga: Rendah ke Tinggi
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="price DESC"
                      onClick={onClickOrder}
                    >
                      Harga: Tinggi ke Rendah
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="productName ASC"
                      onClick={onClickOrder}
                    >
                      Nama: A ke Z
                    </Button>
                    <Button
                      width={'max-content'}
                      variant={'link'}
                      color="#1a202c"
                      fontWeight={'normal'}
                      fontSize={'md'}
                      value="productName DESC"
                      onClick={onClickOrder}
                    >
                      Nama: Z ke A
                    </Button>
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
    </>
  );
}
