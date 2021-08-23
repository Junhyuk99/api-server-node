const jwtMiddleware = require("../../config/jwtMiddleware");
const roomProvider = require("../Room/roomProvider");
const roomService = require("../Room/roomService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/* 16. [GET] /rooms 전체 숙소 조회 */
exports.getRooms = async function (req, res) {

    const roomListResult = await roomProvider.retrieveRoomList();
    return res.send(response(baseResponse.SUCCESS, roomListResult));
};

/* 17. [POST] /rooms 숙소 등록 */
exports.postRooms = async function (req, res) {
    /* Body : roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
              roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomUploadUser */
    const userIdFromJWT = req.verifiedToken.userId

    const { roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
        roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomUploadUser } = req.body;
    if (!roomUploadUser)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != roomUploadUser)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    if (!roomLocation || !roomCapacity || !roomBed || !roomBedroom || !roomBathroom || !roomType || !roomPrice ||
        !roomDesc || !roomKind || !roomConvenient || !roomImageUrl || !roomName || !roomInfo || !roomLati || !roomLongi)
        return res.send(errResponse(baseResponse.ROOM_INFO_EMPTY));

    const createRoomResponse = await roomService.createRoom(
        roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
        roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, userIdFromJWT);

    return res.send(createRoomResponse);
};

/* 18. [GET] /rooms/:roomIdx 특정 숙소 조회*/
exports.getRoomByIdx = async function (req, res) {
    //Path Variable : roomIdx
    const {roomIdx} = req.params;
    if (!roomIdx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    const roomByRoomIdx = await roomProvider.retrieveRoom(roomIdx);
    return res.send(response(baseResponse.SUCCESS, roomByRoomIdx));
};

/* 20. [PATCH] /rooms 특정 숙소 정보 수정 */
exports.editRooms = async function (req,res) {
    /* Body : roomIdx, roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
            roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomUploadUser */
    const userIdFromJWT = req.verifiedToken.userId
    const { roomIdx, roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
        roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomUploadUser } = req.body;
    if (!roomIdx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    if (!roomUploadUser)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != roomUploadUser)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    if (!roomLocation || !roomCapacity || !roomBed || !roomBedroom || !roomBathroom || !roomType || !roomPrice ||
        !roomDesc || !roomKind || !roomConvenient || !roomImageUrl || !roomName || !roomInfo || !roomLati || !roomLongi)
        return res.send(errResponse(baseResponse.ROOM_EDIT_EMPTY));
    const editRoomResponse = await roomService.editRoom(
        roomIdx, roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
        roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, userIdFromJWT);

    return res.send(editRoomResponse);
};

/* 21. [PATCH] /rooms/status 특정 숙소 삭제 */
exports.deleteRooms = async function (req,res) {
    const userIdFromJWT = req.verifiedToken.userId
    const {roomIdx, userIdx} = req.body;
    if (!roomIdx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const deleteRoom = await roomService.deleteRoom(roomIdx, userIdFromJWT);
    return res.send(deleteRoom);
}

/* 22. [GET] /rooms/users/:userIdx 특정 유저 업로드 숙소 조회*/
exports.getRoomByUserIdx = async function (req,res){
    //Path Variable : userIdx
    const {userIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    const roomByUserId = await roomProvider.retrieveUserRoom(userIdx);
    return res.send(response(baseResponse.SUCCESS, roomByUserId));
}