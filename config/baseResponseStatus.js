module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력하세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 최소 8자 이상이어야 합니다. 다시 시도해 주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"아름을 입력하세요." },
    SIGNUP_BDAY_EMPTY : { "isSuccess": false,"code": 2007,"message":"계속하시려면 생일을 선택하세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERIDX_EMPTY : { "isSuccess": false, "code": 2012, "message": "userIdx를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    LOGIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2019, "message": "이메일이 필요합니다" },
    LOGIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2020, "message": "이메일을 입력하세요" },
    ROOM_IDX_EMPTY : { "isSuccess": false, "code": 2021, "message": "roomIdx를 입력하세요" },
    USER_FOLDERUSERIDX_EMPTY : { "isSuccess": false, "code": 2022, "message": "wishFolderUser_Idx를 입력하세요" },
    WISH_IDX_EMPTY : { "isSuccess": false, "code": 2023, "message": "wishlist idx를 입력하세요" },
    FOLDER_IDX_EMPTY : { "isSuccess": false, "code": 2024, "message": "folderIdx를 입력하세요" },
    EDIT_NO_BDAY : { "isSuccess": false, "code": 2025, "message": "BDay를 입력하세요" },
    EDIT_NO_PHONE : { "isSuccess": false, "code": 2026, "message": "phonenumber를 입력하세요" },
    USER_INTRO_EMPTY : { "isSuccess": false, "code": 2027, "message": "userIntro를 입력하세요" },
    FOLDER_NAME_EMPTY : { "isSuccess": false, "code": 2028, "message": "folderName을 입력하세요" },
    FOLDER_NAME_LONG : { "isSuccess": false, "code": 2029, "message": "폴더의 이름을 50자 이하로 입력하세요" },
    ROOM_INFO_EMPTY : { "isSuccess": false, "code": 2030, "message": "숙소를 생성하는데 필요한 정보가 부족합니다" },
    ROOM_EDIT_EMPTY : { "isSuccess": false, "code": 2031, "message": "숙소를 수정하는데 필요한 정보가 부족합니다" },
    BOOK_IDX_EMPTY : { "isSuccess": false, "code": 2032, "message": "bookIdx를 입력해주세요" },
    REVIEW_INFO_EMPTY : { "isSuccess": false, "code": 2033, "message": "리뷰내용을 입력해주세요" },
    REVIEW_INFO_LENGTH : { "isSuccess": false, "code": 2034, "message": "리뷰내용은 50자 이내로 입력해주세요" },
    ACCESS_TOKEN_EMPTY : { "isSuccess": false, "code": 2035, "message": "accessToken을 입력해주세요!" },
    ACCESS_TOKEN_WRONG : { "isSuccess": false, "code": 2036, "message": "유효하지 않은 accessToken입니다" },

    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "이메일이 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    EDIT_NO_FOLDER : { "isSuccess": false, "code": 3007, "message": "존재하지 않는 위시리스트 폴더입니다" },
    EDIT_NO_WISH: { "isSuccess": false, "code": 3008, "message": "존재하지 않는 위시리스트 입니다" },
    EDIT_NO_ROOM: { "isSuccess": false, "code": 3009, "message": "존재하지 않는 숙소 입니다" },
    EDIT_NO_USER: { "isSuccess": false, "code": 3010, "message": "존재하지 않는 유저 입니다" },
    CREATE_NO_BOOK: { "isSuccess": false, "code": 3011, "message": "존재하지 않는 예약 입니다" },
    BOOK_NO_ROOM : { "isSuccess": false, "code": 3012, "message": "예약 번호에 맞지 않는 숙소입니다" },


    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
