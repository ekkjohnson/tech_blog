const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHB = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 3001;

const routes = require('./controllers/');
const helpers = require('./utils/auth');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const Sess={
    secret: 'secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const HB = expressHB.create({helpers});

app.use(session(Sess));

app.engine('handlebars', HB.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});