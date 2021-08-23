module.exports = function(app){
    const room = require('../Room/roomController');
    const jwtMiddleware = require('../../config/jwtMiddleware');

    //16. 전체 숙소 조회 API
    app.get('/rooms', room.getRooms);

    //17. 숙소 등록 API (JWT)
    app.post('/rooms', jwtMiddleware, room.postRooms);

    //18. 특정 숙소 조회 API
    app.get('/rooms/:roomIdx', room.getRoomByIdx);

    //20. 특정 숙소 정보 수정 API (JWT)
    app.patch('/rooms', jwtMiddleware, room.editRooms);

    //21. 특정 숙소 삭제 API (JWT)
    app.patch('/rooms/status', jwtMiddleware, room.deleteRooms);

    //22. 특정 유저 업로드 숙소 조회 API
    app.get('/rooms/users/:userIdx', room.getRoomByUserIdx);

};