// 모듈을 추출합니다
var express = require('express');
var bodyParser = require('body-parser');

// 웹 서버를 생성합니다
var app = express();

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 포트폴리오 데이터 (나중에 JSON 파일로 분리 가능)
var projects = [
    {
        id: 1,
        title: "Cult Fight",
        description: "2D 횡스크롤 액션 도트 그래픽 게임",
        date: "2024-12",
        skills: ["Unity", "C#"],
        image: "/images/CultFight.jpg"
    },
    {
        id: 2,
        title: "나루나루",
        description: "지역 맛집찾기 어플",
        date: "2025-06",
        skills: ["Flutter", "Nodejs","MongoDB","ChatGPT","kakaoAPI"],
        image: "/images/NaruNaru.jpg"
    },
    {
        id: 3,
        title: "My Trip Planner",
        description: "여행을 계획하고 관리하는 어플",
        date: "2025-06",
        skills: ["Android Studio", "Java","Firebase Realtime Database 및 Firestore"],
        image: "/images/MyTripPlanner.jpg"
    }
];

// 프로젝트 목록 조회 API
app.get('/api/projects', function(request, response) {
    response.json(projects);
});

// 프로젝트 상세 조회 API
app.get('/api/projects/:id', function(request, response) {
    var id = parseInt(request.params.id);
    var project = projects.find(p => p.id === id);
    
    if (project) {
        response.json(project);
    } else {
        response.status(404).json({ error: '프로젝트를 찾을 수 없습니다' });
    }
});

// 웹 서버를 실행합니다
app.listen(3000, function() {
    console.log('Server Running at http://localhost:3000');
    console.log('포트폴리오 사이트가 실행되었습니다!');
});