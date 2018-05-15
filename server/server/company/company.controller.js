import httpStatus from "http-status"
import fs from "fs-extra"
import APIError from "../helpers/APIError"
import Company from "./company.model"
import Category from "../category/category.model"

const debug = require("debug")("multiple-ecommerce:product-controller") // eslint-disable-line
/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Company.findById(id, (error, product) => {
    // eslint-disable-line
    if (error)
      return next(
        new APIError(
          "Error when get product detail data" + error,
          httpStatus.INTERNAL_SERVER_ERROR
        )
      )
    if (!product)
      return next(
        new APIError("Cannot find product id", httpStatus.BAD_REQUEST)
      )
    req.product = product
    // req.product = { // eslint-disable-line no-param-reassign
    //   id: '123',
    //   title: 'Áo thun nam',
    //   price: 100000,
    //   description: `Chất liệu thun lạnh cao cấp, thiết kế trẻ trung. năng động.
    //   Thích hợp đi chơi, dã ngoại, thể thao,du lịch, tập gym...
    //   Màu sắc trẻ trung đa dạng là SẢN PHẨM ĐƯỢC NHIỀU BẠN TÌM KIẾM TRONG NĂM 2017
    //   Size :M,L,XL,XXL`,
    //   images: ['https://cf.shopee.vn/file/36e159057526fb191278fe4cf6ca2e3f', 'https://cf.shopee.vn/file/75a27a6645dd8423e88b805442ba1ebb']
    // };
    return next()
  })
}

function get(req, res) {
  return res.json({ success: true, data: req.product })
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  // eslint-disable-line
  const { limit = 50, skip = 0 } = req.query // eslint-disable-line
  // const product_example = { // eslint-disable-line
  //   title: 'Áo thun nam',
  //   price: 100000,
  //   image: 'https://cf.shopee.vn/file/36e159057526fb191278fe4cf6ca2e3f'
  // }
  // let i = 0
  // const data = []
  // for (i = 0; i < 30; i++) { // eslint-disable-line
  //   data.push(product_example)
  // }
  // return res.json({ success: true, data });

  Company.find()
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec()
    .then(products => res.json({ success: true, data: products }))
    .catch(e => next(e))
}

async function create(req, res, next) {
  const company = new Company(req.body)
  const folderPath = `uploads/${company._id}`
  return fs
    .ensureDir(folderPath)
    .then(() => {
      if (req.files)
        req.files.map((file, index) => {
          // eslint-disable-line
          if (file.fieldname === "image") {
            const filePath = `${folderPath}/${index}`
            fs.moveSync(file.path, filePath)
            company.images.push("http://" + req.headers.host + "/" + filePath)
          } else {
            const filePath = `${folderPath}/thumb`
            fs.moveSync(file.path, filePath)
            company.thumbImage = "http://" + req.headers.host + "/" + filePath
          }
        })
      return company
        .save()
        .then(saved => res.status(201).json({ success: true, data: saved }))
        .catch(e => next(e))
    })
    .catch(e => next(e))

  // const findAll = async firstCatalog => {
  //   const result = [{ id: firstCatalog._id, name: firstCatalog.name, slug: firstCatalog.slug }]
  //   let catalog = firstCatalog
  //   while (catalog && catalog.parentId) {
  //     const foundCatalog = await Category.findById(catalog.parentId).exec()
  //     if (foundCatalog) {
  //       const object = {
  //         id: foundCatalog._id,
  //         name: foundCatalog.name,
  //         slug: foundCatalog.slug
  //       }
  //       result.unshift(object)
  //       catalog = foundCatalog
  //     }
  //   }
  //   return result
  // }
  // const userId = req.user._id
  // // debug('body', req.body)
  // if (!req.body.name || !req.body.price) {
  //   return next(new APIError('Missing name or price', httpStatus.BAD_REQUEST))
  // }
  // let FindedCategory = req.body.category || []
  // if (req.body.categoryName) {
  //   FindedCategory = await Category.find({ name: req.body.categoryName }).exec()
  //   // debug('categoryName', categoryId)
  // } else if (req.body.categoryId) {
  //   FindedCategory = await Category.find({ _id: req.body.categoryId }).exec()
  // }
  // const product = new Company(req.body)
  // product.shopId = req.user ? req.user._id : null
  // if (FindedCategory.length > 0) {
  //   product.categoryId = FindedCategory[0]._id
  //   product.categoryName = FindedCategory[0].name
  //   product.categories = findAll(FindedCategory[0])
  // }

  // const folderPath = `uploads/${userId}/${product._id}`
  // return fs
  //   .ensureDir(folderPath)
  //   .then(() => {
  //     req.files.map((file, index) => {
  //       // eslint-disable-line
  //       if (file.fieldname === 'image') {
  //         const filePath = `${folderPath}/${index}`
  //         fs.moveSync(file.path, filePath)
  //         product.images.push('http://' + req.headers.host + '/' + filePath)
  //       } else {
  //         const filePath = `${folderPath}/thumb`
  //         fs.moveSync(file.path, filePath)
  //         product.thumbImage = 'http://' + req.headers.host + '/' + filePath
  //       }
  //     })
  //     return product
  //       .save()
  //       .then(savedProduct => res.status(201).json({ success: true, data: savedProduct }))
  //       .catch(e => next(e))
  //   })
  //   .catch(e => next(e))
}

