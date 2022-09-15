import { Flex, Image, Text, Stack, Link, Box } from '@chakra-ui/react';
import { getRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';
import { useRouter } from 'next/router';
import React from 'react';

export default function Category() {
  const router = useRouter();
  return (
    <Box mx={{ base: '5', md: '10%' }} marginTop="46px">
      <Text mt="9" fontSize={'xl'} fontWeight="medium" lineHeight={'7'}>
        Jelajahi Kategori Obat
      </Text>
      <Flex
        marginTop={'16px'}
        justifyContent={'space-between'}
        maxHeight="100%"
        width="100%"
        alignItems={'baseline'}
        overflow={{ base: 'scroll', md: 'unset' }}
        marginEnd="5"
        flexWrap={{ base: 'nowrap', md: 'wrap' }}
        sx={{
          // for Chrome, Safari and Opera
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          // for IE, Edge and Firefox
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          justifyItems="center"
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Demam%20dan%20Sakit%20Kepala&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/pusing.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="Demam"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Demam & Sakit Kepala
          </Text>
        </Stack>

        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push('/product?page=1&category=P3K&orderBy=price&order=ASC')
          }
        >
          <Image
            src="/p3k.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="p3k"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            P3K
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Asthma&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/asthma.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="ashtma"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Asthma
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Batuk%20dan%20Flu&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/batuk.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="Batuk"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Batuk & Flu
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            getRouteRegex.push(
              '/product?page=1&category=Vitamin&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/vitamin.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="vitamin"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Vitamin
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Pencernaan&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/pencernaan.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="Pencernaan"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Pencernaan
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push('/product?page=1&category=Mata&orderBy=price&order=ASC')
          }
        >
          <Image
            src="/mata.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="mata"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Mata
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Antibiotik%20dan%20Anti%20Jamur&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/anti-biotik.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="antibiotik"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Antibiotik & Anti Jamur
          </Text>
        </Stack>
        <Stack
          minWidth={{ base: '25vw', md: '20vw' }}
          maxWidth={{ base: 'unset', md: '20vw' }}
          direction={['column', 'row']}
          alignItems="center"
          marginBlockEnd={['unset', '5']}
          padding="2"
          shadow={{ base: 'unset', md: 'base' }}
          cursor="pointer"
          onClick={() =>
            router.push(
              '/product?page=1&category=Minyak%20Angin%20dan%20Balsam&orderBy=price&order=ASC',
            )
          }
        >
          <Image
            src="/balsam.svg"
            height={'6vh'}
            width={['unset', '6vw']}
            alt="Minyak Angin"
          />
          <Text
            fontSize={['xs', 'sm']}
            lineHeight="4"
            textAlign="center"
            marginStart={{ base: 'unset', md: '4' }}
          >
            Minyak Angin & Balsam
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
