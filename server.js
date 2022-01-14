import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import session from 'express-session'

import connection from './database/db.js';
import defaultData from './default/default.js';
import router from './router.js';
import passport from 'passport';
import configurePassport from './passportConfig.js'
import { default as MongoStore} from 'connect-mongo';


dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000
const mongoURI = process.env.mongoURI

connection(mongoURI);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
}

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const sessionStore = new MongoStore({ mongoUrl: process.env.mongoURI, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
configurePassport(passport)

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router)

// defaultData();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback'
paytmParams['EMAIL'] = 'codeforinterview01@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'

