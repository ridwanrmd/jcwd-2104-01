import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function Category() {
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      width={{ base: '25%', md: '30%' }}
      alignItems="center"
      justifyItems={'center'}
      marginBlock={'auto'}
      mx="2"
      padding="3"
      boxShadow={{ base: 'sm', md: 'md' }}
      marginBottom="4"
      bg="#F5F6F6"
      height={'8vh'}
    >
      {/* <Image
          borderRadius="full"
          src="/pusing-logo.svg"
          alt="Obat Pusing"
          height={'100%'}
          marginStart={{ base: 'unset', md: '6' }}
        /> */}
      <Text
        fontSize="sm"
        lineHeight="4"
        textAlign="center"
        marginStart={{ base: 'unset', md: '4' }}
      >
        Demam & Sakit Kepala
      </Text>
    </Flex>
  );
}
