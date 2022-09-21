import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

export default function AdminProduct() {
  return (
    <Flex my="4" boxShadow={'md'} h="15vh">
      <Box w="20%">Gambar</Box>
      <Flex direction="column">
        <Text>Ini nama obat dan kayanya sih panjang namanya</Text>
        <Text>Harga</Text>
        <Text>Stock</Text>
        <Text>Detail</Text>
      </Flex>
      <Spacer />
      <Flex w="20%" justifyContent="space-evenly" alignItems={'center'}>
        <Button variant="outline" colorScheme="red">
          Hapus
        </Button>
        <Button variant="outline" colorScheme="twitter">
          Edit
        </Button>
      </Flex>
    </Flex>
  );
}
