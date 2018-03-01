// const URL = 'http://localhost:3000/api';  //Local Server URL
const URL = 'https://qibto.herokuapp.com/api';  //Heroku Live Server URL
// const URL = 'http://node.cyberframe.in/api';  //Cyberframe Live Server URL

module.exports = {
    'database': 'mongodb://qibto:qibto@ds245518.mlab.com:45518/qibto', // Mlab Live Server Database
    // 'database': 'mongodb://testowner:testowner@localhost:27017/testDb', // Cyberframe Live Server Database
    'token_secret': 'qibto_backend_secret',
    'token_expire':'30 days',
    'SERVER_URL': URL
}

