import mongoose from 'mongoose';
const mentalSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  notes: String,
  status: { type: String, enum: ['ongoing','under_observation','referred'], default: 'under_observation' },
  attachments: [{ filename: String, path: String }]
}, { timestamps: true });
export default mongoose.model('MentalHealth', mentalSchema);
