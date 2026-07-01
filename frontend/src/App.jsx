import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import OrderComplete from './OrderComplete'
import OrderList from './OrderList'
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id/complete" element={<OrderComplete />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
