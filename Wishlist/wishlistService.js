const {logger} = require("../../config/winston");
const {pool} = require("../../config/database");
const secret_config = require("../../config/secret");
const wishlistProvider = require("./wishlistProvider");
const wishlistDao = require("./wishlistDao");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");
const {errResponse} = require("../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//위시 폴더 생성
exports.createFolders = async function (userIdFromJWT, wishFolderName, wishFolderImageUrl){
    try {
        const insertFolderInfoParams = [userIdFromJWT, wishFolderName, wishFolderImageUrl];
        const connection = await pool.getConnection(async (conn) => conn);

        const folderResult = await wishlistDao.insertFolderInfo(connection, insertFolderInfoParams);
        console.log(`추가된 폴더 : ${folderResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - createFolder Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//위시 추가
exports.createWish = async function (wishFolder_Idx, wishRoom_Idx){
    try{
        const folderRows = await wishlistProvider.folderCheck(wishFolder_Idx);
        if (folderRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_FOLDER);
        const roomRows = await wishlistProvider.roomCheck(wishRoom_Idx);
        if (roomRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_ROOM);
        const insertWishInfoParams = [wishFolder_Idx, wishRoom_Idx];
        const connection = await pool.getConnection(async (conn) => conn);

        const WishResult = await wishlistDao.insertWishInfo(connection, insertWishInfoParams);
        console.log(`추가된 위시 : ${WishResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - createWish Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//폴더 정보 수정
exports.editFolder = async function (folderIdx, userIdFromJWT, wishFolderName, wishFolderImageUrl) {
    try {
        const folderRows = await wishlistProvider.folderCheck(folderIdx);
        if (folderRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_FOLDER);
        const updateFolderParams = [wishFolderName, wishFolderImageUrl, folderIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const editFolderResult = await wishlistDao.editFolderByIdx(connection, updateFolderParams);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - editFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//폴더 삭제
exports.deleteFolder = async function (folderIdx, userIdFromJWT){
    try {
        const folderRows = await wishlistProvider.folderCheck(folderIdx);
        if (folderRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_FOLDER);
        const deleteFolderParams = [folderIdx, userIdFromJWT]
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteFolderResult = await wishlistDao.deleteFolderByIdx(connection, deleteFolderParams);

        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - deleteFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//위시 정보 수정
exports.editWish = async function (wishIdx, wishFolder_Idx, wishRoom_Idx){
    try {
        const folderRows = await wishlistProvider.folderCheck(wishFolder_Idx);
        if (folderRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_FOLDER);
        const wishRows = await wishlistProvider.wishCheck(wishIdx);
        if (wishRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_WISH);
        const roomRows = await wishlistProvider.roomCheck(wishRoom_Idx);
        if (roomRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_ROOM);
        const updateWishParams = [wishFolder_Idx, wishRoom_Idx, wishIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const editWishResult = await wishlistDao.editWishByIdx(connection, updateWishParams);
        connection.release();

    } catch(err) {
        logger.error(`App - editWish Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//위시 삭제
exports.deleteWish = async function (wishIdx, userIdFromJWT){
    try {
        const wishRows = await wishlistProvider.wishCheck(wishIdx);
        if (wishRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_WISH);
        const deleteWishParams = [wishIdx, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteWishResult = await wishlistDao.deleteWishByIdx(connection, deleteWishParams);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - deleteWish Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}