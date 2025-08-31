import { nanoid } from 'nanoid';
import Alert from '../models/alert.model.js';
import Incident from '../models/incident.model.js';
import Message from '../models/message.model.js';
import Crew from '../models/crew.model.js';
import { sendEmail } from '../utils/mailer.js';
import { sendSMS } from '../utils/sms.js';
import { pushAlert } from '../utils/sockets.js';

export const listAlerts = async (req, res) => {
  const items = await Alert.find().sort({ createdAt: -1 }).limit(100).populate('crew');
  res.json(items);
};

export const ackAlert = async (req, res) => {
  const a = await Alert.findByIdAndUpdate(req.params.id, { status: 'acknowledged', acknowledgedAt: new Date(), acknowledgedBy: req.user._id }, { new: true });
  res.json(a);
};

export const closeAlert = async (req, res) => {
  const a = await Alert.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });
  res.json(a);
};

export const triggerManualAlert = async (req, res) => {
  const { crewId, message, severity } = req.body;
  const crew = await Crew.findById(crewId);
  const created = await Alert.create({ crew: crewId, message, severity, kind: 'manual', location: crew?.location });
  pushAlert({ type: 'manual', crewId: String(crewId), message });
  res.json(created);
};

export const activateProtocol = async (req, res) => {
  const { type, notifyEmails = [], notifyPhones = [] } = req.body;
  // send notifications
  await Promise.all([
    ...notifyEmails.map(to => sendEmail({ to, subject: `Emergency Protocol: ${type}`, html: 'Please respond immediately.' })),
    ...notifyPhones.map(to => sendSMS(to, `Emergency Protocol: ${type}`))
  ]);
  res.json({ ok: true });
};

export const sendMessage = async (req, res) => {
  const msg = await Message.create({ threadId: req.body.threadId || nanoid(8), toRoles: req.body.toRoles, toUsers: req.body.toUsers, from: req.user._id, body: req.body.body, priority: req.body.priority });
  res.json(msg);
};

export const getMessages = async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: -1 }).limit(100);
  res.json(msgs);
};

export const createIncident = async (req, res) => {
  const inc = await Incident.create({
    caseId: 'INC-' + nanoid(6),
    crew: req.body.crew,
    notes: [{ text: req.body.note, author: req.user._id }],
    severity: req.body.severity,
    equipmentUsed: req.body.equipmentUsed?.split(',') || [],
    attachments: req.files?.map(f => ({ filename: f.originalname, path: f.path, type: f.mimetype }))
  });
  res.json(inc);
};

export const updateIncident = async (req, res) => {
  const inc = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(inc);
};

export const listIncidents = async (req, res) => {
  const items = await Incident.find().sort({ createdAt: -1 }).limit(100).populate('crew');
  res.json(items);
};
