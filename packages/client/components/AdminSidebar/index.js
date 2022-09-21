import { Box, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

export default function AdminSidebar() {
  return (
    <Flex direction="column" height="100vh" width="15vw" bg="twitter.500">
      <Box mx="auto" w="70%">
        <Image src="/adminmedbox.svg" h="32" />
      </Box>
      <Box h="10" cursor="pointer" p="2" bg="unset">
        <Flex justifyContent="center">
          <Image src="/transaksi.svg" />
          <Text color="white" ms="2">
            Transaksi
          </Text>
        </Flex>
      </Box>
      <Box h="10" cursor="pointer" p="2" bg="#005E9D">
        <Flex justifyContent="center">
          <Image src="/inventory.svg" />
          <Text color="white" ms="2">
            Inventory
          </Text>
        </Flex>
      </Box>
      <Box h="10" cursor="pointer" p="2">
        <Flex justifyContent="center">
          <Image src="/laporan.svg" />
          <Text color="white" ms="2">
            Laporan
          </Text>
        </Flex>
      </Box>
      <Spacer />
      <Box width="max-content" bg="green" mx="auto">
        Logout
      </Box>
    </Flex>
  );
}
