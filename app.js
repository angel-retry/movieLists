const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

// 模板引擎
// 告訴Express遇到附檔名.hbs，就使用指定模板引擎來渲染他
app.engine('.hbs', engine({ extname: '.hbs' }));
// 設置Express應用程式的模板引擎為Handlebars
app.set('view engine', '.hbs');
// 設置Express應用程式的模板引擎目錄為./views
app.set('views', './views');

// 取得靜態網站
app.use(express.static('public'))

// 首頁
app.get('/', (req, res) => {
  res.redirect('/movies')
})

// 首頁:電影列表
app.get('/movies', (req, res) => {
  res.render('index')
})

// 取得單一電影資訊
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  res.send(`render movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})