export function createRotatingText(
  elementId: string,
  words: Array<string>,
  interval: number = 3000
) {
  let currentIndex = 0;
  let currentCharIndex = 0;
  let currentWord = words[currentIndex];
  let isAdding = true;

  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  const htmlElement = element as HTMLElement;

  function updateText() {
    setTimeout(
      () => {
        htmlElement.textContent = currentWord.slice(0, currentCharIndex);
        if (isAdding) {
          if (currentCharIndex === currentWord.length) {
            // 단어의 모든 문자가 추가된 경우
            isAdding = false; // 상태를 '제거'로 변경
            setTimeout(updateText, interval); // 단어를 일정 시간 동안 표시
          } else {
            currentCharIndex++;
            updateText(); // 다음 문자 추가
          }
        } else {
          // 문자를 제거하는 상태
          if (currentCharIndex === 0) {
            // 모든 문자가 제거된 경우
            isAdding = true; // 상태를 '추가'로 변경
            currentIndex = (currentIndex + 1) % words.length; // 다음 단어로 넘어감
            currentWord = words[currentIndex]; // 현재 단어 업데이트
            updateText(); // 타이핑 시작
          } else {
            currentCharIndex--;
            updateText(); // 다음 문자 제거
          }
        }
      },
      isAdding ? 120 : 60
    ); // 문자를 추가/제거하는 시간 간격
  }

  updateText(); // 초기 텍스트로 업데이트
}
