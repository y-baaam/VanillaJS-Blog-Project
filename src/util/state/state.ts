/**
 * 상태 변경 시 호출되는 함수의 타입
 */
type Listener<T> = (value: T) => void;

/**
 * 상태를 관리하는 클래스, 상태의 변경을 구독하고 알림을 받을 수 있음
 */
export class State<T> {
  private value: T; // 상태 값을 저장 할 변수
  private listeners: Listener<T>[] = []; // 상태 변경을 알릴 리스너 목록

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  /**
   * 현재 상태 값을 반환
   * @returns {T} 현재 상태 값
   */
  getValue(): T {
    return this.value;
  }

  /**
   * 상태 값을 설정하고, 모든 리스너에게 변경을 알림
   * @param {T} newValue - 새로운 상태 값
   */
  setValue(newValue: T): void {
    this.value = newValue;
    this.listeners.forEach((listener) => listener(newValue));
  }

  /**
   * 상태 변경을 구독할 리스너를 추가
   * @param {Listener<T>} listener - 상태 변경 시 호출될 리스너 함수
   */
  subscribe(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  /**
   * 상태 변경 구독을 취소
   * @param {Listener<T>} listener - 제거할 리스너 함수
   */
  unsubscribe(listener: Listener<T>): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}
