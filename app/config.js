// const URL = 'http://localhost:3000/api';  //Local Server URL
const URL = 'https://qibto.herokuapp.com/api';  //Heroku Live Server URL
// const URL = 'http://node.cyberframe.in/api';  //Cyberframe Live Server URL

module.exports = {
    'database': 'mongodb://qibto:qibto@ds245518.mlab.com:45518/qibto', // Mlab Live Server Database
    // 'database': 'mongodb://testowner:testowner@localhost:27017/testDb', // Cyberframe Live Server Database
    'token_secret': '$2y$10$pIzRc1AoiLRx0XOS01cqYuUfTv2El5cOFK5ufmlfQJ4q92u4R8OGm',
    'super_admin_secret': '$2y$10$QDQ7Qiex.7JE/gctL3foL.kep2GgJBTIXKaEUNxY5Hw.1JEbD5TVO',
    'school_admin_secret': '$2y$10$kE8WjQx2k7rEZVJcgOVGfuvsEzJeoZUkx0kS1pdUQBDpJHhV3KPWm',
    'school_driver_secret': '$2y$10$Nyv9CRKGksRfutlj.vdCy.1KNQXAW88Hvn6tBdAX67n79tsNhD.5y',
    'super_admin_secret_code': 'super_admin_secret_code',
    'token_expire':'30 days',
    'SERVER_URL': URL
};

