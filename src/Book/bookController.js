const jwtMiddleware = require("../../config/jwtMiddleware");
const bookProvider = require("../Book/bookProvider");
const bookService = require("../Book/bookService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/* 33. [GET] /books 전체 예약 조회 */
exports.getBooks = async function (req, res) {

    const bookListResult = await bookProvider.retrieveBookList();
    return res.send(response(baseResponse.SUCCESS, bookListResult));
};

/* 34. [GET] /books/:roomIdx 특정 숙소 예약 조회 */
exports.getRoomBooks = async function (req,res) {
    //Path Variable : roomIdx
    const {roomIdx} = req.params;
    if (!roomIdx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    const roomBookResult = await bookProvider.retrieveRoomBook(roomIdx);
    return res.send(response(baseResponse.SUCCESS, roomBookResult));

}

/* 35. [GET] /books/users/:userIdx 특정 유저 예약 조회 */
exports.getUserBooks = async function (req,res) {
    //Path Variable : roomIdx
    const userIdFromJWT = req.verifiedToken.userId
    const {userIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const userBookResult = await bookProvider.retrieveUserBook(userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, userBookResult));

}


