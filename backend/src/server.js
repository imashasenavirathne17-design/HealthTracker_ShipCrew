import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import crewRoutes from './routes/crew.routes.js';
import healthRoutes from './routes/health.routes.js';
import emergencyRoutes from './routes/emergency.routes.js';
import reportRoutes from './routes/report.routes.js';
import { notFound, errorHandler } from './middleware/error.js';
import { initSockets } from './utils/sockets.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true } });
initSockets(io);

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('src/uploads'));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.get('/', (req, res) => res.json({ status: 'ok', service: 'ship-health-backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
