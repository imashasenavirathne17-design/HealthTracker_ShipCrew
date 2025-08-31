import mongoose from 'mongoose';
const versionSchema = new mongoose.Schema({
  data: Object,
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const medicalRecordSchema = new mongoose.Schema({
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true },
  personal: {
    history: String,
    allergies: [String],
    riskFactors: [String],
  },
  documents: [{ filename: String, path: String, type: String }],
  versions: [versionSchema]
}, { timestamps: true });

export default mongoose.model('MedicalRecord', medicalRecordSchema);
