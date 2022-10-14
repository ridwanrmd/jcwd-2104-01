import {
  Flex,
  Box,
  Image,
  Text,
  Spacer,
  Button,
  useToast,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { api_origin } from '../../constraint';
import { useRouter } from 'next/router';
import AddProductPrescription from '../AddProductPrescription';
import NextLink from 'next/link';

export default function AdminResep({
  data,
  productList,
  productRacikanList,
  fetchPrescription,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Flex
        margin="4"
        boxShadow="md"
        h="10vh"
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="10%">
          <Image
            src={api_origin + data.prescriptionImage}
            alt="vitamin"
            h="full"
            w="full"
            p="2"
          />
        </Box>
        <Flex alignItems={'center'}>
          <Text>Status : {data.status}</Text>
        </Flex>

        <Button
          marginInline="4"
          variant="link"
          colorScheme="twitter"
          onClick={onOpen}
          isDisabled={data.status != 'waiting'}
        >
          Tambah Obat
          <AddProductPrescription
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            productList={productList}
            productRacikanList={productRacikanList}
            fetchPrescription={fetchPrescription}
          />
        </Button>
      </Flex>
    </>
  );
}
