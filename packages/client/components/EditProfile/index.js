import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Input,
  Select,
  Image,
  FormLabel,
  FormControl,
  Flex,
  Box,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api_origin } from '../../constraint';
import * as yup from 'yup';

function EditProfile(props) {
  const { isOpen, onClose, userProfile, onSaveProfile } = props;
  const [user, setUser] = useState(userProfile);
  const [imageSource, setImageSource] = useState(api_origin + user.image);
  const [isEmailError, setisEmailError] = useState(true);
  const { first_name, last_name, email, phone, birthDate, image, gender } =
    user;

  let schema = yup.object().shape({
    email: yup.string().email(),
  });

  const checkValidity = async () => {
    const isEmailValid = await schema.isValid({
      email: user.email,
    });
    setisEmailError(isEmailValid);
  };

  const onHandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    checkValidity();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" flexDir={'column'}>
            <Box>
              <Image
                objectFit={'cover'}
                mb="4"
                rounded={'full'}
                w="80px"
                h="80px"
                src={imageSource}
                alt="profile image"
              />
            </Box>
            <Box>
              <FormControl>
                <FormLabel
                  mx={'auto'}
                  htmlFor="image"
                  cursor={'pointer'}
                  color="twitter.500"
                >
                  Ubah Foto Profile
                </FormLabel>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="image"
                  onChange={(e) => {
                    setUser({ ...user, profileImages: e.target.files[0] });
                    setImageSource(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </FormControl>
            </Box>
          </Flex>
          <FormControl>
            <FormLabel fontSize={'sm'}>Nama Depan :</FormLabel>
            <Input
              name="first_name"
              type="text"
              value={first_name}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Nama Belakang :</FormLabel>
            <Input
              name="last_name"
              type="text"
              value={last_name}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
          </FormControl>
          <FormControl isInvalid={!isEmailError}>
            <FormLabel fontSize={'sm'}>Email :</FormLabel>
            <Input
              name="email"
              type="text"
              value={email}
              variant="filled"
              onChange={onHandleChange}
            />
            {!isEmailError && (
              <FormErrorMessage fontSize={'sm'}>
                Email tidak valid
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Jenis Kelamin :</FormLabel>
            <Select
              name="gender"
              value={gender}
              variant="filled"
              onChange={onHandleChange}
              mb={3}
            >
              <option value="Male">Laki-laki</option>
              <option value="Female">Perempuan</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Nomor Handphone :</FormLabel>
            <Input
              name="phone"
              type="text"
              value={phone}
              variant="filled"
              mb={3}
              onChange={onHandleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Tanggal Lahir :</FormLabel>
            <Input
              name="birthDate"
              value={birthDate.slice(0, 10)}
              onChange={onHandleChange}
              type="date"
              max="2017-01-01"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={!isEmailError}
            colorScheme="green"
            mr={3}
            onClick={() => onSaveProfile(user)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
