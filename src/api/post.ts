export const apiHandler = async () => {
  try {
    const res = await fetch("/data/posts.json");
    if (!res.ok) {
      throw new Error("Error!!");
    }
    return await res.json();
  } catch (e) {
    console.error("fetch error: ", Error);
  }
};

// 다른 파일에서 이 함수를 호출하여 데이터를 사용할 수 있습니다.
// 예: apiHandler().then(posts => console.log(posts));
