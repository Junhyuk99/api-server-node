const jwtMiddleware = require("../../config/jwtMiddleware");
const userProvider = require("../User/userProvider");
const userService = require("../User/userService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");
const {logger} = require("../../config/winston");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy
const crypto = require("crypto");


/* 1. [POST] /users = 유저 생성 (회원가입) */
exports.postUsers = async function (req, res) {
    /* Body: email, Name, BDay, password */
    const {email, name, BDay, password} = req.body;
    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    if (!BDay)
        return res.send(response(baseResponse.SIGNUP_BDAY_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (password.length <= 7)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    const signUpResponse = await userService.createUser(
        email, name, BDay, password
    );

    return res.send(signUpResponse);
};

/* 2. [GET] /users 전체 유저 조회*/
exports.getUsers = async function (req, res) {
    //const email = req.query.email;
    const userListResult = await userProvider.retrieveUserList();
    return res.send(response(baseResponse.SUCCESS, userListResult));
};

/* 3.[POST] /users/login 특정 유저 로그인 (JWT) */
exports.login = async function (req, res) {

    // Body : email, password
    const {email, password} = req.body;

    if (!email)
        return res.send(response(baseResponse.LOGIN_EMAIL_EMPTY));
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.LOGIN_EMAIL_ERROR_TYPE));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    // if(password.length <= 7)
    //     return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};

/* 4. [GET] /users/:userId 특정 유저 조회 (JWT) */
exports.getUserByIdx = async function (req, res) {
    //Path Variable : userIdx
    const userIdFromJWT = req.verifiedToken.userId

    const {userIdx} = req.params;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const userByUserId = await userProvider.retrieveUser(userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

/* 5. [PATCH] /users/:userIdx 특정 유저 프로필 수정 (JWT) */
exports.editProfile = async function (req, res) {
    //jwt - id
    //Path Variable : userIdx
    /* Body : userIntro, userLocation, userLanguage, userOffice */
    const userIdFromJWT = req.verifiedToken.userId

    const {userIdx} = req.params;
    const {userIntro, userLocation, userLanguage, userOffice} = req.body;

    console.log("수정된 유저 : ", userIdFromJWT)
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (!userIntro)
        return res.send(errResponse(baseResponse.USER_INTRO_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserProfile = await userService.editUserProfile(userIntro, userLocation, userLanguage, userOffice, userIdFromJWT)
    return res.send(response(baseResponse.SUCCESS, editUserProfile));
};

/* 39. [PATCH] /users/passwords 특정 유저 비밀번호 변경 (JWT) */
exports.editPasswords = async function (req, res) {
    /* Body : editPassword, userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {editPassword, userIdx} = req.body;
    if (!editPassword)
        return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserPassword = await userService.editPassword(editPassword, userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserPassword));
};

/* 40. [PATCH] /users/infos/names 특정 유저 이름 변경 (JWT) */
exports.editName = async function (req, res) {
    /* Body : editName, userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {editName, userIdx} = req.body;
    if (!editName)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserName = await userService.editName(editName, userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserName));

}

/* 41. [PATCH] /users/infos/BDays 특정 유저 생일 변경 (JWT) */
exports.editBDay = async function (req, res) {
    /* Body : editBday, userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {editBDay, userIdx} = req.body;
    if (!editBDay)
        return res.send(errResponse(baseResponse.EDIT_NO_BDAY));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserBDay = await userService.editBDay(editBDay, userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserBDay));
}

/* 42. [PATCH] /users/infos/emails 특정 유저 이메일 변경 (JWT) */
exports.editEmail = async function (req, res) {
    /* Body : eidtEmail, userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {editEmail, userIdx} = req.body;
    if (!editEmail)
        return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserEmail = await userService.editEmail(editEmail, userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserEmail));
}

/* 43. [PATCH} /users/infos/phonenumbers 특정 유저 전화번호 변경 (JWT) */
exports.editPhone = async function (req, res) {
    /* Body : editPhone, userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {editPhone, userIdx} = req.body;
    if (!editPhone)
        return res.send(errResponse(baseResponse.EDIT_NO_PHONE));
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserPhone = await userService.editPhone(editPhone, userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserPhone));
}

/* 44. [PATCH] /users/infos/hosts 특정 유저 호스트 등록 (JWT) */
exports.editHost = async function (req, res) {
    /* Body : userIdx */
    const userIdFromJWT = req.verifiedToken.userId
    const {userIdx} = req.body;
    if (!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    const editUserHost = await userService.editHost(userIdFromJWT);
    return res.send(response(baseResponse.SUCCESS, editUserHost));
}

/* 45. [GET] /users/login/ids 특정 유저 id 반환 (JWT) */
exports.getIdx = async function (req, res) {
    try {
        const userIdResult = req.verifiedToken.userId;
        console.log("조회된 유저 : ", userIdResult);
        return res.send(response(baseResponse.SUCCESS, userIdResult));
    } catch (err) {
        logger.error(`App - getIdx Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

/**
 * API No. 6
 * API Name : 카카오 로그인 API
 * [PATCH] /users/kakao-login
 */

passport.use('kakao-login', new KakaoStrategy({
    clientID: '0fa5f463770e34d5af94013141c3a369',
    callbackURL: '/auth/kakao/callback',
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(profile);
}));

exports.kakaoLogin = async function (req, res) {
    const {accessToken} = req.body;
    if (!accessToken)
        return res.send(errResponse(baseResponse.ACCESS_TOKEN_EMPTY)) //
    try {
        let kakao_profile;
        try {
            kakao_profile = await axios.get('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
        } catch (err) {
            return res.send(errResponse(baseResponse.ACCESS_TOKEN_WRONG)); // 2053 : 유효하지 않는 엑세스 토큰입니다.
        }

        const data = kakao_profile.data.kakao_account;
        const name = data.profile.nickname;
        const email = data.email;
        const emailCheckResult = await userProvider.emailCheck(email);
        if (emailCheckResult) {
            const userInfoRow = await userProvider.getUserInfo(email);
            let token = await jwt.sign({
                    userIdx: userInfoRow.userIdx
                },
                secret_config.jwtsecret,
                {
                    expiresIn: "365d",
                    subject: "userInfo",
                }
            );
            return res.send(response(baseResponse.SUCCESS, {
                'userIdx': userInfoRow.userIdx,
                'jwt': token,
                'message': '소셜로그인에 성공하셨습니다.'
            }));
        } else {
            const result = {
                name: name,
                email: email
            }
            return res.send(response(baseResponse.SUCCESS, {message: '회원가입이 가능합니다.', result}));
        }
    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
