import { Flex, Spacer, Text, Button } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';

const AddressAndPayment = ({ data }) => {
  let dtId;
  let key;
  let totalPrice;
  let ongkir;
  let status;
  // console.log(data);
  data.forEach((v, i) => {
    key = i;
    dtId = v.transaction.transactionId;
    ongkir = v.transaction.biaya;
    totalPrice = v.transaction.total;
    status = v.transaction.transactionStatus;
  });
  let NumOnkir = Number(ongkir);
  let NumPrice = Number(totalPrice);
  let grandTotal = NumOnkir + NumPrice;
  return (
    <>
      <Text fontSize={'15px'} mb="2rem">
        BCA Bank Transfer
      </Text>
      <Flex>
        <Text minW="200px">Bank Account Number </Text>:
        <Spacer />
        <Text textAlign={'end'}> 2104-234-{dtId}</Text>
      </Flex>
      <Flex>
        <Text minW="200px">Price to Pay </Text>:
        <Spacer />
        <Text textAlign={'end'}>
          {' '}
          Rp. {grandTotal.toLocaleString('id-ID')}{' '}
        </Text>
      </Flex>
      <Flex>
        <Text minW="200px" fontWeight={'700'} textColor="red">
          Payment Deadline{' '}
        </Text>
        :
        <Spacer />
        <Text textAlign={'end'} minW="250px" fontWeight={'700'} textColor="red">
          {moment(data.createdAt).add(1, 'days').format('LLL')}
        </Text>
      </Flex>
      <Flex direction={'column'} align="center" gap="1rem" mt="2rem">
        <Button colorScheme={'twitter'}>Payment Proof</Button>
        <Text color={'teal'} _hover={{ color: 'teal.1000' }} cursor="wait">
          Payment Status {status}
        </Text>
      </Flex>
    </>
  );
};

export default AddressAndPayment;
