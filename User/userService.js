const {logger} = require("../../config/winston");
const {pool} = require("../../config/database");
const secret_config = require("../../config/secret");
const userProvider = require("../User/userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");
const {errResponse} = require("../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//유저생성
exports.createUser = async function (email, name, BDay, password) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
            if (emailRows.length > 0)
                return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, name, BDay, hashedPassword];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// 로그인 (JWT 생성)
exports.postSignIn = async function (email, password) {

    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].userEmail

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].userPassword !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);


        console.log("로그인한 유저 :", userInfoRows[0].idx) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].idx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userIdx': userInfoRows[0].idx, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 유저 프로필 수정
exports.editUserProfile = async function (userIntro, userLocation, userLanguage, userOffice, userIdFromJWT) {
    try {

        const updateUserProfileParams = [userIntro, userLocation, userLanguage, userOffice, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editProfileResult = await userDao.editUserProfileById(connection, updateUserProfileParams);
        connection.release();

    } catch(err) {
        logger.error(`App - editUserProfile Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//유저 비밀번호 수정
exports.editPassword = async function (editPassword, userIdFromJWT) {
    try {
        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(editPassword)
            .digest("hex");
        const updatePasswordParams = [hashedPassword, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editPasswordResult = await userDao.editPasswordByIdx(connection, updatePasswordParams);
        console.log("수정된 회원 : ", userIdx)
        connection.release();

    } catch(err) {
        logger.error(`App - editPassword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//유저 이름 변경
exports.editName = async function (editName, userIdFromJWT) {
    try {
        const updateNameParams = [editName, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editNameResult = await userDao.editNameByIdx(connection, updateNameParams);
        console.log("수정된 회원 : ", userIdFromJWT)
        connection.release();
    } catch(err) {
        logger.error(`App - editName Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//생일 변경
exports.editBDay = async function (editBDay, userIdFromJWT) {
    try {
        const updateBDayParams = [editBDay, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editBDayResult = await userDao.editBDayByIdx(connection, updateBDayParams);
        console.log("수정된 회원 : ", userIdFromJWT)
        connection.release();
    } catch(err) {
        logger.error(`App - editBDay Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//이메일 변경
exports.editEmail = async function (editEmail, userIdFromJWT) {
    try {
        const updateEmailParams = [editEmail, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editEmailResult = await userDao.editEmailByIdx(connection, updateEmailParams);
        console.log("수정된 회원 : ", userIdFromJWT)
        connection.release();
    } catch(err) {
        logger.error(`App - editEmail Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//전화번호 변경
exports.editPhone = async function (editPhone, userIdFromJWT) {
    try {
        const updatePhoneParams = [editPhone, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);
        const editPhoneResult = await userDao.editPhoneByIdx(connection, updatePhoneParams);
        console.log("수정된 회원 : ", userIdFromJWT)
        connection.release();
    } catch(err) {
        logger.error(`App - editPhone Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//호스트 등록
exports.editHost = async function (userIdFromJWT) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const editHostResult = await userDao.editHostByIdx(connection, userIdFromJWT);
        console.log("호스트 등록된 회원 : ", userIdFromJWT)
        connection.release();
    } catch(err) {
        logger.error(`App - editHost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}