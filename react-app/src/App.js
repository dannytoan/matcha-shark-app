import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Products from './components/Products';
import ProductsDetails from './components/ProductDetail';
import NewProductForm from './components/NewProductForm';
import SplashPage from './components/SplashPage';
import Reviews from './components/Reviews';
import ShoppingBag from './components/ShoppingBag';
import PageNotFound from './components/PageNotFound';
import PaymentForm from './components/PaymentModal';
import OrderHistory from './components/OrderHistory'
import Profile from './components/Profile';
import ProfilePageMyShop from './components/ProfilePageMyShop';
import { authenticate } from './store/session';
import { viewProducts } from './store/products';
import { viewOrderHistory } from './store/orderHistory'



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(viewProducts());
      await dispatch(viewOrderHistory());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/products/all' exact={true} >
          <Products />
        </Route>
        <ProtectedRoute path='/product/new' exact={true} >
          <NewProductForm />
        </ProtectedRoute>
        <Route path='/product/:id' exact={true} >
          <ProductsDetails />
        </Route>
        <Route path='/reviews' exact={true} >
          <Reviews />
        </Route>
        <ProtectedRoute path='/cart' exact={true} >
          <ShoppingBag />
        </ProtectedRoute>
        <ProtectedRoute path='/payment' exact={true}>
          <PaymentForm />
        </ProtectedRoute>
        <ProtectedRoute path='/order-history' exact={true}>
          <OrderHistory />
        </ProtectedRoute>
        <ProtectedRoute path='/my-matchashark' exact={true}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/my-shop' exact={true}>
          <ProfilePageMyShop />
        </ProtectedRoute>
        <Route path='' exact={true} >
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
