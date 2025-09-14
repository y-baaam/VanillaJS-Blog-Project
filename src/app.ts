export default class App {
  constructor(rootElement: HTMLElement | null) {
    if (!rootElement) {
      console.error("App root element not found");
      return;
    }
    console.log("App initialized successfully");
    // 초기화 로직
  }
}
