import React from 'react';
import axiosInstance from '../../src/config/api';

export default function ProductDetail() {
  return <div>ProductDetail</div>;
}

export async function getServerSideProps(context) {
  try {
    const resGetProduct = await axiosInstance.get(
      `/product/${context.params.url}`,
    );
    console.log(resGetProduct.data.result);
    return {
      props: {
        product: resGetProduct.data.result,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
