require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const ehb = require('express-handlebars');


const PORT = process.env.PORT || 3001;

const routes = require('./controllers');
// const helpers = require('./utils/auth');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const server = express()

const hb = ehb.create()
server.engine('handlebars', hb.engine)
server.set('view engine', 'handlebars')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

server.use(session({
  secret: 'secretsecret',
  resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    })
}))

server.use(routes)

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});