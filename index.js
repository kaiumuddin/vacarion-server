const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

// instance
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mongodb
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmad3ac.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://vacarionDBUser:ZWK3X1JbAVSVREpx@cluster0.rmad3ac.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});


async function run() {
    try {
        const serviceCollection = client.db('vacarion').collection('services');

        // service api
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.post('/services', async (req, res) => {
            const newService = req.body;
            console.log(newService);
            const fromDb = await serviceCollection.insertOne(newService);
            res.send(fromDb);
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
