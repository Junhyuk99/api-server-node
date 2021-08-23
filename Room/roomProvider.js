const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const roomDao = require("../Room/roomDao");

// Provider: Read 비즈니스 로직 처리

//전체 숙소 조회
exports.retrieveRoomList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomListResult = await roomDao.selectRoom(connection);
    connection.release();

    return roomListResult;
};

exports.retrieveRoom = async function (roomIdx) {
    console.log(roomIdx)
    const connection = await pool.getConnection(async (conn) => conn);
    const roomResult = await roomDao.selectRoomByIdx(connection, roomIdx);
    connection.release();

    return roomResult[0];
};

exports.retrieveUserRoom = async function (userIdx){
    console.log(userIdx)
    const connection = await pool.getConnection(async (conn) => conn);
    const roomUserResult = await roomDao.selectRoomByUserId(connection, userIdx);
    connection.release();

    return roomUserResult;
}
