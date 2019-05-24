// 路由模块
const express = require('express')
const Student = require('./student')
// 得到路由容器
const router = express.Router()
/*
  * 下面就是把每条路由都挂载到路由容器中
*/
// 请求'/'，显示全部学生信息
router.get('/', (req, res) => {
  // 调用Student.find()API，获取所有学生信息
  Student.find((err, data) => {
    if (err) {
      return res.status(500).send('server error...')
    }
    let students = data // 得到全部学生信息数组
    res.render('index.html', {
      students: students,
      Labels: ['苹果', '香蕉', '橘子', '西瓜'],
      titles: ['id', 'name', 'age', 'hobbies', 'setting']
    })
  })
})

// 请求/add'，显示添加学生信息的界面
router.get('/add', (req, res) => {
  res.render('add.html')
})

// 表单post提交数据到'/add'，处理数据后重定向至'/'
router.post('/add', (req, res) => {
  /*
    *获取表单提交的数据
    *添加到数据文件中
    *重定向至首页，显示新提交的学生信息
  */
  const student = req.body
  Student.save(student, (err, data) => {
    if (err) {
      return res.status(500).send('server error...')
    }
    res.redirect('/')
  })
})
// 请求'/edit'，展示编译学生信息界面
router.get('/edit', (req, res) => {
  let id = req.query.id
  Student.findById(id, (err, student) => {
    if (err) {
      return res.status(500).send('server error...')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

// 获取post请求提交的数据，更新学生信息，重定向到'/'
router.post('/edit', (req, res) => {
  /**
   * 获取新修改的post请求提交的学生信息
   * 处理数据文件，修改学生信息
   * 重定向到'/'
   */
  const student = req.body
  Student.updateById(student, (err, student) => {
    if (err) {
      return res.status(500).send('server error...')
    }
    res.redirect('/')
  })
})
// 当请求'/delete'，根据id值删除相应的学生信息，重定向到'/'
router.get('/delete', (req, res) => {
  let id = req.query.id
  Student.deleteById(id, (err, student) => {
    if (err) {
      return res.status(500).send('server error...')
    }
    res.redirect('/')
  })
})

module.exports = router