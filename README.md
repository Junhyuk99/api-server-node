# Airbnb_test_Server_Rodin

### API Sheet Link
##### https://docs.google.com/spreadsheets/d/1SBCD3GKbmzFwv6dSziOM3ncdXmh5ZD0agPQvF_AaCLY/edit?usp=sharing

### ERD Link (AQuery Tool)
##### https://aquerytool.com/aquerymain/index/?rurl=98e911ca-2b66-4a6d-9dc6-2e1bc6b0f1b3&
##### Password : n72peb
<br/>

![모의외주 진행상황](https://user-images.githubusercontent.com/48585810/129224398-932b4fb0-0132-444f-8dbe-78100e4b6c29.png)
<br/>

###Directory Structure
```
📂 config
 ├── 📄 baseResponseStatus.js
 ├── 📄 express.js
 ├── 📄 jwtMiddleware.js
 ├── 📄 response.js
 └── 📄 winston.js                                      
📂 src
 └── 📂 app           			
      ├── 📂 Book           		
      |    ├── 📄 bookController.js        	
      |    ├── 📄 bookDao.js		
      |    ├── 📄 bookProvider.js		
      |    ├── 📄 bookRoute.js   		 
      |    └── 📄 bookService.js  		 
      ├── 📂 Credit         		
      |    ├── 📄 creditController.js       	
      |    ├── 📄 creditDao.js		
      |    ├── 📄 creditProvider.js   		
      |    ├── 📄 creditRoute.js   		 
      |    └── 📄 creditService.js 	
      ├── 📂 Review         		
      |    ├── 📄 reviewController.js          	
      |    ├── 📄 reviewDao.js 		
      |    ├── 📄 reviewProvider.js   		
      |    ├── 📄 reviewRoute.js   		 
      |    └── 📄 reviewService.js   	
      ├── 📂 Room          		
      |    ├── 📄 roomController.js          	
      |    ├── 📄 roomDao.js 		
      |    ├── 📄 roomProvider.js   		
      |    ├── 📄 roomRoute.js   		 
      |    └── 📄 roomService.js   	
      ├── 📂 Wishlist          	
      |    ├── 📄 wishlistController.js          	
      |    ├── 📄 wishlistDao.js 		
      |    ├── 📄 wishlistProvider.js   	
      |    ├── 📄 wishlistRoute.js   		 
      |    └── 📄 wishlistService.js  
      └── 📂 User          		
           ├── 📄 userController.js          	
           ├── 📄 userDao.js 	
           ├── 📄 userProvider.js   		
           ├── 📄 userRoute.js   		 
           └── 📄 userService.js  
📄 .gitignore                     		
📄 index.js                                                        	 
📄 package.json                      
📄 README.md
```

#### 21.07. 31.
1. 기획서 - 100%
2. RDS DB 구축 - 100%
3. Ec2 인스턴스 구축 - 100%
4. ERD 설계 - 50%
#### 21.08. 01.
1. ERD 설계 - 100%
2. API 리스트업 - 25%
3. dev/prod 서버 구축 - 80%
#### 21.08. 02. gitignore edit
1. API 리스트업 - 50%
2. dev/prod 서버 구축 - 100%
3. SSL 구축 - 100%
#### 21.08.03. 4APIs Created
1. 유저 생성,조회,로그인 API 구현
#### 21.08.04. 2APIs Added
1. 숙소 등록, 조회 API 구현
#### 21.08.06. 6APIs Added
1. API 리스트업 - 100%
2. 리뷰 관련 API 구현
#### 21.08.07. 5APIs Added
1. 예약 관련 API 구현
2. 결제수단 조회 API 구현
#### 21.08.08. Errors edit
1. Validation 수정, 오류 수정
#### 21.08.09. 6APIs Added
1. 위시리스트 관련 API 추가
#### 21.08.10. 3APIs Added
1. 숙소 관련 API 추가
#### 21.08.11. 7APIs Added
1. 유저 관련 API 추가
2. Validation 추가
#### 21.08.12. ~ 21.08.13.
1. 외부 API 연동
2. Validation 추가
3. 카카오 로그인 API 구현
4. 외부 API 추가 구현 시도하다가 블루스크린으로 날아감
