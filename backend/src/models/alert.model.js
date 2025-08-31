import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  kind: { type: String, enum: ['vital_anomaly','manual','vaccination','inventory'], default: 'vital_anomaly' },
  message: String,
  location: { deck: String, cabin: String },
  severity: { type: String, enum: ['minor','major','critical'], default: 'major' },
  status: { type: String, enum: ['active','acknowledged','resolved','escalated'], default: 'active' },
  acknowledgedAt: Date,
  acknowledgedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('Alert', alertSchema);
