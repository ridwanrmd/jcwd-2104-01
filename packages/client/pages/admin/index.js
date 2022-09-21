import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import AdminProduct from '../../components/AdminProduct';
import AdminSidebar from '../../components/AdminSidebar';

export default function Admin() {
  return (
    <Flex justifyContent="center">
      <AdminSidebar />
      <Flex width="85%" direction="column">
        <Text
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="semibold"
          marginStart="20"
        >
          Inventory
        </Text>
        <Box h="90%" w="90%" bg="#F5F6F6" mx="auto">
          <Flex direction="column" w="100%" h="100%">
            <Flex
              h="7%"
              w="100%"
              justifyContent="space-between"
              justifyItems="center"
              mb="4"
            >
              <Stack
                minWidth="50%"
                alignItems="center"
                justifyItems="center"
                bg="twitter.500"
                justifyContent="center"
                cursor="pointer"
              >
                <Text fontSize="xl" textAlign="center" color="white">
                  Obat Satuan
                </Text>
              </Stack>
              <Stack
                minWidth="50%"
                alignItems="center"
                justifyItems="center"
                justifyContent="center"
                cursor="pointer"
              >
                <Text fontSize="xl" textAlign="center" color="unset">
                  Obat Racikan
                </Text>
              </Stack>
            </Flex>
            <Flex direction="column" w="90%" mx="auto">
              <Flex>
                <InputGroup w={'50%'} backgroundColor="white" mb="4">
                  <Input
                    type="text"
                    placeholder="Cari Obat"
                    // value={search}
                    //   onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      variant={'solid'}
                      bgColor={'transparent'}
                      rounded="none"
                      // onClick={onSearchHandler}
                    >
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Spacer />
                <Select placeholder="Select option" w="fit-content">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Flex>
              <AdminProduct />
              <AdminProduct />
              <AdminProduct />
              <Flex justifyContent={'flex-end'}>
                <Button colorScheme={'twitter'}>Tambah</Button>
              </Flex>
              <Text mx="auto">Pagination</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
