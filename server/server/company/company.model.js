import mongoose from 'mongoose'

const Types = mongoose.Schema.Types
const CompanySchema = new mongoose.Schema({
  images: [],
  thumbImage: String,
  name: String,
  description: String,
  shortDescription: String,
  address: String,
  phoneNumber: String,
  fax: String,
  website: String,
  email: String,
  taxNumber: String,
  openYear: Number,
  employeeNumber: Number,

  categoryId: mongoose.Schema.Types.ObjectId,
  categoryName: String,
  categories: [
    {
      id: Types.ObjectId,
      name: String,
      slug: String
    }
  ],
  rating: {
    totalNumber: Number,
    value: Number
  },
  _created: { type: Date, required: true, default: Date.now },
  _updated: { type: Date, required: true, default: Date.now }
})
CompanySchema.index({ manga_name: 'text' })
CompanySchema.index({ link: 1 })
export default mongoose.model('Company', CompanySchema)
