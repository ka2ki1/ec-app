import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
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

  if (!product) {
    return <p style={{ padding: '2rem' }}>商品が見つかりませんでした。</p>
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link to="/">← 一覧に戻る</Link>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>¥{product.price.toLocaleString()}</p>
      <p style={{ color: '#666' }}>在庫: {product.stock}</p>
    </div>
  )
}

export default ProductDetail
