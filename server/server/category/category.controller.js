import httpStatus from 'http-status'
import APIError from '../helpers/APIError'
import Category from './category.model'

const debug = require('debug')('multiple-ecommerce:category-controller') // eslint-disable-line

function load(req, res, next, id) {
  Category.findById(id)
    .populate({
      path: 'childs',
      populate: {
        path: 'childs',
        populate: { path: 'childs', populate: { path: 'childs', populate: { path: 'childs' } } }
      }
    })
    .exec()
    .then((category) => {
      if (!category) return next(new APIError('Cannot find product id', httpStatus.BAD_REQUEST))
      req.category = category
      return next()
    })
    .catch(e => next(e))
}

function get(req, res) {
  return res.json({ success: true, data: req.category })
}

function checkCategoryIdExist(req) {
  return new Promise((resolve, reject) => {
    if (req.body.parentId) {
      return Category.findById(req.body.parentId)
        .then((docs) => {
          if (!docs) resolve({ exist: false, categoryId: null })
          resolve({ exist: true, categoryId: docs._id })
        })
        .catch(e => reject(e))
    } else if (req.body.parentName) {
      return Category.findOne({ name: req.body.parentName })
        .then((docs) => {
          if (!docs) resolve({ exist: false, categoryId: null })
          resolve({ exist: true, categoryId: docs._id })
        })
        .catch(e => reject(e))
    }
    return resolve({ exist: true, categoryId: null })
  })
}

function create(req, res, next) {
  console.log('body', req.body)
  if (!req.body.name) {
    return next(new APIError('Missing name', httpStatus.BAD_REQUEST))
  }
  return checkCategoryIdExist(req)
    .then((categoryParent) => {
      if (!categoryParent.exist) {
        return next(new APIError('parent category is not exist', httpStatus.BAD_REQUEST))
      }
      const category = new Category(req.body)
      if (categoryParent.categoryId) category.parentId = categoryParent.categoryId
      // need to move files to folder category/categoryId/file
      // use fs, bluebird
      if (req.files) { req.files.map(file => category.images.push(`http://${req.headers.host}/${file.path}`)) }
      return category
        .save()
        .then((savedcategory) => {
          if (categoryParent.categoryId) {
            Category.findByIdAndUpdate(categoryParent.categoryId, {
              $push: { childs: savedcategory._id }
            }).exec()
          }
          res.status(201).json({ success: true, data: savedcategory })
        })
        .catch(e => next(e))
    })
    .catch(e => next(e))
}

function update(req, res, next) {
  const updateDoc = req.body
  delete updateDoc._id
  updateDoc._updated = new Date()
  // Update: delete image and update new images (not done yet)
  // todo ....
  // Update: delete image and update new images (not done yet)
  Category.findByIdAndUpdate(req.body.id, updateDoc, (error, category) => {
    if (error) return next(new APIError('Error when get category data'))
    if (!category) return next(new APIError('Cannot find category id', httpStatus.BAD_REQUEST))
    return res.status(httpStatus.OK).json({ success: true })
  })
}

function list(req, res, next) {
  Category.find({ parentId: null })
    .sort({ name: -1 })
    .populate({
      path: 'childs',
      populate: {
        path: 'childs',
        populate: { path: 'childs', populate: { path: 'childs', populate: { path: 'childs' } } }
      }
    })
    .exec()
    .then((listCatalog) => {
      res.status(httpStatus.OK).json({ success: true, data: listCatalog })
      // debug('listcategory', listCatalog)
      // let listPromise = []
      // listCatalog.map(catalog => listPromise.push(Category.find({ parentId: catalog._id })))
      // Promise.all(listPromise).then((listChilds) => {
      //   let results = []
      //   listChilds.map((child, key) => {
      //     debug('child', child)
      //     debug('key', key)
      //     let item = {}
      //     item.name = listCatalog[key].name
      //     item._id = listCatalog[key]._id
      //     item.childs = child
      //     results.push(item)
      //   })
      //   res.status(httpStatus.OK).json({ success: true, data: results })
      // })
    })
    .catch(e => next(e))
}
export default { get, create, update, load, list }
