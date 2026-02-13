import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'sheetconnectivity';
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION || 'gsheets';

let client = null;
let db = null;
let collection = null;

/**
 * Connect to MongoDB
 */
export const connectDB = async () => {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(MONGODB_DB);
    collection = db.collection(MONGODB_COLLECTION);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${MONGODB_DB}`);
    console.log(`📋 Collection: ${MONGODB_COLLECTION}`);
    
    return collection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

/**
 * Get all data from MongoDB
 */
export const getAllData = async () => {
  try {
    const documents = await collection.find({}).toArray();
    console.log(`📚 Retrieved ${documents.length} documents from MongoDB`);
    return documents;
  } catch (error) {
    console.error('❌ Error fetching data from MongoDB:', error.message);
    throw error;
  }
};

/**
 * Get data by query filter
 */
export const getDataByFilter = async (filter) => {
  try {
    const documents = await collection.find(filter).toArray();
    return documents;
  } catch (error) {
    console.error('❌ Error filtering data from MongoDB:', error.message);
    throw error;
  }
};

/**
 * Get all departments (grouped by department)
 */
export const getAllDepartments = async () => {
  try {
    const documents = await collection.find({}).toArray();
    
    // Department mapping
    const deptMap = {
      'COMPUTER SCIENCE AND BUSINESS': 'CSBS',
      'COMPUTER SCIENCE': 'CSE',
      'INFORMATION TECHNOLOGY': 'IT',
      'ELECTRONICS AND COMMUNICATION': 'ECE',
      'MECHANICAL ENGINEERING': 'MECH'
    };
    
    // Group by department
    const departments = {};
    
    documents.forEach(doc => {
      // Use DEPARTMENT field or fallback to department
      let dept = doc.DEPARTMENT || doc.department || 'Unknown';
      
      // Map full department names to abbreviations
      dept = deptMap[dept] || dept;
      
      if (!departments[dept]) {
        departments[dept] = [];
      }
      
      // Transform document to student object
      const student = {
        _id: doc._id,
        name: doc.STUDENT_NAME || doc.name || '',
        rp: parseInt(doc.CUMULATIVE_REWARD_POINTS || doc.rp || doc.reward_points || doc.points || 0) || 0,
        email: doc.email || '',
        department: dept,
        mentor: doc.MENTOR_NAME || '',
        year: doc.YEAR || '',
        rollNo: doc.ROLL_NO || '',
        ...doc
      };
      
      // Determine status based on RP
      if (student.rp >= 2000) student.status = 'active';
      else if (student.rp >= 1500) student.status = 'warning';
      else student.status = 'at-risk';
      
      // Generate avatar from name
      if (student.name) {
        student.avatar = student.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
      } else {
        student.avatar = '?';
      }
      
      departments[dept].push(student);
    });
    
    console.log(`📊 Loaded ${Object.keys(departments).length} departments from MongoDB`);
    return departments;
  } catch (error) {
    console.error('❌ Error grouping departments from MongoDB:', error.message);
    throw error;
  }
};

/**
 * Get single department
 */
export const getDepartment = async (deptName) => {
  try {
    // Department mapping
    const deptMap = {
      'COMPUTER SCIENCE AND BUSINESS': 'CSBS',
      'COMPUTER SCIENCE': 'CSE',
      'INFORMATION TECHNOLOGY': 'IT',
      'ELECTRONICS AND COMMUNICATION': 'ECE',
      'MECHANICAL ENGINEERING': 'MECH'
    };
    
    // Reverse mapping for search
    const reverseDeptMap = {
      'CSBS': 'COMPUTER SCIENCE AND BUSINESS',
      'CSE': 'COMPUTER SCIENCE',
      'IT': 'INFORMATION TECHNOLOGY',
      'ECE': 'ELECTRONICS AND COMMUNICATION',
      'MECH': 'MECHANICAL ENGINEERING'
    };
    
    const fullDeptName = reverseDeptMap[deptName] || deptName;
    
    const documents = await collection
      .find({ $or: [{ DEPARTMENT: fullDeptName }, { department: deptName }] })
      .toArray();
    
    console.log(`📋 Retrieved ${documents.length} students from department: ${deptName}`);
    
    // Transform documents to student objects
    return documents.map(doc => ({
      _id: doc._id,
      name: doc.STUDENT_NAME || doc.name || '',
      rp: parseInt(doc.CUMULATIVE_REWARD_POINTS || doc.rp || doc.reward_points || doc.points || 0) || 0,
      email: doc.email || '',
      department: deptName,
      mentor: doc.MENTOR_NAME || '',
      year: doc.YEAR || '',
      rollNo: doc.ROLL_NO || '',
      ...doc
    }));
  } catch (error) {
    console.error(`❌ Error fetching department ${deptName} from MongoDB:`, error.message);
    throw error;
  }
};

/**
 * Get collection metadata
 */
export const getMetadata = async () => {
  try {
    const stats = await db.collection(MONGODB_COLLECTION).stats();
    const distinctDepts = await collection.distinct('department');
    
    return {
      collectionName: MONGODB_COLLECTION,
      documentCount: stats.count,
      departments: distinctDepts,
      database: MONGODB_DB,
      lastAccessed: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error fetching metadata from MongoDB:', error.message);
    throw error;
  }
};

/**
 * Add a new document
 */
export const addDocument = async (data) => {
  try {
    const result = await collection.insertOne(data);
    console.log(`✅ Document inserted with ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error('❌ Error inserting document:', error.message);
    throw error;
  }
};

/**
 * Update a document by ID
 */
export const updateDocument = async (id, updateData) => {
  try {
    const { ObjectId } = await import('mongodb');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    console.log(`✅ Document updated: ${result.modifiedCount} record(s) modified`);
    return result;
  } catch (error) {
    console.error('❌ Error updating document:', error.message);
    throw error;
  }
};

/**
 * Delete a document by ID
 */
export const deleteDocument = async (id) => {
  try {
    const { ObjectId } = await import('mongodb');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(`✅ Document deleted: ${result.deletedCount} record(s) removed`);
    return result;
  } catch (error) {
    console.error('❌ Error deleting document:', error.message);
    throw error;
  }
};

/**
 * Close MongoDB connection
 */
export const closeDB = async () => {
  try {
    if (client) {
      await client.close();
      console.log('✅ MongoDB connection closed');
    }
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message);
  }
};

export default {
  connectDB,
  getAllData,
  getDataByFilter,
  getAllDepartments,
  getDepartment,
  getMetadata,
  addDocument,
  updateDocument,
  deleteDocument,
  closeDB
};
