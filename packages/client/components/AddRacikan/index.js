import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Image,
  FormLabel,
  FormControl,
  Flex,
  Box,
  FormErrorMessage,
  Checkbox,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function AddRacikan(props) {
  const { isOpen, onClose, onSaveCategory, category, productList } = props;
  const [kategori, setKategori] = useState([]);
  const [size, setSize] = useState(1);
  const [isError, setisError] = useState(false);
  const [isRequired, setisRequired] = useState(true);
  const [isCategoryError, setisCategoryError] = useState(false);
  const [productName, setProductName] = useState({
    productName: '',
    quantity: 0,
  });

  useEffect(() => {
    if (kategori.length) {
      setisRequired(false);
    } else {
      setisRequired(true);
    }
  }, [kategori]);

  const renderProductList = () => {
    return productList?.map((data) => (
      <option key={data.productId} value={data.productName}>
        {data.productName}
      </option>
    ));
  };

  const onSelectHandler = (e, key) => {
    // console.log(e.target.checked);
    // console.log(e.target.value);
    // console.log(key);
    const { checked } = e.target;
    if (checked) {
      setKategori([...kategori, { categoryId: key }]);
    } else {
      setKategori(kategori.filter((data) => data.categoryId != key));
    }
  };

  const renderCategory = () => {
    return category.map((data) => (
      // <option key={data.categoryId} value={data.category}>
      //   {data.category}
      // </option>
      <Checkbox
        key={data.categoryId}
        onChange={(e) => onSelectHandler(e, data.categoryId)}
        value={data.category}
        width="30%"
        isRequired={isRequired}
      >
        {data.category}
      </Checkbox>
    ));
  };

  //   useEffect(() => {
  //     const checkCategory = () => {
  //       if (category.category === '') {
  //         setisError(true);
  //         setisCategoryError(true);
  //         return;
  //       } else {
  //         setisError(false);
  //         setisCategoryError(false);
  //         return;
  //       }
  //     };
  //     checkCategory();
  //   }, [category]);

  const onHandleChange = (e) => {
    //   setCategory({ ...category, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    setProductName({ ...productName, [e.target.name]: e.target.value });
  };

  const onCancel = () => {
    //   setCategory({ category: '' });
    //   setImageSource();
    // delete category.categoryImages;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`hadeh ppusing ${productName}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buat Racikan</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmitHandler} method="post">
          <ModalBody>
            {/* <FormControl isInvalid={isCategoryError} mb={3}> */}
            <FormLabel fontSize={'sm'}>Nama Obat :</FormLabel>
            <Input
              name="category"
              type="text"
              variant="filled"
              onChange={onHandleChange}
              mb="2"
              required
            />
            <FormLabel fontSize={'sm'}>Quantity :</FormLabel>
            <Input
              name="quantity"
              type="number"
              max="5"
              variant="filled"
              onChange={onHandleChange}
              mb="2"
              required
            />
            <FormLabel fontSize={'sm'}>Kategory :</FormLabel>
            <Flex flexWrap="wrap" justifyContent="" mb="2">
              {renderCategory()}
            </Flex>
            <Text>Formula : </Text>
            <Flex>
              <Select
                name="category"
                defaultValue="Pilih Obat Satuan"
                // placeholder="Pilih Obat Satuan"
                // onChange={onSelectHandler}
                // style={{
                //   width: '50%',
                //   height: 'fit-content',
                //   padding: '5px',
                //   background: '#F5F6F6',
                // position: 'absolute',
                // }}
                // size={size}
                // onFocus={() => setSize(5)}
                // onBlur={() => setSize(1)}
                // onClick={() => setSize(1)}
                width={'fit-content'}
                required
              >
                <option value="Pilih Obat Satuan" hidden disabled>
                  Pilih Obat Satuan
                </option>
                {renderProductList()}
              </Select>

              <Input
                type="number"
                placeholder="masukkan quantity"
                marginInline="6"
                width="50%"
              />
              <Button colorScheme="whatsapp">Tambah</Button>
            </Flex>

            {/* {isCategoryError && (
                <FormErrorMessage fontSize={'xs'}>
                  Nama kategori tidak boleh kosong
                </FormErrorMessage>
              )}
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            {/* <Button textColor={'red'} mr={3} onClick={onCancel}>
            Reset
          </Button>
          <Button
            isDisabled={isError}
            colorScheme="green"
            mr={3}
            onClick={() => {
              onSaveCategory(category);
              onCancel();
            }}
          >
            Save
          </Button> */}
            <Button type="submit" colorScheme="twitter">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
