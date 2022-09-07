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
  Link,
} from '@chakra-ui/react';

export default function Banner() {
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
          <Input type="text" placeholder="Cari Obat" />
          <InputRightElement h={'full'}>
            <Button variant={'ghost'}>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Show>
      <Hide below="md">
        <Box bgImage="url('/banner.png')" h="40vh">
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
            <Input type="text" placeholder="Cari Obat" />
            <InputRightElement h={'full'}>
              <Button
                variant={'solid'}
                minWidth="4vw"
                colorScheme={'twitter'}
                rounded="none"
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Link
            paddingStart={'20vw'}
            color="white"
            _hover={{
              textDecoration: 'none',
            }}
            href={'#'}
          >
            Lihat Semua Obat
          </Link>
        </Box>
      </Hide>
    </>
  );
}
