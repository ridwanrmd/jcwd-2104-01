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
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { BsFileText } from 'react-icons/bs';
import NextLink from 'next/link';

export default function Prescription() {
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
          <NextLink href="/prescription">
            <Link>
              <Hide below="md">
                <Text fontWeight={'normal'} fontSize="lg" color="#262626">
                  Unggah Resep
                </Text>
              </Hide>
            </Link>
          </NextLink>
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
          <IconButton
            fontSize={'5xl'}
            variant="link"
            color="twitter.500"
            icon={<ArrowForwardIcon />}
            onClick={() => {
              alert('Testing doang gaes');
            }}
          />
        </Show>
        <NextLink href="/prescription">
          <Link>
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
      </Flex>
    </Box>
  );
}
