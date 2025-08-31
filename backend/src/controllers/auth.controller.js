import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.json({ id: user._id });
};

export const login = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email }).select('+password +twoFASecret');
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.twoFAEnabled) {
    const verified = speakeasy.totp.verify({ secret: user.twoFASecret, encoding: 'base32', token });
    if (!verified) return res.status(401).json({ message: '2FA required/invalid' });
  }
  const jwtToken = genToken(user._id);
  res.json({ token: jwtToken, role: user.role, name: user.name });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const enable2FA = async (req, res) => {
  const secret = speakeasy.generateSecret({ name: 'ShipHealth' });
  const url = await qrcode.toDataURL(secret.otpauth_url);
  req.user.twoFAEnabled = true;
  req.user.twoFASecret = secret.base32;
  await req.user.save();
  res.json({ qrcode: url });
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const verified = speakeasy.totp.verify({ secret: req.user.twoFASecret, encoding: 'base32', token });
  res.json({ ok: !!verified });
};
