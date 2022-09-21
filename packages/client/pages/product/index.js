import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import SidebarProduct from '../../components/SidebarProduct';
import styles from './Product.module.css';
import ReactPaginate from 'react-paginate';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Product(props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(router.query.page - 1);
  }, [router.query.category]);

  const handlePageClick = (e) => {
    let pages = e.selected + 1;
    setPage(e.selected);
    const path = router.asPath;
    let replaced = path.replace(`page=${router.query.page}`, `page=${pages}`);
    router.push(replaced);
  };

  const renderCard = () => {
    return props.product.map((products) => {
      return <ProductCard key={products.productId} product={products} />;
    });
  };
  return (
    <>
      <Navbar session={session} user={props.user} />
      <Flex direction={{ md: 'row', base: 'column' }} marginTop="6">
        <SidebarProduct />
        <Flex
          borderStart={{ md: '1px solid #C2CED6', base: 'unset' }}
          flexGrow={'1'}
        >
          <Flex
            direction={'column'}
            justifyContent="space-between"
            h="90vh"
            w="full"
          >
            {router.query.category == '' || !router.query.category ? (
              <Text
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="semibold"
                marginStart="10"
              >
                Semua Obat
              </Text>
            ) : (
              <Text
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="semibold"
                marginStart="10"
              >
                {`Obat ${router.query.category}`}
              </Text>
            )}
            <Flex
              flexWrap="wrap"
              flexGrow={'1'}
              flexShrink={'0'}
              overflowY={{ base: 'unset', md: 'scroll' }}
              h={{ base: 'unset', md: '80vh' }}
            >
              {renderCard()}
            </Flex>
            <ReactPaginate
              forcePage={page}
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={Math.ceil(props.totalPage / 12)}
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
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const resGetProduct = await axiosInstance.get(`/product`, {
      params: context.query,
    });

    const session = await getSession({ req: context.req });
    if (session) {
      try {
        const { userId, accessToken } = session.user;
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const resGetUser = await axiosInstance.get(`/users/${userId}`, config);

        return {
          props: {
            product: resGetProduct.data.result,
            totalPage: resGetProduct.data.totalPage,
            user: resGetUser.data.data,
          },
        };
      } catch (error) {
        const errorMessage = error.message;
        return { props: { errorMessage } };
      }
    }

    return {
      props: {
        product: resGetProduct.data.result,
        totalPage: resGetProduct.data.totalPage,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
