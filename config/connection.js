const { connect, connection } = require('mongoose');

const connectionStr = 'mongodb://localhost:27017/my_socialize';

connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;