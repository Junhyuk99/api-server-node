const jwtMiddleware = require("../../config/jwtMiddleware");
const wishlistProvider = require("../Wishlist/wishlistProvider");
const wishlistService = require("../Wishlist/wishlistService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/* 8. [GET] /wishlists/:userIdx 특정 유저 위시리스트 폴더 조회 (JWT) */
exports.getFolders = async function (req, res) {
    //Path Variable : userIdx
    const userIdFromJWT = req.verifiedToken.userId

    const {userIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const wishFolderByUserId = await wishlistProvider.retrieveWishFolder(userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, wishFolderByUserId));
};

/* 9. [GET] /wishlists/:userIdx/:wishFolderIdx 특정 유저 특정 위시리스트 조회 (JWT) */
exports.getWishlist = async function(req,res){
    const userIdFromJWT = req.verifiedToken.userId

    const {userIdx, wishFolderIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (!wishFolderIdx)
        return res.send(errResponse(baseResponse.FOLDER_IDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const wishByFolderId = await wishlistProvider.retrieveWishlist(userIdFromJWT, wishFolderIdx);
    return res.send(response(baseResponse.SUCCESS, wishByFolderId));
}

/* 10.[POST] /wishlists/folders 특정 유저 위시리스트 폴더 생성 (JWT) */
exports.postFolders = async function(req,res) {
    /* Body : wishFolderUser_Idx, wishFolderName, wishFolderImageUrl */
    const userIdFromJWT = req.verifiedToken.userId
    const { wishFolderUser_Idx, wishFolderName, wishFolderImageUrl } = req.body;
    if (wishFolderName.length > 50)
        return res.send(errResponse(baseResponse.FOLDER_NAME_LONG));
    if (!wishFolderUser_Idx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (!wishFolderName)
        return res.send(errResponse(baseResponse.FOLDER_NAME_EMPTY));
    if (userIdFromJWT != wishFolderUser_Idx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const createFolderResponse = await wishlistService.createFolders(userIdFromJWT, wishFolderName, wishFolderImageUrl);
    return res.send(createFolderResponse);
}

/* 11.[POST] /wishlists 특정 유저 위시리스트 추가 (JWT) */
exports.postWish = async function(req,res) {
    /* Body : userIdx, wishFolder_Idx, wishRoom_Idx */
    const userIdFromJWT = req.verifiedToken.userId
    const { userIdx, wishFolder_Idx, wishRoom_Idx } = req.body;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if(!wishRoom_Idx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    if(!wishFolder_Idx)
        return res.send(errResponse(baseResponse.FOLDER_IDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const createWishResponse = await wishlistService.createWish(wishFolder_Idx, wishRoom_Idx);
    return res.send(createWishResponse);
}

/* 12. [PATCH] /wishlists/folders 특정 유저 위시리스트 폴더 수정 (JWT) */
exports.editFolder = async function (req, res) {
    /* Body : folderIdx, wishFolderUser_Idx, wishFolderName, wishFolderImageUrl */
    const userIdFromJWT = req.verifiedToken.userId

    const {folderIdx, wishFolderUser_Idx, wishFolderName, wishFolderImageUrl} = req.body;
    if (wishFolderName.length > 50)
        return res.send(errResponse(baseResponse.FOLDER_NAME_LONG));
    if (!folderIdx)
        return res.send(errResponse(baseResponse.FOLDER_IDX_EMPTY));
    if (!wishFolderUser_Idx)
        return res.send(errResponse(baseResponse.USER_FOLDERUSERIDX_EMPTY));
    if (!wishFolderName)
        return res.send(errResponse(baseResponse.FOLDER_NAME_EMPTY));
    if (userIdFromJWT != wishFolderUser_Idx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editFolder = await wishlistService.editFolder(folderIdx, userIdFromJWT, wishFolderName, wishFolderImageUrl);
    return res.send(editFolder);
};

/* 13. [PATCH] /wishlists/status-folders 특정 폴더 삭제 (JWT) */
exports.deleteFolder = async function (req,res){
    const userIdFromJWT = req.verifiedToken.userId
    const {folderIdx, userIdx} = req.body;
    if (!folderIdx)
        return res.send(errResponse(baseResponse.FOLDER_IDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const deleteFolder = await wishlistService.deleteFolder(folderIdx, userIdFromJWT);
    return res.send(deleteFolder);
};

/* 14. [PATCH] /wishlists 특정 유저 위시리스트 수정 (JWT) */
exports.editWish = async function (req,res) {
    /* Body : wishIdx, userIdx, wishFolder_Idx, wishRoom_Idx */
    const userIdFromJWT = req.verifiedToken.userId
    const {wishIdx, userIdx, wishFolder_Idx, wishRoom_Idx} = req.body;
    if (!wishFolderIdx)
        return res.send(errResponse(baseResponse.FOLDER_IDX_EMPTY));
    if (!wishRoom_Idx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    if (!wishIdx)
        return res.send(errResponse(baseResponse.WISH_IDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editWish = await wishlistService.editWish(wishIdx, wishFolder_Idx, wishRoom_Idx);
    return res.send(response(baseResponse.SUCCESS, editWish));
};

/* 15. [PATCH] /wishlists/status 특정 위시 삭제 (JWT) */
exports.deleteWish = async function (req,res){
    const userIdFromJWT = req.verifiedToken.userId
    const {wishIdx, userIdx} = req.body;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (!wishIdx)
        return res.send(errResponse(baseResponse.WISH_IDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const deleteWish = await wishlistService.deleteWish(wishIdx, userIdFromJWT);
    return res.send(deleteWish);
};