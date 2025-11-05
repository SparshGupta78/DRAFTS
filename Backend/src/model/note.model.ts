import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  noteID: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: Object, required: true}
})

export default NoteSchema