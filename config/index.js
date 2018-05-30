var configValues = require('./config');

module.exports = {
    getHost: function (){
        return `${configValues.host}`;
    },
    getUser: function (){
        return `${configValues.username}`
    },
    getPass: function (){
        return `${configValues.password}`
    },
    getDatabase: function (){
        return `${configValues.database_name}`
    }
}