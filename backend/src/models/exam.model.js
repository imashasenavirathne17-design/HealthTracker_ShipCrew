import mongoose from 'mongoose';
const examSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  vitals: { bp: String, heartRate: Number, bmi: Number, temp: Number },
  findings: String,
  nextEvaluationAt: Date,
  attachments: [{ filename: String, path: String }],
  doctorNotes: String
}, { timestamps: true });
export default mongoose.model('Exam', examSchema);
