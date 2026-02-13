import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
  connectDB,
  getAllDepartments, 
  getDepartment, 
  getMetadata,
  addDocument,
  updateDocument,
  deleteDocument,
  getAllData 
} from './dbService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// ============= DATABASE INITIALIZATION =============

// Connect to MongoDB on server start
let isDBConnected = false;

const initializeDB = async () => {
  try {
    await connectDB();
    isDBConnected = true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

// ============= API ENDPOINTS =============

/**
 * GET /api/departments/all
 * Fetch ALL departments from MongoDB
 */
app.get('/api/departments/all', async (req, res) => {
  try {
    console.log('📥 Request received: GET /api/departments/all');
    const startTime = Date.now();
    
    const data = await getAllDepartments();
    
    const responseTime = Date.now() - startTime;
    console.log(`📤 Response sent in ${responseTime}ms`);
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      data
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/departments/:name
 * Fetch single department from MongoDB
 */
app.get('/api/departments/:name', async (req, res) => {
  try {
    const { name } = req.params;
    console.log(`📥 Request received: GET /api/departments/${name}`);
    
    const data = await getDepartment(name);
    
    res.json({
      success: true,
      department: name,
      count: data.length,
      data
    });
    
  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/metadata
 * Get collection metadata
 */
app.get('/api/metadata', async (req, res) => {
  try {
    const metadata = await getMetadata();
    res.json({
      success: true,
      metadata
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/data
 * Fetch all raw data from MongoDB
 */
app.get('/api/data', async (req, res) => {
  try {
    const data = await getAllData();
    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/data
 * Add new document to MongoDB
 */
app.post('/api/data', async (req, res) => {
  try {
    const result = await addDocument(req.body);
    res.status(201).json({
      success: true,
      message: 'Document added successfully',
      insertedId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/data/:id
 * Update document in MongoDB
 */
app.put('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateDocument(id, req.body);
    res.json({
      success: true,
      message: 'Document updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/data/:id
 * Delete document from MongoDB
 */
app.delete('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteDocument(id);
    res.json({
      success: true,
      message: 'Document deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/health
 * Check server status
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: isDBConnected ? 'healthy' : 'database-disconnected',
    time: new Date().toISOString(),
    uptime: process.uptime(),
    database: isDBConnected ? 'connected' : 'disconnected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDB();
    
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 SERVER RUNNING ON http://localhost:${PORT}`);
      console.log('='.repeat(60));
      console.log(`\n📊 Available endpoints:`);
      console.log(`   GET  http://localhost:${PORT}/api/health`);
      console.log(`   GET  http://localhost:${PORT}/api/metadata`);
      console.log(`   GET  http://localhost:${PORT}/api/data`);
      console.log(`   GET  http://localhost:${PORT}/api/departments/all`);
      console.log(`   GET  http://localhost:${PORT}/api/departments/CSBS`);
      console.log(`   GET  http://localhost:${PORT}/api/departments/CSE`);
      console.log(`   POST http://localhost:${PORT}/api/data`);
      console.log(`   PUT  http://localhost:${PORT}/api/data/:id`);
      console.log(`   DELETE http://localhost:${PORT}/api/data/:id`);
      console.log(`\n📦 MongoDB Connection:`);
      console.log(`   URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017'}`);
      console.log(`   Database: ${process.env.MONGODB_DB || 'sheetconnectivity'}`);
      console.log(`   Collection: ${process.env.MONGODB_COLLECTION || 'gsheets'}`);
      console.log('\n' + '='.repeat(60) + '\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});