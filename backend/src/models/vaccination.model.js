import mongoose from 'mongoose';
const vaxSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  name: String,
  date: Date,
  dosage: String,
  batch: String,
  status: { type: String, enum: ['complete','pending','overdue'], default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Vaccination', vaxSchema);
