import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import SidebarProduct from '../../components/SidebarProduct';
import styles from './Product.module.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export default function Product(props) {
  const router = useRouter();

  const handlePageClick = (e) => {
    let pages = e.selected + 1;
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
      <Navbar />
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
            {router.query.category == '' ? (
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
            <Flex flexWrap="wrap" justify="center" flexShrink={'0'}>
              {renderCard()}
            </Flex>
            <ReactPaginate
              initialPage={router.query.page - 1}
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
