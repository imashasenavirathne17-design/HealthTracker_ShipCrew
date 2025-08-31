import mongoose from 'mongoose';
const crewSchema = new mongoose.Schema({
  crewId: { type: String, required: true, unique: true },
  name: String,
  dob: Date,
  gender: String,
  bloodType: String,
  contact: String,
  emergencyContacts: [{ name: String, phone: String, relation: String }],
  allergies: [String],
  chronicDiseases: [String],
  riskFactors: [String],
  location: { deck: String, cabin: String },
}, { timestamps: true });
export default mongoose.model('Crew', crewSchema);
