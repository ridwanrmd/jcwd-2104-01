import { Flex, Image, Text, Stack, Link, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { api_origin } from '../../constraint';

export default function Category({ category }) {
  const router = useRouter();

  const renderCategory = () => {
    return category?.map((data) => {
      return (
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
          key={data.categoryId}
          onClick={() =>
            router.push(
              `/product?page=1&category=${data.category}&orderBy=price&order=ASC`,
            )
          }
        >
          <Image
            src={api_origin + data.categoryImage}
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
            {data.category}
          </Text>
        </Stack>
      );
    });
  };

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
        {renderCategory()}
      </Flex>
    </Box>
  );
}
