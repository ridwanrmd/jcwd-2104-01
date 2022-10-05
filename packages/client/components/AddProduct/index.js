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
  Box,
  Text,
  Select,
  Textarea,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosInstance from '../../src/config/api';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AddProduct(props) {
  const { isOpen, onClose, fetchProduct } = props;
  const [imageSource, setImageSource] = useState();
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [unit, setUnit] = useState();
  const [detailQuantity, setDetailQuantity] = useState();
  const [satuanUnit, setSatuanUnit] = useState();
  const [desc, setDesc] = useState();
  const [getCategory, setGetCategory] = useState([]);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const getAllCategory = await axiosInstance('/category/allCategory');
      setGetCategory(getAllCategory.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const renderCategory = () => {
    return getCategory.map((category) => (
      <option key={category.categoryId} value={category.categoryId}>
        {category.category}
      </option>
    ));
  };

  const onAddProduct = async () => {
    let path = router.asPath;
    try {
      const session = await getSession();
      const { accessToken } = session.user;

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const body = {
        productName,
        categoryId,
        stock,
        price,
        unit,
        satuanUnit,
        desc,
        detailQuantity,
      };

      if (productImage) {
        const gambar = productImage;
        const data = new FormData();
        const fileName = Date.now() + gambar.name;
        data.append('name', fileName);
        data.append('gambar', gambar);

        body.imageName = `/public/product/${fileName}`;
        try {
          await axiosInstance.post('/product/upload', data, config);
        } catch (error) {
          return alert(error.response.data.message);
        }
      }
      try {
        const res = await axiosInstance.post('/product/', body, config);
        toast({
          description: res.data.message,
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        return alert(error.response.data.message);
      }

      setImageSource();
      setProductImage();
      setProductName();
      setCategoryId();
      setDesc();
      setDetailQuantity();
      setPrice();
      setSatuanUnit();
      setStock();
      setUnit();

      onClose();
      router.push(path);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            htmlFor="image"
            fontWeight="500"
            fontSize="12px"
            lineHeight="16px"
            mb="4px"
          >
            Foto
          </Text>
          <VStack align="start">
            {!imageSource ? (
              <FormControl width="120px" height="120px">
                <Box
                  align="center"
                  width="120px"
                  height="120px"
                  border="1px solid #008DEB"
                  borderRadius="4px"
                  fontWeight="500"
                  fontSize="25"
                >
                  <FormLabel
                    pl="50px"
                    pt="40px"
                    width="120px"
                    height="120px"
                    htmlFor="image"
                    fontWeight="500"
                    fontSize="25px"
                    cursor={'pointer'}
                  >
                    +
                  </FormLabel>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    id="image"
                    name="productImage"
                    accept=".png, .svg"
                    onChange={(e) => {
                      setProductImage(e.target.files[0]);
                      setImageSource(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Box>
              </FormControl>
            ) : (
              <>
                <FormControl width="120px" height="120px">
                  <Box width="120px" height="120px">
                    <Image
                      border="1px solid #008DEB"
                      borderRadius="4px"
                      width="120px"
                      height="120px"
                      src={imageSource}
                      alt="gambar produk"
                    />
                  </Box>
                </FormControl>
                <HStack height="20px" width="140px" align="start">
                  <FormControl>
                    <FormLabel
                      pt="1"
                      bg="blue.100"
                      width="60px"
                      height="30px"
                      borderRadius="5px"
                      htmlFor="image"
                      cursor={'pointer'}
                      color="twitter.500"
                      textAlign={'center'}
                    >
                      Ubah
                    </FormLabel>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      id="image"
                      name="prescriptionImage"
                      accept=".png, .jpg, .gif"
                      onChange={(e) => {
                        setProductImage(e.target.files[0]);
                        setImageSource(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </FormControl>
                  <Button
                    onClick={() => {
                      setImageSource();
                      setProductImage();
                    }}
                    borderRadius="5px"
                    height="32px"
                    textColor={'red'}
                  >
                    cancel
                  </Button>
                </HStack>
              </>
            )}
          </VStack>

          <FormControl mt="20px" mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Nama Produk
            </FormLabel>
            <Input
              name="productName"
              type="text"
              variant="filled"
              placeholder="ex : Paramex"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Kategori
            </FormLabel>
            <Select
              _focusVisible
              name="categoryId"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Kategori"
              variant="filled"
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              {renderCategory()}
            </Select>
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Kemasan
            </FormLabel>
            <Select
              _focusVisible
              name="unit"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Kemasan"
              variant="filled"
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            >
              <option value="botol">Botol</option>
              <option value="strip">Strip</option>
              <option value="box">Box</option>
            </Select>
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Bentuk Obat
            </FormLabel>
            <Select
              _focusVisible
              name="satuanUnit"
              fontSize={{ base: '13', md: '14' }}
              fontWeight={400}
              placeholder="Pilih Bentuk Obat"
              variant="filled"
              onChange={(e) => {
                setSatuanUnit(e.target.value);
              }}
            >
              <option value="tablet">Tablet</option>
              <option value="kapsul">Kapsul</option>
              <option value="kaplet">Kaplet</option>
              <option value="pil">Pil</option>
              <option value="mL">mililiter</option>
            </Select>
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Jumlah Obat per-Kemasan
            </FormLabel>
            <Input
              name="detailQuantity"
              type="number"
              variant="filled"
              placeholder="ex : 20"
              onChange={(e) => {
                setDetailQuantity(e.target.value);
              }}
            />
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Harga
            </FormLabel>
            <Input
              name="price"
              type="number"
              variant="filled"
              placeholder="ex : 20000"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Jumlah Barang
            </FormLabel>
            <Input
              name="stock"
              type="number"
              variant="filled"
              placeholder="ex : 200"
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </FormControl>
          <FormControl mb="28px">
            <FormLabel
              mb="4px"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
            >
              Deskripsi
            </FormLabel>
            <Textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="twitter" mr={3} onClick={() => onAddProduct()}>
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
