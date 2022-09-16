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
import { getSession } from 'next-auth/react';
import axiosInstance from '../../src/config/api';
import next from 'next';
import { BsWindowSidebar } from 'react-icons/bs';

function AddAddress(props) {
  const { isOpen, onClose } = props;
  const [addressDetail, setAddressDetail] = useState({});
  const [getProvince, setGetProvince] = useState([]);
  const [getCity, setGetCity] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isProcessDone, setIsProcessDone] = useState(false);

  const splitProvince = selectedProvince.split(',');
  const province_id = splitProvince[0];
  const province = splitProvince[1];

  const splitCity = selectedCity.split(',');
  const city_id = splitCity[0];
  const city_name = splitCity[1];

  const { address } = addressDetail;

  useEffect(() => {
    getAllProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getAllCity();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (isProcessDone) {
      props.renderAddress();
    }
  }, [isProcessDone]);

  const onAddAddress = async () => {
    try {
      setDisabled(true);
      const session = await getSession();
      const { accessToken } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const body = {
        address,
        province_id,
        province,
        city_id,
        city_name,
      };

      const res = await axiosInstance.post(
        '/addresses/createAddress',
        body,
        config,
      );

      setIsProcessDone(true);

      alert(res.data.message);
    } catch (error) {
      console.log({ error });
      alert(error.response.data.message);
    } finally {
      setDisabled(false), setIsProcessDone(false);
    }
  };

  const getAllProvince = async () => {
    try {
      const resGetProvince = await axiosInstance('/rajaongkir/provinsi');
      setGetProvince(resGetProvince.data.rajaongkir.results);
    } catch (error) {
      next(error);
    }
  };
  const getAllCity = async () => {
    try {
      const resGetCity = await axiosInstance.get(
        `/rajaongkir/kota/${selectedProvince}`,
      );
      setGetCity(resGetCity.data.rajaongkir.results);
    } catch (error) {
      next(error);
    }
  };

  const renderProvince = () => {
    return getProvince.map((province) => (
      <option value={`${province.province_id},${province.province}`}>
        {province.province}
      </option>
    ));
  };

  const renderCity = () => {
    return getCity.map((city) => (
      <option value={`${city.city_id},${city.city_name}`}>
        {city.city_name}
      </option>
    ));
  };

  const onHandleChange = (e) => {
    setAddressDetail({ ...addressDetail, [e.target.name]: e.target.value });
  };

  const onHandleChangeProvince = (e) => {
    setSelectedProvince(e.target.value);
  };

  const onHandleChangeCity = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Alamat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize={'sm'}>Alamat</FormLabel>
            <Input
              name="address"
              type="text"
              value={address}
              variant="filled"
              mb={3}
              fontWeight={400}
              placeholder="Tulis Alamat"
              onChange={onHandleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Provinsi</FormLabel>
            <Select
              _focusVisible
              name="province_id"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Provinsi"
              variant="filled"
              onChange={onHandleChangeProvince}
            >
              {renderProvince()}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'sm'}>Kota</FormLabel>
            <Select
              _focusVisible
              name="city_id"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Kota"
              variant="filled"
              onChange={onHandleChangeCity}
            >
              {renderCity()}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={disabled}
            colorScheme="twitter"
            mr={3}
            onClick={() => onAddAddress()}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAddress;
