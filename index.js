const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

// instance
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());


// Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmad3ac.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run() {
    try {
        const serviceCollection = client.db('vacarion').collection('services');
        const reviewCollection = client.db('vacarion').collection('reviews');

        // service api
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services3', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.post('/services', async (req, res) => {
            const newService = req.body;
            const fromDb = await serviceCollection.insertOne(newService);
            res.send(fromDb);
        });


        // Review api
        app.get('/review/:serviceid', async (req, res) => {
            const serviceid = req.params.serviceid;
            const query = {serviceId: serviceid};
            const cursor = await reviewCollection.find(query).sort({date: -1});
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.get('/reviewedit/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const review = await reviewCollection.findOne(query);
            res.send(review);
        });

        app.get('/reviewbyemail/:email', async (req, res) => {
            const email = req.params.email;
            const query = {revieweremail: email};
            const cursor = await reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.post('/review', async (req, res) => {
            let newReview = req.body;
            newReview["date"] = new Date();
            const fromDb = await reviewCollection.insertOne(newReview);
            res.send(fromDb);
        });


        app.patch('/review/:id', async (req, res) => {
            const id = req.params.id;
            const text = req.body.text;
            const query = {_id: ObjectId(id)};
            const updatedDoc = {
                $set: {
                    reviewText: text,
                }
            };
            const result = await reviewCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('vacarion server is running home page');
});

app.listen(port, () => {
    console.log('vacarion server running on', port);
});
