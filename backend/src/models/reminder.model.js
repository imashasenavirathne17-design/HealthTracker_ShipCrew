import mongoose from 'mongoose';
const reminderSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  type: { type: String, enum: ['medication','followup'], required: true },
  schedule: { cron: String, human: String },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastTriggeredAt: Date,
  status: { type: String, enum: ['active','snoozed','completed'], default: 'active' }
}, { timestamps: true });
export default mongoose.model('Reminder', reminderSchema);
