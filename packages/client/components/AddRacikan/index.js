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
  FormLabel,
  Flex,
  Checkbox,
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../../src/config/api';

export default function AddRacikan(props) {
  const { isOpen, onClose, category, productList, getSession } = props;
  const [kategori, setKategori] = useState([]);
  const [isRequired, setisRequired] = useState(true);
  const [quantityFormula, setQuantityFormula] = useState();
  const [productFormula, setProductFormula] = useState();
  const [formula, setFormula] = useState([]);
  const [product, setProduct] = useState({
    productName: '',
    quantity: 0,
  });

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (kategori.length) {
      setisRequired(false);
    } else {
      setisRequired(true);
    }
  }, [kategori]);

  const onDeleteHandler = (productName) => {
    setFormula(formula.filter((data) => data.productName != productName));
  };

  const renderFormula = () => {
    return formula.map((data) => {
      return (
        <Tr key={data.quantity}>
          <Td>{data.productName}</Td>
          <Td>{data.quantity}</Td>
          <Td>
            <Button
              size="sm"
              colorScheme={'red'}
              onClick={() => onDeleteHandler(data.productName)}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  const onTambahHandler = () => {
    let obj = { productName: productFormula, quantity: quantityFormula };
    setFormula([...formula, obj]);
    setQuantityFormula('');
  };

  const renderProductList = () => {
    return productList?.map((data) => (
      <option key={data.productId} value={data.productName}>
        {data.productName}
      </option>
    ));
  };

  const onCheckedHandler = (e, key) => {
    const { checked } = e.target;
    if (checked) {
      setKategori([...kategori, { categoryId: key }]);
    } else {
      setKategori(kategori.filter((data) => data.categoryId != key));
    }
  };

  const renderCategory = () => {
    return category.map((data) => (
      <Checkbox
        key={data.categoryId}
        onChange={(e) => onCheckedHandler(e, data.categoryId)}
        value={data.category}
        width="30%"
        isRequired={isRequired}
      >
        {data.category}
      </Checkbox>
    ));
  };

  const onHandleChange = (e) => {
    //   setCategory({ ...category, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onCancel = () => {
    //   setCategory({ category: '' });
    //   setImageSource();
    // delete category.categoryImages;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let path = router.asPath;
    const session = await getSession();
    const { accessToken } = session.user;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    let body = {
      productName: product.productName,
      stock: product.quantity,
      kategori,
      formula,
    };

    try {
      const res = await axiosInstance.post('/product/racikan', body, config);
      toast({
        description: res.data.message,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      router.push(path);
    } catch (error) {
      return alert(error.response.data.message);
    }
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
              name="productName"
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
              min="1"
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
            <Flex mb="4">
              <Select
                name="category"
                defaultValue="Pilih Obat Satuan"
                onChange={(e) => setProductFormula(e.target.value)}
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
                name="quantity"
                marginInline="6"
                width="50%"
                value={quantityFormula}
                onChange={(e) => setQuantityFormula(e.target.value)}
              />
              <Button colorScheme="whatsapp" onClick={onTambahHandler}>
                Tambah
              </Button>
            </Flex>
            {formula.length != 0 && (
              <TableContainer>
                <Table
                  variant="striped"
                  colorScheme="teal"
                  size="sm"
                  width="70%"
                >
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Quantity</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{renderFormula()}</Tbody>
                </Table>
              </TableContainer>
            )}
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
