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

function EditProfile(props) {
  const { isOpen, onClose, userProfile, onSaveProfile } = props;
  // userProfile : { username, firstName, lastName, email, gender, phone, age }
  const [user, setUser] = useState(userProfile);
  const { first_name, last_name, email, phone, birthDate } = user;
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
            mb="4"
            rounded={'full'}
            width="20%"
            src={
              'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
          <Input
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
          {/* <Select
            name="gender"
            value={gender}
            variant="filled"
            onChange={onHandleChange}
            mb={3}
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </Select> */}

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
            value={birthDate}
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
