import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AdminSidebar from '../../components/AdminSidebar';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';
import ReactPaginate from 'react-paginate';
import styles from './Admin.module.css';
import AdminCategory from '../../components/AdminCategory';
import AddCategory from '../../components/AddCategory';
import { useState } from 'react';

export default function Category(props) {
  const toast = useToast();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderCategory = () => {
    return props.category.map((data) => {
      return <AdminCategory key={data.categoryId} category={data} />;
    });
  };

  const handlePageClick = (e) => {
    let pages = e.selected + 1;
    setPage(e.selected);
    const path = router.asPath;
    if (path.includes('page')) {
      let replaced = path.replace(`page=${router.query.page}`, `page=${pages}`);
      router.push(replaced);
    } else {
      router.push(`${path}?page=${pages}`);
    }
  };

  const onSaveCategory = async (body) => {
    let path = router.asPath;
    try {
      const session = await getSession();
      const { accessToken } = session.user;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const addCategory = {
        category: body.category,
      };

      if (body.categoryImages) {
        const gambar = body.categoryImages;
        const data = new FormData();
        const fileName = Date.now() + gambar.name;
        data.append('name', fileName);
        data.append('gambar', gambar);

        addCategory.categoryImage = `/public/category/${fileName}`;
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
        const res = await axiosInstance.post('/category', addCategory, config);
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
      onClose();
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
    <Flex justifyContent="center">
      <AdminSidebar user={props.user} />
      <Flex width="85%" direction="column">
        <Text
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="semibold"
          marginStart="20"
        >
          Kategori
        </Text>
        <Box h="90%" w="90%" bg="#F5F6F6" mx="auto">
          <Flex direction="column" w="100%" h="100%">
            <Flex direction="column" w="90%" mx="auto">
              <Box h="70vh" marginTop={'5'}>
                {renderCategory()}
              </Box>
              <Flex justifyContent={'flex-end'}>
                <Button colorScheme={'twitter'} onClick={onOpen}>
                  Tambah
                  <AddCategory
                    isOpen={isOpen}
                    onClose={onClose}
                    onSaveCategory={onSaveCategory}
                  />
                </Button>
              </Flex>
              <ReactPaginate
                forcePage={page}
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(props.totalPage / 5)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={styles.pagination}
                pageLinkClassName={styles.pagenum}
                previousLinkClassName={styles.pagenum}
                nextLinkClassName={styles.pagenum}
                activeLinkClassName={styles.active}
                disabledClassName={styles.disabled}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    context.query.orderBy = 'createdAt';
    context.query.order = 'DESC';
    const resGetCategory = await axiosInstance.get('/category', {
      params: context.query,
    });
    const session = await getSession({ req: context.req });
    if (!session) return { redirect: { destination: '/' } };

    const { userId, accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);

    if (!resGetUser.data.data.isAdmin)
      return { redirect: { destination: '/' } };

    return {
      props: {
        category: resGetCategory.data.resultAdmin,
        totalPage: resGetCategory.data.totalPage,
        user: resGetUser.data.data,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
