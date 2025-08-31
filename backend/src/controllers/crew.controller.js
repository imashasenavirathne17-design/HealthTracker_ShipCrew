import Crew from '../models/crew.model.js';
export const listCrew = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const crew = await Crew.find(filter).limit(100);
  res.json(crew);
};
export const createCrew = async (req, res) => {
  const c = await Crew.create(req.body);
  res.json(c);
};
export const updateCrew = async (req, res) => {
  const c = await Crew.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(c);
};
