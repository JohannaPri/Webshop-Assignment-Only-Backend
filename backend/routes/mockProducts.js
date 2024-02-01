const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;

const mockProducts = [
    {
        "name": "Puma",
        "description": "Mauv",
        "price": 708,
        "lager": 149
    },
    {
        "name": "Reebok",
        "description": "Red",
        "price": 629,
        "lager": 80
    },
    {
        "name": "Nike",
        "description": "Indigo",
        "price": 264,
        "lager": 107
    },
    {
        "name": "Adidas",
        "description": "Goldenrod",
        "price": 1132,
        "lager": 98
    },
    {
        "name": "Nike",
        "description": "Goldenrod",
        "price": 2096,
        "lager": 104
    },
    {
        "name": "Reebok",
        "description": "Indigo",
        "price": 1998,
        "lager": 128
    },
    {
        "name": "Puma",
        "description": "Khaki",
        "price": 2307,
        "lager": 175
    },
    {
        "name": "Nike",
        "description": "Goldenrod",
        "price": 1504,
        "lager": 95
    },
    {
        "name": "Reebok",
        "description": "Green",
        "price": 1259,
        "lager": 181
    },
    {
        "name": "Nike",
        "description": "Mauv",
        "price": 333,
        "lager": 35
    }
  ];

  const MONGODB_URI = 'mongodb://127.0.0.1:27017';
  const DB_NAME = 'johanna-larssonprinz';
  const COLLECTION_NAME = 'products';

async function insertMockProducts () {
    try {
        mongoClient.connect(MONGODB_URI)
        .then(async client => {
            console.log("The database is connected");

            const db = client.db(DB_NAME);
            const productsCollection = db.collection(COLLECTION_NAME);
            const count = await productsCollection.countDocuments();
            if (count < 10) {
                await productsCollection.insertMany(mockProducts);
                console.log("Mock products inserted successfully!");
            } else {
                return;
            }
        });
    } catch (error) {
        console.error('Error inserting mock products: ', error);
    }
}

insertMockProducts();

  module.exports = mockProducts;
  