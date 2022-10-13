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
  useToast,
} from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { api_origin } from '../../constraint';
import axiosInstance from '../../src/config/api';
import EditCategory from '../EditCategory';
export default function AdminCategory(props) {
  const toast = useToast();
  const router = useRouter();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const cancelDeleteRef = useRef();

  const onDeleteController = async () => {
    try {
      let path = router.asPath;
      const result = await axiosInstance.delete(
        `/category/${props.category.categoryId}`,
      );
      toast({
        title: result.data.message,
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      onDeleteClose();
      router.push(path);
    } catch (error) {
      return toast({
        title: error.response.data.message,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onSave = async (body) => {
    let path = router.asPath;
    const session = await getSession();
    const { accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const updateCategory = {
        category: body.category,
        categoryId: body.categoryId,
      };
      if (body.categoryImages) {
        const gambar = body.categoryImages;
        const data = new FormData();
        const fileName = Date.now() + gambar.name;
        data.append('name', fileName);
        data.append('gambar', gambar);
        updateCategory.categoryImage = `/public/category/${fileName}`;
        try {
          await axiosInstance.post('/category/upload', data, config);
        } catch (error) {
          return toast({
            title: error.response.data.message,
            status: 'error',
            position: 'top',
            duration: 2000,
            isClosable: true,
          });
        }
      }
      try {
        const res = await axiosInstance.patch(
          '/category',
          updateCategory,
          config,
        );
        toast({
          title: res.data.message,
          status: 'success',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        return toast({
          title: error.response.data.message,
          status: 'error',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      }
      onEditClose();
      router.push(path);
    } catch (error) {
      return toast({
        title: error.response.data.message,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
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
          <Button variant="outline" colorScheme="red" onClick={onDeleteOpen}>
            Hapus
          </Button>
          <Button variant="outline" colorScheme="twitter" onClick={onEditOpen}>
            Edit
          </Button>
        </Flex>
      </Flex>
      <EditCategory
        isOpen={isEditOpen}
        onClose={onEditClose}
        onSave={onSave}
        categories={props.category}
      />
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelDeleteRef}
        onClose={onDeleteClose}
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
              <Button ref={cancelDeleteRef} onClick={onDeleteClose}>
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