function update(req, res, next) {
  const updateDoc = req.body
  delete updateDoc._id
  updateDoc._updated = new Date()
  // Update: delete image and update new images (not done yet)
  // todo ....
  // Update: delete image and update new images (not done yet)
  Company.findByIdAndUpdate(req.body.id, updateDoc, error => {
    if (error) return next(new APIError("Error when get username data"))
    return res.status(httpStatus.OK).json({ success: true })
  })
}

function deleteImages(req, res, next) {
  const images = req.body.images
  const productId = req.body.productId
  images.map(item => {
    const imagePath = item.replace(`${req.protocol}://${req.get("host")}/`, "")
    debug("imagePath", imagePath)
    fs.removeSync(imagePath)
  })
  Company.findByIdAndUpdate(
    productId,
    { $pull: { images: { $in: images } } },
    { new: true }
  )
    .then(product =>
      res.status(httpStatus.OK).json({ success: true, data: product })
    )
    .catch(e => next(e))
}

function _countProductCategory(categoryId) {
  return Company.find({ categoryId: categoryId })
    .count()
    .exec()
}

function _findProductCategory(categoryId, limit, skip) {
  return Company.find({ categoryId: categoryId })
    .sort({ name: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec()
  // return Company.find({ categories: { $elemMatch: { id: categoryId } } })
  //   .sort({ name: -1 })
  //   .skip(+skip)
  //   .limit(+limit)
  //   .exec()
}

function category(req, res, next) {
  const categoryId = req.params.categoryId
  const { pageSize = 50, pageNumber = 0 } = req.query // eslint-disable-line
  const findCategory = function(id) {
    return Category.findById(id).exec()
  }
  Promise.all([
    _countProductCategory(categoryId),
    _findProductCategory(categoryId, pageSize, pageNumber * pageSize),
    findCategory(categoryId)
  ])
    .then(results => {
      debug("result1", results[1])
      debug("result0", results[0])
      return res.status(httpStatus.OK).json({
        success: true,
        totalProducts: results[0],
        data: results[1],
        categoryInfo: results[2]
      })
    })
    .catch(err => next(new APIError("Error when search data" + err)))
  // Product.find({ categories: { $in: [categoryId] } })
  // Product.find({ categoryId })
  //     .sort({ name: -1 })
  //     .skip(+skip)
  //     .limit(+limit)
  //     .exec()
  //     .then(products => res.json({ success: true, data: products }))
  //     .catch(e => next(e));
}

function _countSearchProductCategory(keyword) {
  return Company.aggregate([
    { $match: { $text: { $search: keyword } } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
      }
    },
    { $project: { totalProducts: 1, "category._id": 1, "category.name": 1 } },
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ])
}

function _findSearchProductCategory(keyword, limit) {
  return Company.aggregate([
    { $match: { $text: { $search: keyword } } },
    { $limit: limit }
  ])
}

function search(req, res, next) {
  const keyword = req.body.keyword
  Promise.all([
    _countSearchProductCategory(keyword),
    _findSearchProductCategory(keyword, 50)
  ])
    .then(results => {
      return res
        .status(httpStatus.OK)
        .json({ success: true, category: results[0], data: results[1] })
    })
    .catch(err => next(new APIError("Error when search data" + err)))
}

function findTag(req, res, next) {
  const tag = req.params.tag
  const { limit = 50, skip = 0 } = req.query // eslint-disable-line
  Company.find({ tags: { $in: [tag] } })
    .sort({ name: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec()
    .then(products => res.json({ success: true, data: products }))
    .catch(e => next(e))
}

function _countgetMyProduct(shopId) {
  return Company.find({ shopId })
    .count()
    .exec()
}

function _findgetMyProduct(shopId, limit, skip) {
  return Company.find({ shopId })
    .sort({ name: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec()
}
function getMyProduct(req, res, next) {
  const userId = req.user._id
  let { pageSize = 50, pageNumber = 0 } = req.query
  pageSize = parseInt(pageSize, 10)
  pageNumber = parseInt(pageNumber, 10)
  if (isNaN(pageSize) || isNaN(pageNumber)) {
    pageSize = 50
    pageNumber = 0
  }
  Promise.all([
    _countgetMyProduct(userId),
    _findgetMyProduct(userId, pageSize, pageNumber * pageSize)
  ])
    .then(results => {
      return res.status(httpStatus.OK).json({
        success: true,
        total: results[0],
        pageSize,
        pageNumber,
        data: results[1]
      })
    })
    .catch(err => next(new APIError("Error when search data" + err)))
}

function updateInventory(product, type = "DECREASE") {
  return new Promise((resolve, reject) => {
    // eslint-disable-line
    const quantity = type === "DECREASE" ? -product.quantity : product.quantity
    Company.findByIdAndUpdate(product.productId, {
      $inc: { "inventory.quantity": quantity }
    })
      .exec()
      .then(result => {
        if (!result)
          resolve({
            success: false,
            data: product,
            message: "cannot find productId"
          })
        resolve({ success: true, data: product })
      })
      .catch(e => resolve({ succes: false, error: e }))
  })
}

function makeChangeInventory(products) {
  // const products = [
  //   { productId: '5937884d8f719b697f2beb7c', quantity: 2},
  //   { productId: '5937884e8f719b697f2beb7d', quantity: 2},
  //   { productId: '6937884e8f719b697f2beb7e', quantity: 2},
  // ]
  return new Promise((resolve, reject) => {
    // eslint-disable-line
    Promise.map(products, product => updateInventory(product, "DECREASE"))
      .then(results => {
        const failIndex = results.findIndex(item => !item.success)
        if (failIndex !== -1) {
          const reverseProduct = results.filter(item => item.success)
          Promise.map(reverseProduct, item => updateInventory(item, "INCREASE"))
            .then(() => resolve({ success: false, fail: results[failIndex] }))
            .catch(e =>
              resolve({
                success: false,
                fail: results[failIndex],
                reverseError: e
              })
            )
        } else {
          resolve({ success: true })
        }
      })
      .catch(e => reject(e))
  })
}
export default {
  load,
  get,
  list,
  create,
  update,
  category,
  search,
  findTag,
  deleteImages,
  getMyProduct,
  makeChangeInventory
}
