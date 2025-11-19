// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    initScrollToTop();
});

// 맨 위로 버튼 초기화
function initScrollToTop() {
    // 맨 위로 버튼 생성
    var scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', '맨 위로');
    document.body.appendChild(scrollBtn);
    
    // 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // 클릭 이벤트
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 프로젝트 목록 불러오기
function loadProjects() {
    // 정적 데이터로 직접 프로젝트 정보 정의
    const projects = [
        {
            id: 1,
            title: "Cult Fight",
            description: "2D 횡스크롤 액션 도트 그래픽 게임",
            date: "2024-12",
            skills: ["Unity", "C#", "Visual Studio 2022"],
            image: "images/CultFight.jpg",
            link: "cultfight.html"
        },
        {
            id: 2,
            title: "나루나루",
            description: "지역 맛집찾기 어플",
            date: "2025-06",
            skills: ["Flutter", "Nodejs","MongoDB","ChatGPT","kakaoAPI"],
            image: "images/NaruNaru.jpg",
            link: "narunaru.html"
        },
        {
            id: 3,
            title: "My Trip Planner",
            description: "여행을 계획하고 관리하는 어플",
            date: "2025-06",
            skills: ["Android Studio", "Java","Firebase Realtime Database 및 Firestore"],
            image: "images/MyTripPlanner.jpg",
            link: "mytripplanner.html"
        }
    ];
    
    displayProjects(projects);
}

// 프로젝트 목록 화면에 표시
function displayProjects(projects) {
    var projectList = document.getElementById('project-list');
    
    if (!projectList) {
        return; // 프로젝트 목록 요소가 없으면 종료
    }
    
    // 프로젝트가 없을 때
    if (projects.length === 0) {
        projectList.innerHTML = '<p>등록된 프로젝트가 없습니다.</p>';
        return;
    }
    
    // 프로젝트 카드 생성
    projectList.innerHTML = '';
    
    projects.forEach(function(project) {
        var card = createProjectCard(project);
        projectList.appendChild(card);
    });
}

// 프로젝트 카드 생성 함수
function createProjectCard(project) {
    // 카드 div 생성
    var card = document.createElement('div');
    card.className = 'project-card';
    card.onclick = function() {
        goToProjectPage(project.link);
    };
    
    // 이미지
    if (project.image) {
        var img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.onerror = function() {
            // 이미지 로드 실패 시 대체 배경 표시
            this.style.display = 'none';
        };
        card.appendChild(img);
    }
    
    // 콘텐츠 래퍼
    var contentDiv = document.createElement('div');
    contentDiv.className = 'project-card-content';
    
    // 제목
    var title = document.createElement('h3');
    title.textContent = project.title;
    
    // 날짜
    var date = document.createElement('div');
    date.className = 'date';
    date.textContent = project.date;
    
    // 설명
    var description = document.createElement('p');
    description.textContent = project.description;
    
    // 기술 스택
    var skillsDiv = document.createElement('div');
    skillsDiv.className = 'skills';
    
    project.skills.forEach(function(skill) {
        var skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsDiv.appendChild(skillTag);
    });
    
    // 콘텐츠에 요소 추가
    contentDiv.appendChild(title);
    contentDiv.appendChild(date);
    contentDiv.appendChild(description);
    contentDiv.appendChild(skillsDiv);
    
    // 카드에 콘텐츠 추가
    card.appendChild(contentDiv);
    
    return card;
}

// 프로젝트 페이지로 이동
function goToProjectPage(link) {
    window.location.href = link;
}

// === 아래는 detail.html에서 사용하는 함수들 (나중을 위해 유지) ===

// URL에서 파라미터 가져오기
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 프로젝트 상세 정보 로드 (detail.html에서 사용)
function loadProjectDetail() {
    var projectId = getUrlParameter('id');
    
    if (!projectId) {
        alert('프로젝트 ID가 없습니다.');
        window.location.href = 'index.html';
        return;
    }
    
    fetch('/api/projects/' + projectId)
        .then(response => response.json())
        .then(project => {
            displayProjectDetail(project);
        })
        .catch(error => {
            console.error('프로젝트 상세 정보 로딩 실패:', error);
            alert('프로젝트를 찾을 수 없습니다.');
        });
}

// 프로젝트 상세 정보 표시
function displayProjectDetail(project) {
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-date').textContent = project.date;
    document.getElementById('project-description').textContent = project.description;
    
    var skillsList = document.getElementById('project-skills');
    skillsList.innerHTML = '';
    
    project.skills.forEach(function(skill) {
        var li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });
}