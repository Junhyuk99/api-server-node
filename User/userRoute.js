module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../config/jwtMiddleware');
    const passport = require('passport');

    // 1. 유저 생성 (회원가입) API
    app.post('/users', user.postUsers);

    // 2. 전체 유저 조회 API
    app.get('/users',user.getUsers);

    // 3. 로그인 하기 API (JWT 생성)
    app.post('/users/login', user.login);

    // 4. 특정 유저 조회 API
    app.get('/users/:userIdx',jwtMiddleware,  user.getUserByIdx);

    // 5. 회원 프로필 수정 API (JWT)
    app.patch('/users/:userIdx', jwtMiddleware, user.editProfile);

    // 39. 특정 유저 비밀번호 변경 API (JWT)
    app.patch('/users/infos/passwords', jwtMiddleware, user.editPasswords);

    // 40. 특정 유저 이름 변경 API (JWT)
    app.patch('/users/infos/names', jwtMiddleware, user.editName);

    // 41. 특정 유저 생일 변경 API (JWT)
    app.patch('/users/infos/Bdays', jwtMiddleware, user.editBDay);

    // 42. 특정 유저 이메일 변경 API (JWT)
    app.patch('/users/infos/emails', jwtMiddleware, user.editEmail);

    // 43. 특정 유저 전화번호 변경 API (JWT)
    app.patch('/users/infos/phonenumbers', jwtMiddleware, user.editPhone);

    // 44. 특정 유저 호스트 등록 API (JWT)
    app.patch('/users/infos/hosts', jwtMiddleware, user.editHost);

   // 47. 특정 유저 id 반환 API (JWT)
    app.get('/users/login/ids', jwtMiddleware, user.getIdx);

    // 카카오 로그인 API
    app.post('/users/kakao-login', user.kakaoLogin);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/auth/kakao/callback', passport.authenticate('kakao-login', {
        successRedirect: '/',
        failureRedirect : '/',
    }), (req, res) => {res.redirect('/');});

};