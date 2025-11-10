import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
  noteID: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: Object, required: true},
  tags: {type: Array, required: true},
  visibility: {type: String, required: true}
})

export default mongoose.model('Note', NoteSchema, 'Note')