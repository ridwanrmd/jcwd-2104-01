import { Text, Image, Flex, Button } from '@chakra-ui/react';

export default function ProductCard() {
  return (
    <Flex
      flexDir={'column'}
      marginTop={'4'}
      width={{ base: '40vw', md: '14vw' }}
      flexShrink={'0'}
    >
      <Image src="/vitaminb1.jpg" />
      <Text mx="4" mb="1" noOfLines={1} fontSize={['sm', 'md']} lineHeight={4}>
        Ok google, gimana cara cepet kaya tanpa usaha
      </Text>
      <Text
        mx="4"
        fontSize={['xs', 'sm']}
        lineHeight={3}
        fontWeight="normal"
        color="#6E6E6E"
        marginBlock={'2'}
      >
        Per Strip - Stock 12
      </Text>
      <Text mx="4" fontSize={['xs', 'sm']} lineHeight={5} fontWeight="medium">
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
