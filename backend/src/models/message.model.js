import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  threadId: String,
  toRoles: [String],
  toUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: String,
  priority: { type: String, enum: ['urgent','normal','info'], default: 'normal' },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attachments: [{ filename: String, path: String }]
}, { timestamps: true });
export default mongoose.model('Message', messageSchema);
