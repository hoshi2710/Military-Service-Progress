// HTML 업데이트 함수
function updateUI() {
  const container = document.getElementById("militaryContainer");
  container.innerHTML = "";

  militaryPersons.forEach((person) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const nameElement = document.createElement("h3");
    nameElement.textContent = person.name;

    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress-container");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.style.width = `${person.calculateServicePercentage()}%`;

    const progressText = document.createElement("span");
    progressText.textContent = `${person.calculateServicePercentage().toFixed(8)}%`;

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    card.appendChild(nameElement);
    card.appendChild(progressContainer);

    container.appendChild(card);
  });
}

class MilitaryServicePerson {
  constructor(name, startDate, endDate) {
    this.name = name;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);

    // 현재 복무일수와 남은 복무일수 계산하여 할당
    this.currentDays = this.calculateCurrentDays();
    this.remainingDays = this.calculateRemainingDays();
  }

  // 날짜를 밀리초로 환산하는 함수
  dateToMilliseconds(date) {
    return date.getTime();
  }

  // 현재 복무일수 계산
  calculateCurrentDays() {
    const today = new Date();
    const diffTime = today - this.startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  // 남은 복무일수 계산
  calculateRemainingDays() {
    const remainingTime = this.endDate - new Date();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    return remainingDays > 0 ? remainingDays : 0;
  }

  // 복무 퍼센트 계산
  calculateServicePercentage() {
    // 시작 날짜와 종료 날짜의 차이를 일수로 계산합니다.
    const days = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24);

    // 현재 날짜를 기준으로 시작 날짜까지 지나온 일수를 계산합니다.
    const passedDays = (new Date() - this.startDate) / (1000 * 60 * 60 * 24);
    // console.log(passedDays);

    // 퍼센트 비율을 계산합니다.
    let progress = (passedDays / days) * 100;
    progress = progress > 100 ? 100 : progress;
    // 소수점 8자리까지 반환합니다.
    return Number(progress);
  }
}

// 예제

// 장병 정보 배열
const militaryPersons = [
  new MilitaryServicePerson("이호현", "2023-02-13", "2024-08-12"),
  new MilitaryServicePerson("테스트", "2022-05-10", "2023-11-06"),
  new MilitaryServicePerson("홍길동", "2023-06-10", "2024-12-06"),
  new MilitaryServicePerson("이기영", "2021-05-10", "2022-11-06"),
  new MilitaryServicePerson("가나다", "2023-12-01", "2025-05-29"),
  // 추가 장병 정보...
];

// 업데이트 주기 설정 (예: 1초마다 업데이트)
setInterval(() => {
  militaryPersons.forEach((person) => {
    // 각 장병에 대한 가상의 업데이트 로직
    person.currentDays = person.calculateCurrentDays(); // 현재 복무일수 업데이트
    person.remainingDays = person.calculateRemainingDays(); // 남은 복무일수 업데이트
  });

  updateUI();
}, 1);
