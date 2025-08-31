import mongoose from 'mongoose';
const incidentSchema = new mongoose.Schema({
  caseId: { type: String, unique: true },
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew' },
  notes: [{ at: { type: Date, default: Date.now }, text: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  status: { type: String, enum: ['Ongoing','Resolved','Escalated'], default: 'Ongoing' },
  severity: { type: String, enum: ['minor','major','critical'], default: 'major' },
  equipmentUsed: [String],
  attachments: [{ filename: String, path: String, type: String }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  historyLocked: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Incident', incidentSchema);
