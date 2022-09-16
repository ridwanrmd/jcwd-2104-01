import { HStack, VStack, Text, Box } from '@chakra-ui/react';

export default function AddressBox(props) {
  // const [addresses, setAddresses] = useState(props.addresses);

  return (
    <Box>
      <Box
        paddingY={2}
        paddingLeft="0.5"
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        width={400}
      >
        <HStack mt="4" mb="6">
          <Text ml="5">Utama</Text>
          <VStack align={'start'} paddingStart="4">
            <Text
              pl={'2'}
              fontSize={{ base: 'md', md: 'md' }}
              fontWeight="medium"
              lineHeight={'6'}
            >
              {props.addresses}
            </Text>
          </VStack>
          {/* <HStack>
            <Button colorScheme={'twitter'}>Rubah</Button>
            <Button colorScheme={'twitter'}>Hapus</Button>
            </HStack> */}
        </HStack>
      </Box>
    </Box>
  );
}
