import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function OrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p style={{ padding: '2rem' }}>読み込み中...</p>
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <Link to="/">← 商品一覧に戻る</Link>
        <h1>注文履歴</h1>
        <p>注文履歴がありません。</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link to="/">← 商品一覧に戻る</Link>
      <h1>注文履歴</h1>
      <div>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>注文番号: {order.id}</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
                  {new Date(order.created_at).toLocaleString('ja-JP')}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>¥{order.total_price.toLocaleString()}</p>
                <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>{order.status}</p>
              </div>
            </div>
            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
              {order.items.map((item) => (
                <p key={item.id} style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#444' }}>
                  {item.product_name} × {item.quantity} (¥{item.price.toLocaleString()})
                </p>
              ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <Link to={`/orders/${order.id}/complete`} style={{ fontSize: '0.85rem' }}>
                詳細を見る
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderList
