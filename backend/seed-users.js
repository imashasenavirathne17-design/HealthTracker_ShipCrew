// backend/seed-users.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional)
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create seed users
    const users = [
      {
        name: 'Dr. Sarah Wilson',
        email: 'health@example.com',
        password: 'Pass@1234',
        role: 'HEALTH_OFFICER'
      },
      {
        name: 'Captain Mike Johnson',
        email: 'emergency@example.com', 
        password: 'Pass@1234',
        role: 'EMERGENCY_OFFICER'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@1234',
        role: 'ADMIN'
      }
    ];

    // Create users
    for (const userData of users) {
      const user = await User.create(userData);
      console.log(`Created user: ${user.email} (${user.role})`);
    }

    console.log('Users seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('Health Officer: health@example.com / Pass@1234');
    console.log('Emergency Officer: emergency@example.com / Pass@1234');
    console.log('Admin: admin@example.com / Admin@1234');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();