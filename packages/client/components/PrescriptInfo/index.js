import React from 'react';
import { Box, Text, HStack, VStack, Image } from '@chakra-ui/react';

function PrescriptInfo() {
  return (
    <Box mt="40px" align="center">
      <Text
        fontFamily="poppins"
        fontWeight="500"
        fontSize="22px"
        lineHeight="28px"
      >
        Cara Upload Resep Dokter
      </Text>
      <HStack mx="110px" mt="41px" spacing="70px">
        <VStack width="170px">
          <Box bg="#C2CED6" width="112px" height="112px" borderRadius="670">
            <Box pt="4" pl="2">
              <Image src="/resep1.svg" alt="resep image" />
            </Box>
          </Box>
          <Text
            pt="25px"
            pb="5px"
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            1. Upload Resep
          </Text>
          <Text fontWeight="400" fontSize="12" lineHeight="16px">
            Foto resep yang ditulis oleh dokter anda, kemudian upload pada form
            diatas.
          </Text>
        </VStack>
        <VStack width="175px">
          <Box bg="#C2CED6" width="112px" height="112px" borderRadius="670">
            <Box pt="5" pr="2">
              <Image
                width="70"
                height="70"
                src="/resep2.svg"
                alt="resep image"
              />
            </Box>
          </Box>
          <Text
            pt="25px"
            pb="5px"
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            2. Menunggu Validasi
          </Text>
          <Text fontWeight="400" fontSize="12" lineHeight="16px">
            Tim kami akan mengecek ketersediaan obat sesuai resep.
          </Text>
        </VStack>
        <VStack width="195px">
          <Box bg="#C2CED6" width="112px" height="112px" borderRadius="670">
            <Box pt="4" pl="2">
              <Image src="/resep3.svg" alt="resep image" />
            </Box>
          </Box>
          <Text
            pt="25px"
            pb="5px"
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            3. Lakukan Pembayaran
          </Text>
          <Text fontWeight="400" fontSize="12" lineHeight="16px">
            Segera lakukan pembayaran agar kami dapat memproses obat anda.
          </Text>
        </VStack>
        <VStack width="125px">
          <Box bg="#C2CED6" width="112px" height="112px" borderRadius="670">
            <Box pt="4">
              <Image src="/resep4.svg" alt="resep image" />
            </Box>
          </Box>
          <Text
            pt="25px"
            pb="5px"
            fontWeight="500"
            fontSize="16px"
            lineHeight="24px"
          >
            4. Obat Diantar
          </Text>
          <Text fontWeight="400" fontSize="12" lineHeight="16px">
            Kami akan segera mengirimkan obat yang anda pesan.
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default PrescriptInfo;
