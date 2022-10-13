import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Hide,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Banner() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const onSearchHandler = () => {
    router.push(`/product?page=1&productName=${search}`);
  };
  return (
    <>
      <Show below="md">
        <Box bgColor={'blue.500'} height={'5vh'}></Box>

        <InputGroup
          w={'50%'}
          mx="auto"
          top={'-2vh'}
          backgroundColor="white"
          rounded={10}
        >
          <Input
            type="text"
            placeholder="Cari Obat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement h={'full'}>
            <Button variant={'ghost'} onClick={onSearchHandler}>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Show>
      <Hide below="md">
        <Box
          bgImage="url('/banner.png')"
          h="50vh"
          bgSize={'cover'}
          w="full"
          bgPosition={'center'}
        >
          <Text
            paddingStart={'20vw'}
            paddingTop="7vh"
            fontWeight={'400'}
            fontSize="5xl"
            lineHeight={'5xl'}
            color="#FFFFFF"
          >
            Your Pharmacy, <br /> Everywhere
          </Text>
          <InputGroup w={'30%'} ms="20vw" backgroundColor="white" mb="4">
            <Input
              type="text"
              placeholder="Cari Obat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'solid'}
                minWidth="4vw"
                colorScheme={'twitter'}
                rounded="none"
                onClick={onSearchHandler}
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            marginStart={'20vw'}
            variant="link"
            color="white"
            onClick={() => router.push('/product?page=1')}
          >
            Lihat Semua Obat
          </Button>
        </Box>
      </Hide>
    </>
  );
}
