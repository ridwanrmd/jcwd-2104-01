import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import SidebarProduct from '../../components/SidebarProduct';
export default function Product(props) {
  const renderCard = () => {
    return props.product.map((products) => {
      return <ProductCard product={products} />;
    });
  };
  return (
    <>
      <Navbar />
      <Flex direction={{ md: 'row', base: 'column' }} marginTop="6">
        <SidebarProduct />
        <Flex
          borderStart={{ md: '1px solid #C2CED6', base: 'unset' }}
          flexGrow={'0.60'}
        >
          <Flex flexWrap="wrap" justify="center">
            {renderCard()}
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
