module.exports = function(app){
    const credit = require('../Credit/creditController');
    const jwtMiddleware = require('../../config/jwtMiddleware');

    // 29. 특정 유저 결제수단 조회 API (JWT)
    app.get('/credits/:userIdx', jwtMiddleware, credit.getCredits);

};