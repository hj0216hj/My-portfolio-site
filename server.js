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
        title: "포트폴리오 사이트",
        description: "나만의 포트폴리오 관리 사이트",
        date: "2025-11",
        skills: ["HTML", "CSS", "JavaScript", "Node.js"],
        image: "/images/project1.jpg"
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