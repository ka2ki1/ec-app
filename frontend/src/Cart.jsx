import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

function Cart() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, totalCount } = useCart()

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <Link to="/">← 一覧に戻る</Link>
        <h1>カート</h1>
        <p>カートは空です。</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link to="/">← 一覧に戻る</Link>
      <h1>カート({totalCount}点)</h1>
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              padding: '0.75rem 0',
            }}
          >
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</p>
              <p style={{ margin: 0, color: '#666' }}>¥{item.price.toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => decreaseQuantity(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
              <span style={{ color: '#999', fontSize: '0.85rem' }}>
                (在庫: {item.stock})
              </span>
              <button onClick={() => removeFromCart(item.id)}>削除</button>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: 'right' }}>合計: ¥{totalPrice.toLocaleString()}</h2>
    </div>
  )
}

export default Cart
