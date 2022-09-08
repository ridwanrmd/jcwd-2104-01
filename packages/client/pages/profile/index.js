import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import axiosInstance from '../../src/config/api';
export default function lohe() {
  let user = {
    first_name: 'lohe',
    last_name: 'jamal',
    birthDate: '2022-09-05',
    phone: '081212',
    email: 'lalala@mail.com',
  };
  const { first_name, last_name, birthDate, phone, email } = user;
  const [first, setfirst] = useState(user);
  const onChangeHandler = (e) => {
    setfirst({ ...first, [e.target.name]: e.target.value });
  };
  const onClickHandler = async () => {
    console.log(first.birthDate);
    try {
      const res = await axiosInstance.patch('/user', first);
      alert(res.data.message);
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  };
  return (
    <Box>
      <Input
        name="first_name"
        value={first.first_name}
        onChange={onChangeHandler}
      ></Input>
      <Input
        name="last_name"
        value={first.last_name}
        onChange={onChangeHandler}
      ></Input>
      <Input
        name="birthDate"
        value={first.birthDate}
        onChange={onChangeHandler}
        type="date"
        max="2017-01-01"
      ></Input>
      <Input
        name="phone"
        value={first.phone}
        onChange={onChangeHandler}
      ></Input>
      <Input
        name="email"
        value={first.email}
        onChange={onChangeHandler}
      ></Input>
      <Button onClick={onClickHandler}>Confirm</Button>
    </Box>
  );
}
