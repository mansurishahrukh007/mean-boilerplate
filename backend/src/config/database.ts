import mongoose from 'mongoose';
const bluebird = require('bluebird');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/sample', { useNewUrlParser: true, useUnifiedTopology: true, promiseLibrary: bluebird })
    .then(() => console.log('DB connected'))
    .catch((err) => console.error(err));