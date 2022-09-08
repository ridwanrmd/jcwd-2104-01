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
} from '@chakra-ui/react';
import { useState } from 'react';
import { api_origin } from '../../constraint';

function EditProfile(props) {
  const { isOpen, onClose, userProfile, onSaveProfile } = props;
  const [user, setUser] = useState(userProfile);
  const [imageSource, setImageSource] = useState(api_origin + user.image);
  const { first_name, last_name, email, phone, birthDate, image, gender } =
    user;

  const onHandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            objectFit={'cover'}
            mb="4"
            rounded={'full'}
            w="80px"
            h="80px"
            src={imageSource}
          />
          <input
            type="file"
            onChange={(e) => {
              setUser({ ...user, profileImages: e.target.files[0] });
              setImageSource(URL.createObjectURL(event.target.files[0]));
            }}
          />
          <input
            name="first_name"
            type="text"
            value={first_name}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="last_name"
            type="text"
            value={last_name}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="email"
            type="text"
            value={email}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Select
            name="gender"
            value={gender}
            variant="filled"
            onChange={onHandleChange}
            mb={3}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>

          <Input
            name="phone"
            type="text"
            value={phone}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="birthDate"
            value={birthDate.slice(0, 10)}
            onChange={onHandleChange}
            type="date"
            max="2017-01-01"
          />
        </ModalBody>

        <ModalFooter>
          <Button
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
