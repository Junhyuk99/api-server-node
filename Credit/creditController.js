const jwtMiddleware = require("../../config/jwtMiddleware");
const creditProvider = require("../Credit/creditProvider");
const creditService = require("../Credit/creditService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/* 29. [GET] /credits/:userIdx 특정 유저 결제수단 조회 (JWT) */
exports.getCredits = async function (req, res) {
    //Path Variable : userIdx
    const userIdFromJWT = req.verifiedToken.userId

    const {userIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const creditsByUserId = await creditProvider.retrieveCredits(userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, creditsByUserId));
};
