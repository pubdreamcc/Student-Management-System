/**
   * 操作数据的文件模块，不关心业务，只处理数据
      封装操作数据的API，方便于其他模块直接调用API即可操作数据
 */
const fs = require('fs')
// 保存学生信息
/**
 * 保存新添加的学生信息到数据文件中
 * 参数：
 * 1. 新加的学生信息对象
 * 2. callback回调函数，拿到异步操作的结果
 * callback中的参数：
 * 第一个参数err
 *   成功是null, 失败是错误对象
 *  第二个参数是结果
 *   成功是数组，失败是undefined
 */
exports.save = (student, callback) => {
  fs.readFile('./Db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 得到所有学生信息
    let students = JSON.parse(data).students
    // 为新加的学生添加一个唯一的id属性（原来最大id属性值基础上加1）
    if (students.length === 0) {
      // 如果原始数据文件中没有学生信息
      student.id = 1
    } else {
      student.id = parseInt(students[students.length-1].id) + 1
    }
    students.push(student)
    // 把新增加学生信息后的对象转换成字符串保存到数据文件中
    let dataStr = JSON.stringify({
      students: students
    })
    fs.writeFile('./Db.json', dataStr, err => {
      if (err) {
        // 如果写入失败，则把错误对象传递给它
        return callback(err)
      }
      // 成功就没错，所以错误对象是 null
      callback(null)
    })
  })
}
// 删除学生信息
/**
 * 根据id值删除对应学生信息，这里需要一个参数id，
 * callback回调函数接收两个参数：
 * 第一个参数：err
 * 成功时为null，失败时为错误对象
 * 第二个参数就是根据id值得到的学生对象，失败时为undefined
 */
exports.deleteById = (id, callback) => {
  fs.readFile('./Db.json', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let index = students.findIndex(item => {
      return item.id == id
    })
    students.splice(index, 1)
    // 重新调整剩余学生的id值，防止id值不连续
    students.forEach((item, index) => {
      item.id = index + 1
    })
    // 把所有学生信息转换为字符串，最后保存到数据文件中
    let dataStr = JSON.stringify({students: students})
    fs.writeFile('./Db.json', dataStr, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
// 根据id值查找学生信息
/**
 * 根据相应的id查询对应的学生信息，这里需要接收一个参数id值
 * callback回调函数接收两个参数：
 * 第一个参数：err
 * 成功时为null，失败时为错误对象
 * 第二个参数就是根据id值得到的学生对象，失败时为undefined
 */
exports.findById = (id, callback) => {
  fs.readFile('./Db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let ret = students.find(item => {
      return item.id == id
    })
    callback(null, ret)
  })
}
// 显示所有学生信息，利用回调函数得到异步操作的结果
/**
 * callback中的参数：
 *  第一个参数err
 *   成功是null, 失败是错误对象
 *  第二个参数是结果
 *   成功是数组，失败是undefined
 */
exports.find = (callback) => {
  fs.readFile('./Db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    // 成功则把获取的学生信息数组给到callback，注意第一个参数必须为‘null’
    callback(null, JSON.parse(data).students)
  })
}

// 根据对应id值，更新学生信息
/**
 * 接收两个参数
 * 1. 新修改的student信息
 * 2. callback
 * callbac需要两个参数
 * 1. err
 * 失败时为错误对象，成功时为null
 * 2. 第二个参数就是根据id值得到的学生对象，失败时为undefined
 */
exports.updateById = (student, callback) => {
  fs.readFile('./Db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let result = students.find(item => {
      return item.id == student.id
    })
    // 遍历新修改的学生信息对象，修改对应的学生信息
    for (const key in student) {      
      result[key] = student[key]
    }
    // 把所有学生信息对象转换成字符串，然后保存到数据文件中
    let dataStr = JSON.stringify({
      students: students
    })
    fs.writeFile('./Db.json', dataStr, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}