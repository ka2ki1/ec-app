import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'

function Cart() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice, totalCount } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <Link to="/">← 一覧に戻る</Link>
        <h1>カート</h1>
        <p>カートは空です。</p>
      </div>
    )
  }

  async function handleCheckout() {
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || '注文に失敗しました')
      }

      clearCart()
      navigate(`/orders/${data.id}/complete`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={handleCheckout}
          disabled={submitting}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
        >
          {submitting ? '処理中...' : '注文を確定する'}
        </button>
      </div>
    </div>
  )
}

export default Cart
