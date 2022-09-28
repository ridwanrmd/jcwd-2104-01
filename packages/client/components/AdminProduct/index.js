import { Box, Button, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import { api_origin } from '../../constraint';

export default function AdminProduct(props) {
  return (
    <Flex my="4" boxShadow={'md'} h="15vh">
      <Box w="20%">
        <Image
          src={api_origin + props.product.productImage}
          alt="vitamin"
          h="full"
          w="full"
          p="2"
        />
      </Box>
      <Flex direction="column">
        <Text>{props.product.productName}</Text>
        <Text>Rp. {props.product.price.toLocaleString('id')}</Text>
        <Text>{`${props.product.unit} - stock ${props.product.stock}`}</Text>
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
