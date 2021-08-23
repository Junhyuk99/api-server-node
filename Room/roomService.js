const {logger} = require("../../config/winston");
const {pool} = require("../../config/database");
const secret_config = require("../../config/secret");
const roomProvider = require("./roomProvider");
const wishlistProvider = require("../Wishlist/wishlistProvider");
const roomDao = require("./roomDao");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");
const {errResponse} = require("../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//숙소 등록
exports.createRoom = async function (roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
                                     roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, userIdFromJWT){
    try {
        const insertRoomInfoParams = [roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
            roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);

        const roomResult = await roomDao.insertRoomInfo(connection, insertRoomInfoParams);
        console.log(`추가된 숙소 : ${roomResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - createRoom Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//숙소 정보 수정
exports.editRoom = async function (roomIdx, roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
                                   roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, userIdFromJWT) {
    try {
        const roomRows = await wishlistProvider.roomCheck(roomIdx);
        if (roomRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_ROOM);
        const editRoomInfoParams = [roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
            roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomIdx, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editRoomResult = await roomDao.editRoomInfo(connection, editRoomInfoParams);
        console.log("수정된 숙소 : ", roomIdx)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - editRoom Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//숙소 정보 삭제
exports.deleteRoom = async function (roomIdx, userIdFromJWT) {
    try {
        const roomRows = await wishlistProvider.roomCheck(roomIdx);
        if (roomRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_ROOM);
        const deleteRoomParams = [roomIdx, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteRoomResult = await roomDao.deleteRoomByIdx(connection, deleteRoomParams);
        console.log("삭제된 숙소 : ", roomIdx)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - deleteRoom Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
