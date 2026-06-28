import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
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

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>商品一覧</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem' }}>{product.name}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>¥{product.price.toLocaleString()}</p>
            <p style={{ fontSize: '0.85rem', color: '#999' }}>在庫: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
