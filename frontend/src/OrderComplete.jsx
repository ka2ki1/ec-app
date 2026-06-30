import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function OrderComplete() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p style={{ padding: '2rem' }}>読み込み中...</p>
  }

  if (!order) {
    return <p style={{ padding: '2rem' }}>注文情報が見つかりませんでした。</p>
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ご注文ありがとうございました!</h1>
      <p>注文番号: {order.id}</p>
      <div>
        {order.items.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
            <p style={{ margin: 0 }}>
              {item.product_name} × {item.quantity} (¥{item.price.toLocaleString()})
            </p>
          </div>
        ))}
      </div>
      <h2 style={{ textAlign: 'right' }}>合計: ¥{order.total_price.toLocaleString()}</h2>
      <Link to="/">買い物を続ける</Link>
    </div>
  )
}

export default OrderComplete
