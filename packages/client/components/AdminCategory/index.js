import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { api_origin } from '../../constraint';
import axiosInstance from '../../src/config/api';

export default function AdminCategory(props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const onDeleteController = async () => {
    try {
      let path = router.asPath;
      const result = await axiosInstance.delete(
        `/category/${props.category.categoryId}`,
      );
      alert(result.data.message);
      onClose();
      router.push(path);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex my="4" boxShadow={'md'} h="10vh">
        <Box w="20%">
          <Image
            src={api_origin + props.category.categoryImage}
            alt="vitamin"
            h="full"
            w="full"
            p="2"
          />
        </Box>
        <Flex alignItems={'center'}>
          <Text>{props.category.category}</Text>
        </Flex>
        <Spacer />
        <Flex w="20%" justifyContent="space-evenly" alignItems={'center'}>
          <Button variant="outline" colorScheme="red" onClick={onOpen}>
            Hapus
          </Button>
          <Button variant="outline" colorScheme="twitter">
            Edit
          </Button>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Kategori
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah kamu yakin ? Kamu tidak akan bisa mengembalikan kategori
              yang sudah dihapus
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batalkan
              </Button>
              <Button colorScheme="red" onClick={onDeleteController} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
