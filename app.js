const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
// 取得movies
const movies = require('./public/jsons/movies.json').results
// 定義圖片URL
const BASE_IMG_URL = 'https://movie-list.alphacamp.io/posters/'

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

  //  ? 確保req.query.search不會出錯
  //  trim()會清空前後空白字串
  const keyword = req.query.search?.trim()
  // 如果有接收關鍵字，執行搜尋功能，否就變回原樣
  const matchedMovies = keyword ?
    // 使用filter回傳新陣列
    // 使用Object.values(mv)取出mv所有屬性形成陣列
    // 使用some是對陣列的值做出條件判斷會回傳true/false
    movies.filter(mv => Object.values(mv).some(property => {
      
      if (typeof property === 'string') {
        return property.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      }
      return false
    }))
    : movies
  res.render('index', { movies: matchedMovies, BASE_IMG_URL })
})

// 取得單一電影資訊
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  // 使用find會回傳條件的資料
  // mv.id的型態不是字串，所以加上toString()轉為字串才可以比對(===嚴格檢查，也會對比型態是否一樣)
  const movie = movies.find((mv) => mv.id.toString() === id)
  res.render('detail', { movie, BASE_IMG_URL })
})


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})