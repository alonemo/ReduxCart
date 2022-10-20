import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';
import { fetchCartData } from './store/cart-slice';

let isInitial = true; // workaround running useEffect when app starts

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const showCart = useSelector(state => state.ui.cartIsVisible); 
  const cart = useSelector(state => state.cart); 

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart)); 
    }
  }, [cart, dispatch]); 

  
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
