// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

// 프로젝트 목록 불러오기
function loadProjects() {
    // 서버에서 프로젝트 데이터 가져오기
    fetch('/api/projects')
        .then(response => response.json())
        .then(projects => {
            displayProjects(projects);
        })
        .catch(error => {
            console.error('프로젝트 로딩 실패:', error);
        });
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
        goToDetail(project.id);
    };
    
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
    
    // 카드에 요소 추가
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(description);
    card.appendChild(skillsDiv);
    
    return card;
}

// 상세 페이지로 이동
function goToDetail(projectId) {
    window.location.href = 'detail.html?id=' + projectId;
}

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