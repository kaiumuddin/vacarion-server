/* 
add vercel config

vercel.json
{
    "version": 2,
    "builds": [
        {
            "src": "./index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}

npm init -y

install
    express
    cors
    mongodb
    dotenv
port 5000
script "start" : "node index.js"

require('dotenv').config();

Middle Ware
    app.use(cors());
    app.use(express.json());

.env 
    DB_USER=geniusDBUser
    DB_PASSWORD=xptgoJeZxMUV5uXm

mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmad3ac.mongodb.net/?retryWrites=true&w=majority`;

.gitignore
    node_modules
    .env

*/

/* 
google search
    node mongodb crud > uses examples > find operation

*/