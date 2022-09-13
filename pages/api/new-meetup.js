// url of this file /api/new-meetup
// POST requests only

import {MongoClient} from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST'){
        const data = req.body;
        const client = await MongoClient.connect(MONGO_DB_CONNECTION);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'New meetup created!'});
    }
}

export default handler;