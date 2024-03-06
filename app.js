const express = require('express')
const app = express()
const port = 3000

// 首頁
app.get('/', (req, res) => {
  res.redirect('/movies')
})

// 首頁:電影列表
app.get('/movies', (req, res) => {
  res.send('listing movies')
})

// 取得單一電影資訊
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  res.send(`render movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})