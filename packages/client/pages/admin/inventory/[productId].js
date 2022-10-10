import axiosInstance from '../../../src/config/api';
import AdminSidebar from '../../../components/AdminSidebar';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Text,
  VStack,
  Input,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function DetailStock(props) {
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = getDate.getMonth();
  const date = getDate.getDate();
  const today = `${year}-${month}-${date}`;
  console.log(today);
  return (
    <Flex>
      <AdminSidebar />
      <Box w="100%">
        <Box
          boxShadow={
            '0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)'
          }
          bg="#FFFFFF"
          h="64px"
          w="100%"
          pt="20px"
        >
          <Box ml="56.75px" h="20px">
            <HStack>
              <Image
                width={'10px'}
                height="20px"
                src="/leftArrow.svg"
                alt="arrow icon"
              />
              <Text
                fontWeight={700}
                fontSize="20px"
                lineHeight="24px"
                pl="27.75px"
              >
                Detail Stok Obat
              </Text>
            </HStack>
          </Box>
          <Box h="80vh" mt="5%" mx="5%">
            <VStack align="start">
              <Box bg="red.200" h="10%" w="100%" borderBottom="1px">
                <HStack p="10px" gap="50px">
                  <FormControl w="17%">
                    <FormLabel>Masukan Tanggal</FormLabel>
                    <Input
                      name="birthDate"
                      // value={birthDate.slice(0, 10)}
                      //   onChange={onHandleChange}
                      type="date"
                      max={today}
                    />
                    {/* <Select>
                      <option value="Januari">Januari</option>
                      <option value="februari">Februari</option>
                      <option value="maret">Maret</option>
                      <option value="april">April</option>
                      <option value="mei">Mei</option>
                      <option value="juni">Juni</option>
                      <option value="juli">Juli</option>
                      <option value="agustus">Agustus</option>
                    </Select> */}
                  </FormControl>
                  {/* <VStack align="start">
                    <Text>Bulan</Text>
                    <Select>
                      <option value="Januari">Januari</option>
                      <option value="februari">Februari</option>
                      <option value="maret">Maret</option>
                      <option value="april">April</option>
                      <option value="mei">Mei</option>
                      <option value="juni">Juni</option>
                      <option value="juli">Juli</option>
                      <option value="agustus">Agustus</option>
                    </Select>
                  </VStack> */}
                  {/* <VStack align="start">
                    <Text>Tahun</Text>
                    <Select>
                      <option value="Januari">Januari</option>
                      <option value="februari">Februari</option>
                      <option value="maret">Maret</option>
                      <option value="april">April</option>
                      <option value="mei">Mei</option>
                      <option value="juni">Juni</option>
                      <option value="juli">Juli</option>
                      <option value="agustus">Agustus</option>
                    </Select>
                  </VStack> */}
                </HStack>
              </Box>
              <Box>halo</Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
