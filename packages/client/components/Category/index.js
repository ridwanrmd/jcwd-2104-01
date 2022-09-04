import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function Category() {
  return (
    <Flex
      justifyContent={'space-between'}
      maxHeight="100%"
      width="100%"
      overflow={{ base: 'scroll', md: 'unset' }}
      marginEnd="5"
      flexWrap={{ base: 'nowrap', md: 'wrap' }}
    >
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        width={{ base: '25%', md: '30%' }}
        alignItems="center"
        justifyItems={'center'}
        mx="2"
        padding="3"
        boxShadow={{ base: 'none', md: 'md' }}
        marginBottom="4"
      >
        <Image
          borderRadius="full"
          src="/pusing-logo.svg"
          alt="Obat Pusing"
          height={'100%'}
          marginStart={{ base: 'unset', md: '6' }}
        />
        <Text
          fontSize={'sm'}
          textAlign="center"
          marginStart={{ base: 'unset', md: '4' }}
        >
          Demam & Sakit Kepala
        </Text>
      </Flex>
    </Flex>
  );
}
