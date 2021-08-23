module.exports = function(app){
    const book = require('../Book/bookController');
    const jwtMiddleware = require('../../config/jwtMiddleware');

    // 33. 전체 예약 조회 API
    app.get('/books', book.getBooks);

    //34. 특정 숙소 예약 조회 API
    app.get('/books/:roomIdx', book.getRoomBooks);

    //35. 특정 유저 예약 조회 API (JWT)
    app.get('/books/users/:userIdx', jwtMiddleware, book.getUserBooks);
};