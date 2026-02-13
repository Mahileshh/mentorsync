import axios from 'axios';
import { MongoClient } from 'mongodb';
import { parse } from 'csv-parse';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  sheetId: process.env.GOOGLE_SHEET_ID,
  mongodbUri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DB,
  collectionName: process.env.MONGODB_COLLECTION,
  csvUrl: `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/export?format=csv`
};

export async function fetchSheetData() {
  console.log('📊 Fetching from Google Sheet...');
  const response = await axios.get(config.csvUrl);
  
  return new Promise((resolve, reject) => {
    parse(response.data, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });
}

export async function updateMongoDB(data) {
  const client = new MongoClient(config.mongodbUri);
  
  try {
    await client.connect();
    const db = client.db(config.dbName);
    const collection = db.collection(config.collectionName);
    
    const enrichedData = data.map(row => ({
      ...row,
      _syncedAt: new Date()
    }));
    
    await collection.deleteMany({});
    await collection.insertMany(enrichedData);
    
    console.log(`✅ Synced ${data.length} records`);
    return data.length;
  } finally {
    await client.close();
  }
}

export async function syncSheetToDB() {
  try {
    const data = await fetchSheetData();
    if (data.length > 0) {
      return await updateMongoDB(data);
    }
    return 0;
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    throw error;
  }
}