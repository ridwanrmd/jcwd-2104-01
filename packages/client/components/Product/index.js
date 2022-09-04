import { Text, Image, Flex, Button } from '@chakra-ui/react';

export default function Product() {
  return (
    <Flex flexDir={'column'} marginTop={'4'}>
      <Image src="/vitaminb1.jpg" />
      <Text mx="4" mb="1" noOfLines={1}>
        Ok google, gimana cara cepet kaya tanpa usaha
      </Text>
      <Text mx="4" mb="1">
        Per Strip - Stock 12
      </Text>
      <Text mx="4" mb={'4'}>
        Rp. 12.000
      </Text>
      <Button
        mx="4"
        variant={'outline'}
        colorScheme="twitter"
        marginBlock={'22px'}
      >
        Tambah
      </Button>
    </Flex>
  );
}
