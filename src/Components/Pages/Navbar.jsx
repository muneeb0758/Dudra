import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import "../Pages/Navbar.css";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { RiBattery2ChargeFill, RiCoinsFill } from "react-icons/ri";
import { MdLocalOffer } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { TbDiscount2, TbGift } from "react-icons/tb";
import { HiMenu } from "react-icons/hi";
import { VscReferences } from "react-icons/vsc";
import { CgSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { userLogout } from '../Redux/auth/auth.actions';
import dudra from './images/dudra.png';
import { allProducts } from "../ProductsPage/allprooducts";

const Navbar = ({ onSearch, setSearchTerm }) => {
  const [searchTerm, setLocalSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartManager.products);
  const username = useSelector((state) => state.authManager.userdata.username);
  const isAuth = useSelector((state) => state.authManager.isAuth);
  const toast = useToast();

  const handleSearchInputChange = (e) => {
    const keyword = e.target.value;
    setLocalSearchTerm(keyword);
    setSearchTerm(keyword);
  };

  const handleImageError = (e) => {
    const rating = Math.ceil(Math.random() * 4);
    e.target.src = rating < 3 
      ? "https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_Y0715100.jpg" 
      : "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwa8106b14/ProductImages/Face/BB_Cream/800897822927_bbcream_natural_main.jpg?sw=390&sh=390&sm=fit";
    e.target.onerror = null;
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
      setIsDropdownVisible(false);
      return;
    }

    const lowerKeyword = searchTerm.toLowerCase().trim();
    const allProductsArray = Object.values(allProducts.Brands).flat();

    const matches = allProductsArray.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerKeyword) ||
        product.brand.toLowerCase().includes(lowerKeyword) ||
        (product.category && product.category.toLowerCase().includes(lowerKeyword)) ||
        (product.description && product.description.toLowerCase().includes(lowerKeyword))
      );
    });

    setFilteredItems(matches.slice(0, 5));
    setIsDropdownVisible(matches.length > 0);
  }, [searchTerm]);

  const handleLogOut = () => {
    if (!isAuth) {
      toast({
        position: 'top-left',
        duration: 1200,
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='red' >
            <WarningIcon w={30} h={30} /><Text size="lg" ml="15px">You have not Signed in yet!!!</Text>
          </Flex >
        ),
      });
    } else {
      toast({
        position: 'top-left',
        duration: 1200,
        render: () => (
          <Flex color='white' border="4px solid white" p={"10px"} bgColor='green.400'>
            <CheckCircleIcon w={30} h={30} /><Text size="lg" ml="15px">Signed Out Successfully!!!</Text>
          </Flex >
        ),
      });
      dispatch(userLogout());
    }
  };

  return (
    <div>
      <Box id="top-bar"
        style={{
          backgroundColor: "#F2F2F2",
          padding: "10px",
          paddingRight: "30px",
          position: "sticky"
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItem: "center",
            gap: "50px",
            flexDirection: "row-reverse",
          }}
        >
          <Text>Help</Text>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Image
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
            />
            <Text>UK - GBP</Text>
          </Box>
        </Box>
      </Box>
      <Box position={'fixed'} top='0px' zIndex={100} bgColor='white' w='100%'>
        <Box id="after-top">
          <Box>
            <Link to='/'>
              <Image className="logo" src={dudra} alt="logo" />
            </Link>
          </Box>

          <div id="search-bar" style={{ position: 'relative' }}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => filteredItems.length > 0 && setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
              />
              <InputRightElement children={<Search2Icon color="gray.500" />} />
            </InputGroup>

            {isDropdownVisible && filteredItems.length > 0 && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                right="0"
                zIndex="1000"
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                mt={1}
                maxHeight="200px" // Reduced height for compactness
                overflowY="auto"
                border="1px solid"
                borderColor="gray.200"
                p={2}
              >
                {filteredItems.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                      setLocalSearchTerm('');
                      setFilteredItems([]);
                      setIsDropdownVisible(false);
                    }}
                  >
                    <Box
                      p={2}
                      _hover={{ bg: "gray.50" }}
                      borderBottom="1px solid"
                      borderColor="gray.100"
                      display="flex"
                      alignItems="center"
                      gap={3}
                      height="60px" // Fixed height for each item
                    >
                      <Image
                        src={product.image_link}
                        boxSize="40px" // Smaller, fixed image size
                        objectFit="contain"
                        onError={handleImageError}
                        alt={product.name}
                        borderRadius="sm"
                      />
                      <Box flex="1">
                        <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                          {product.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600" noOfLines={1}>
                          {product.brand}
                        </Text>
                        <Text fontSize="sm" color="blue.600" fontWeight="semibold">
                          {product.price ? `£${product.price}` : "Price not available"}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Box>
            )}
          </div>

          <div style={{ display: "flex", gap: "50px" }}>
            <div id="dropdown-account">
              <div>
                <Link to="/login" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <VscAccount size="1.6em" />
                  <Text>{isAuth ? username : "Account"}</Text>
                </Link>
              </div>
              <div id="dropdown-account-content">
                {
                  isAuth ? <Button onClick={handleLogOut}
                    colorScheme="none"
                    w="full"
                    bgColor="black"
                    borderRadius={0}
                  >
                    LOGOUT
                  </Button> : <Link to="/login"><Button
                    colorScheme="none"
                    w="full"
                    bgColor="black"
                    borderRadius={0}
                  >
                    LOGIN
                  </Button></Link>
                }
                <Link to="/signup">
                  <Button
                    colorScheme="none"
                    mt={4}
                    borderRadius={0}
                    color="black"
                    w="full"
                    variant="outline"
                  >
                    REGISTER
                  </Button>
                </Link>

                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "20px",
                    fontSize: "16px",
                  }}
                >
                  <p>Wishlist</p>
                  <p>Your Orders</p>
                  <p>Your Referrals</p>
                </div>
              </div>
            </div>

            <div class="dropdown">
              <Link to="/cart"><div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div id="cart-icon">
                  <FaShoppingCart size="1.6em" />
                  <p className="cartValue">{cartItems.length}</p>
                </div>

                <Text>Cart</Text>
              </div></Link>
              <div class="dropdown-content">
                <p>{`There are currently ${cartItems.length} items in your cart.`}</p>
              </div>
            </div>
          </div>
        </Box>

        <Box id="menu_nav" style={{ borderTop: "2px solid black" }} borderBottom='1px solid gainsboro'>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-evenly"
            width="84%"
            margin="auto"
            id="hover-black"
          >
            <div id="menu-dropdown">
              <div className="menu-dropdown-content">
                <Box display="flex" gap="50px" pt={5} padding="20px">
                  <div style={{ fontFamily: "sans-serif", paddingLeft: "20px" }}>
                    <p style={{
                      paddingTop: "15px",
                      textAlign: "left",
                      borderTop: "1px solid gray",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}>
                      Shop by Brand
                    </p>
                    <div style={{
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}>
                      <Link to='/brands'><p>All Brands</p></Link>
                      <Link to='/brands/Dudra'><p>Dudra</p></Link>
                      <Link to='/brands/countryrange'><p>Country Range</p></Link>
                      <Link to='/brands/eurocollection'><p>Euro Collection</p></Link>
                      <Link to='/brands/naturevalley'><p>Nature Valley</p></Link>
                    </div>
                  </div>
                </Box>
              </div>
            </div>

            { <div id="menu-dropdown">
              <Link to='/sale'> <div id="menu-title">All Products</div></Link>
              <div className="menu-dropdown-content">
              </div>
            </div> }

            <div id="menu-dropdown">
              <Link to='/breakfast'><div id="menu-title">Snacks</div></Link>
              <div className="menu-dropdown-content">
                <Box display="flex" gap="50px" pt={5} padding="20px">
                  <div style={{ fontFamily: "sans-serif", paddingLeft: "20px" }}>
                    <p
                      style={{
                        paddingTop: "15px",
                        textAlign: "left",
                        borderTop: "1px solid gray",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      Popular Categories
                    </p>
                    <div
                      style={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Link to='/hair'><p>View All Snacks</p></Link>
                      <Link to='/hair'><p>New In</p></Link>
                      <Link to='/hair'><p>Breakfast Cereals</p></Link>
                      <Link to='/hair'><p>Chocolates and Biscuits</p></Link>
                      <Link to='/hair'><p>Drinks</p></Link>
                    </div>
                  </div>
                </Box>
              </div>
            </div>

            <div>
              <Link to='/fruits'><div id="menu-title">Fruits & Veg</div></Link>
            </div>
            <div>
              <Link to='/bathbeauty'><div id="menu-title">Bath & Body</div></Link>
            </div>
            <div>
              <Link to='/spices'><div id="menu-title">Spices</div></Link>
            </div>

            <div>
              <Link to='/packaging'><div id="menu-title">Packaging</div></Link>
            </div>
          </Box>
        </Box>
      </Box>

      <Box bgColor="#f2f2f2" alignItems="center" id="bottom_nav">
        <Box mt={120}
          alignItems="center"
          display="flex"
          py={5}
          pl={20}
          pr={20}
          fontSize="14px"
          justifyContent="space-evenly"
        >
          <Box display="flex" alignItems="center" gap="10px">
            <FaShoppingCart size="1.5em" />
            <p>FREE UK Shipping Over £49</p>
          </Box>

          <Box display="flex" alignItems="center" gap="10px">
            <RiCoinsFill size="1.5em" />
            <p> Refer a Friend, Get £15</p>
          </Box>

          <Box display="flex" alignItems="center" gap="10px">
            <RiBattery2ChargeFill size="1.5em" />
            <p> New Customers Save 20% - Use Code NEWBIE</p>
          </Box>
        </Box>
      </Box>

      <div id="mobile_bar" style={{ position: "fixed", backgroundColor: "white", width: "100%", top: "0", zIndex: "100", marginBottom: "300px", borderBottom: "1px solid gainsboro" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ marginLeft: "30px" }}>
            <HiMenu ref={btnRef} colorScheme="teal" onClick={onOpen} size="1.6em" />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
              height="100vh"
              size="xs"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                {
                  isAuth ? <DrawerHeader mt={12} onClick={onClose} display="flex" gap={12}>
                    <Text> {isAuth ? "Hii " + username : "Account"}</Text>
                    <Button bgColor="black" color="white" colorScheme="none" onClick={handleLogOut}>Logout</Button>
                  </DrawerHeader> : <DrawerHeader mt={12}>
                    <Link to="/login" onClick={onClose}>
                      <Button bgColor="black" color="white" colorScheme="none">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={onClose}>
                      <Button variant="outline" border=" 1px solid black" ml={4} colorScheme="none">Register</Button>
                    </Link>
                  </DrawerHeader>
                }

                <DrawerBody>
                  <Box display="flex" flexDirection="column" gap="20px">
                    <Link to="/brands" onClick={onClose}>Brands</Link>
                    <Link to="/holiday" onClick={onClose}>Holiday Gift</Link>
                    <Link to="/sale" onClick={onClose}>Sale</Link>
                    <Link to="/skincare" onClick={onClose}>Skin Care</Link>
                    <Link to="/hair" onClick={onClose}>Hair Care</Link>
                    <Link to="/makeup" onClick={onClose}>Makeup</Link>
                    <Link to="/bathbeauty" onClick={onClose}>Bath & Body</Link>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>

          <CgSearch size="1.5em" />
        </div>

        <div>
          <Link to="/">
            <img style={{ width: "90px", height: "25px" }} src={dudra} alt="logo" />
          </Link>
        </div>

        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <Link to="/login">
            <VscAccount size="1.6em" />
          </Link>
          <div class="dropdown" style={{ paddingRight: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div id="cart-icon">
                <Link to="/cart">
                  <FaShoppingCart size="1.6em" />
                  <p className="cartValue">{cartItems.length}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;