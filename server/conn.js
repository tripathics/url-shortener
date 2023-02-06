const { MongoClient } = require('mongodb');
const Db = process.env.DB_URI;
const dbName = process.env.DB_NAME || 'urlshortenerdb';

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** @type {import('mongodb').Db} */
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect()
    .then(db => {
      if (!db) return;
      _db = db.db(dbName);
      console.log(`Successfully connected to ${dbName}.`);
      _db.collection('urls').createIndex({ 'shortUrl': 1 }, { unique: true })
        .then(() => { console.log(`Successfully created unique index for urls`) })
        .catch(err => { throw err });
    })
    .catch(err => { throw err; });
  },

  getDb: function () {
    return _db;
  },
};