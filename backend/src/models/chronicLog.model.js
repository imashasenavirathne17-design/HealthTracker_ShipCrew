import mongoose from 'mongoose';
const chronicSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  type: { type: String, enum: ['diabetes','asthma','hypertension','other'], required: true },
  metrics: [{ label: String, value: Number, unit: String, at: { type: Date, default: Date.now } }],
  notes: String,
  externalResults: [{ name: String, url: String }]
}, { timestamps: true });
export default mongoose.model('ChronicLog', chronicSchema);
