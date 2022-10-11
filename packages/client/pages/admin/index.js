import { Flex, Text } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import axiosInstance from '../../src/config/api';

export default function Admin({ user }) {
  return (
    <Flex justifyContent="center">
      <AdminSidebar user={user} />
      <Flex width="85%" direction="column">
        Hai
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) return { redirect: { destination: '/' } };
  try {
    const { userId, accessToken } = session.user;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const resGetUser = await axiosInstance.get(`/users/${userId}`, config);

    if (!resGetUser.data.data.isAdmin)
      return { redirect: { destination: '/' } };

    return { redirect: { destination: '/admin/inventory?page=1' } };
  } catch (error) {
    const errorMessage = error.message;
    return { props: { errorMessage } };
  }
}
