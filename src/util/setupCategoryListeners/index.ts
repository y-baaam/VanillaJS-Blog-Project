import { State } from "../state";

type setupCategory = {
  styles: { [key: string]: string };
  categoryState: State<string | null>;
  render: () => void;
};

/**
 * DOM의 클릭 이벤트에 대한 이벤트 리스너를 설정합니다.
 * 지정된 카테고리에 해당하는 DOM 요소가 클릭되면 상태를 업데이트하고
 * 해당 카테고리에 맞게 화면을 다시 렌더링합니다.
 *
 * @param styles
 * @param categoryState 현재 선택된 카테고리의 상태를 관리하는 객체
 * @param render 카테고리가 변경되었을 때 호출되어 화면을 다시 렌더링하는 함수
 */

export function setupCategoryListeners({
  styles,
  categoryState,
  render,
}: setupCategory) {
  document.addEventListener("click", (e) => {
    let target = e.target as HTMLElement;
    if (!target?.className?.includes(styles["posts__category"])) {
      return;
    }
    const category = target.getAttribute("data-category");
    if (category) {
      categoryState.setValue(category);
      render();
    }
  });
}
