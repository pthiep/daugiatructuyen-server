var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return `${configValues.host}/${configValues.database_name}`;
    }
}