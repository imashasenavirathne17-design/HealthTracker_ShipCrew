import Crew from '../models/crew.model.js';
import MedicalRecord from '../models/medicalRecord.model.js';
import Exam from '../models/exam.model.js';
import ChronicLog from '../models/chronicLog.model.js';
import Reminder from '../models/reminder.model.js';
import MentalHealth from '../models/mentalHealth.model.js';
import Vaccination from '../models/vaccination.model.js';
import { pushAlert } from '../utils/sockets.js';

export const upsertRecord = async (req, res) => {
  const crew = await Crew.findById(req.params.crewId);
  if (!crew) return res.status(404).json({ message: 'Crew not found' });
  const doc = await MedicalRecord.findOne({ crew: crew._id });
  const data = {
    personal: { history: req.body.history, allergies: req.body.allergies?.split(',')||[], riskFactors: req.body.riskFactors?.split(',')||[] },
    documents: req.files?.map(f => ({ filename: f.originalname, path: f.path, type: f.mimetype }))
  };
  if (doc) {
    doc.versions.push({ data: doc.toObject(), updatedBy: req.user._id });
    Object.assign(doc, data);
    await doc.save();
    return res.json(doc);
  } else {
    const created = await MedicalRecord.create({ crew: crew._id, ...data, versions: [] });
    return res.json(created);
  }
};

export const getRecord = async (req, res) => {
  const doc = await MedicalRecord.findOne({ crew: req.params.crewId });
  res.json(doc);
};

export const addExam = async (req, res) => {
  const exam = await Exam.create({
    crew: req.params.crewId,
    vitals: JSON.parse(req.body.vitals || '{}'),
    findings: req.body.findings,
    nextEvaluationAt: req.body.nextEvaluationAt,
    attachments: req.files?.map(f => ({ filename: f.originalname, path: f.path })),
    doctorNotes: req.body.doctorNotes
  });
  // If abnormal vitals, push an alert
  const { heartRate, temp } = exam.vitals || {};
  if ((heartRate && heartRate > 120) || (temp && temp > 39)) {
    pushAlert({ type: 'vital_anomaly', crewId: String(req.params.crewId), message: 'Abnormal vitals detected' });
  }
  res.json(exam);
};

export const getExams = async (req, res) => {
  const items = await Exam.find({ crew: req.params.crewId }).sort({ createdAt: -1 });
  res.json(items);
};

export const addChronic = async (req, res) => {
  const item = await ChronicLog.create({ crew: req.params.crewId, ...req.body });
  res.json(item);
};

export const getChronic = async (req, res) => {
  const items = await ChronicLog.find({ crew: req.params.crewId }).sort({ createdAt: -1 });
  res.json(items);
};

export const addReminder = async (req, res) => {
  const r = await Reminder.create({ crew: req.params.crewId, ...req.body, assignedBy: req.user._id });
  res.json(r);
};
export const getReminders = async (req, res) => {
  const items = await Reminder.find({ crew: req.params.crewId }).sort({ createdAt: -1 });
  res.json(items);
};

export const addMental = async (req, res) => {
  const m = await MentalHealth.create({ crew: req.params.crewId, notes: req.body.notes, status: req.body.status, attachments: req.files?.map(f => ({ filename: f.originalname, path: f.path })) });
  res.json(m);
};
export const getMental = async (req, res) => {
  const items = await MentalHealth.find({ crew: req.params.crewId }).sort({ createdAt: -1 });
  res.json(items);
};

export const addVaccination = async (req, res) => {
  const v = await Vaccination.create({ crew: req.params.crewId, ...req.body });
  res.json(v);
};
export const getVaccinations = async (req, res) => {
  const items = await Vaccination.find({ crew: req.params.crewId }).sort({ createdAt: -1 });
  res.json(items);
};
