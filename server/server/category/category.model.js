import mongoose from "mongoose"
/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  name: String,
  name_vi: String,
  language_name: [{ lang: String, name: String }],
  tags: [],
  images: [],
  slug: String,
  enabled: Boolean,
  parentId: mongoose.Schema.Types.ObjectId,
  childs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  metadata: {},
  _created: { type: Date, required: true, default: Date.now },
  _updated: { type: Date, required: true, default: Date.now }
})
CategorySchema.index({ name: 1, parentId: 1 })

export default mongoose.model("Category", CategorySchema)
