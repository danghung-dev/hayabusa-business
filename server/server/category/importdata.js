import request from "request"
import fs from "fs"
import Category from "./category.model"

const apiUrl = "http://localhost:4040/api/categories"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getData() {
  const data = fs.readFileSync("./server/category/data.txt", "utf8")
  const data1 = data.split("\n")
  console.log("data1", data1.length)
  await sleep(3000)
  data1.map(async function(t) {
    const tmp = t.split(",")
    await postData({ name: tmp[0], name_vi: tmp[1] }, apiUrl)
  })
}

function postData(data, url_api) {
  console.log("data", data)

  return new Promise((resolve, reject) => {
    request.post(
      {
        url: url_api,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      },
      (err, httpResponse, body) => {
        console.log("body", body)
        const body_json = JSON.parse(body)
        if (body_json.success) {
          resolve(`post success${data.name}`)
        } else {
          reject(`postfail ${body}`)
        }
      }
    )
  })
}

async function addVietnam() {
  const list = await Category.find().exec()
  let data = []
  const dtfile = fs.readFileSync("./server/category/data.txt", "utf8")
  const splitn = dtfile.split("\n")
  splitn.map(t => {
    const tmp = t.split(",")
    const ob = { en: tmp[0], vi: tmp[1] }
    data.push(ob)
  })
  list.map(async function(t) {
    for (let i = 0; i < data.length; i++) {
      if (t.name === data[i].en) {
        t.name_vi = data[i].vi
        await t.save()
        break
      }
    }
  })
}
addVietnam()

module.exports = {
  postData
}
