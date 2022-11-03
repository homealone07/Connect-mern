import React, { useContext,useState, useEffect } from "react";
import data from "./data";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductScreens from "./screens/ProductScreens";
import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import CartScreens from "./screens/CartScreens";
import SignInScreens from "./screens/SignInScreens";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreens from "./screens/SignupScreens";
import PaymentMethodScreens from "./screens/PaymentMethodScreens";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from "./screens/ProfileScreen";
import  getError  from './utils';
import axios from 'axios';
import SearchBox from './Components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import Home from "./Components/Home";
import ServiceScreens from "./screens/ServiceScreens";
import Services from "./screens/Services";
import ProtectedRoute from './Components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './Components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import  Footer from "./Components/Footer";
import ProtectedSME from "./Components/ProtectedSME";
import MyProductScreen from "./screens/MyProductsScreen";
import AddNewProduct from "./screens/AddNewProduct";

function App() {
  const { state,dispatch:ctxDispatch } = useContext(Store);
  const { cart,userInfo,SMEInfo } = state;
  // console.log(SMEInfo)

  const signoutHandler = ()=>{
    ctxDispatch({type:'USER_SIGNOUT'});
    localStorage.clear();
    window.location.href = '/signin';
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      {/* <div > */}
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" className="text-white" expand="lg">
            <Container>
           
              <LinkContainer to="/">
                <Navbar.Brand>Connect</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
                <Nav variant="pills" className="me-auto navtext w-100 justify-content-end">
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/products" className="nav-link">Products</Link>
                  <Link to="/services" className="nav-link">Services</Link>
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>

                  {(userInfo || SMEInfo) ? (
                    <NavDropdown title={userInfo ? userInfo.name:SMEInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {(userInfo && userInfo.isAdmin) && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )
                  }
                  {
                    (SMEInfo) && (
                      <NavDropdown title="Enterprise" id="admin-nav-dropdown">
                      <LinkContainer to="/enterprise/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/enterprise/products">
                        <NavDropdown.Item>My Products/Services</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/enterprise/add">
                        <NavDropdown.Item>Add new Item</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/enterprise/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      
                    </NavDropdown>
                    )
                  }
                </Nav>
              </Navbar.Collapse>

            </Container>
          </Navbar>
        </header>
        
        <main>
          <Container className="mt-3 ml-0">
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/products" element={<HomeScreen />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceScreens />} />
              <Route path="/product/:slug" element={<ProductScreens />} />
              <Route path="/cart" element={<CartScreens />} />
              <Route path="/signin" element={<SignInScreens />} />
              <Route path="/signup" element={<SignupScreens />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreens />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/enterprise/dashboard" element={<ProtectedSME><DashboardScreen /></ProtectedSME>} />
              <Route path="/enterprise/add" element={<AddNewProduct />} />
              <Route
                path="/enterprise/products"
                element={
                  <ProtectedSME>
                    <MyProductScreen />
                  </ProtectedSME>
                }
              / >

              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchScreen />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
              <Route path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              / >
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />


            </Routes>
          </Container>
        </main>

        <footer>
          <Footer />
        </footer>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
