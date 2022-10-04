import { Button, Box, HStack, Link } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const TransactionHistory = ({ data, selected }) => {
  return (
    <div>
      <HStack
        bg={'gray.50'}
        h={100}
        spacing="95"
        my={'10'}
        ml={'20'}
        mr={'20'}
        px={6}
        rounded={6}
        boxShadow="lg"
      >
        <Image
          unoptimized
          alt="Pembelian"
          width={70}
          height={70}
          src={'/login.png'}
        />
        <Box w="180px">No.Pembelian: {data.transactionId}</Box>
        <Box w="180px">Status: {data.transactionStatus}</Box>
        <Box w="180px">Total Price: Rp. {data.total.toLocaleString('id')}</Box>
        <Box w="180px">
          Shiping Price: Rp. {data.biaya.toLocaleString('id')}
        </Box>
        <Link href={`/transaction/${data.transactionId}`}>
          <Button colorScheme={'twitter'} variant="link">
            Lihat Pesanan
          </Button>
        </Link>
      </HStack>
    </div>
  );
};
export default TransactionHistory;
