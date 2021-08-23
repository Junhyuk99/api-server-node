const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const wishlistDao = require("../Wishlist/wishlistDao");

// Provider: Read 비즈니스 로직 처리

// 유저 전체 폴더 조회
exports.retrieveWishFolder = async function (userIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const folderListResult = await wishlistDao.selectFolder(connection, userIdFromJWT);
    connection.release();

    return folderListResult;
};

// 유저 위시리스트 폴더 조회
exports.retrieveWishlist = async function (userIdFromJWT, wishFolderIdx){
    const wishSearchParams = [userIdFromJWT, wishFolderIdx];
    const connection = await pool.getConnection(async (conn) => conn);
    const wishlistResult = await wishlistDao.selectWishlist(connection, wishSearchParams);
    connection.release();

    return wishlistResult;
};

// 폴더 존재 여부 체크
exports.folderCheck = async function(folderIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const folderCheckResult = await wishlistDao.selectFolderExist(connection, folderIdx);
    connection.release();

    return folderCheckResult;
};

// 위시 존재 여부 체크
exports.wishCheck = async function(wishIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const wishCheckResult = await wishlistDao.selectWishExist(connection, wishIdx);
    connection.release();

    return wishCheckResult;
};

// 숙소 존재 여부 체크
exports.roomCheck = async function(wishRoom_Idx){
    const connection = await pool.getConnection(async (conn) => conn);
    const roomCheckResult = await wishlistDao.selectRoomExist(connection, wishRoom_Idx);
    connection.release();

    return roomCheckResult;
};