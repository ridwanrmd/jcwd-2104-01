import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function Transaksi() {
  return (
    <Flex justifyContent="center">
      <AdminSidebar />
      <Flex width="85%" direction="column">
        Hai
      </Flex>
    </Flex>
  );
}
