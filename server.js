const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

// 정적 파일 서빙 설정 (HTML, CSS, JS 파일 등)
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'public')));
// 이렇게 설정하면 public 디렉토리 내의 파일들만 외부에 공개하게 됨

// SPA를 위한 라우팅: 모든 요청을 index.html로 리디렉션
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
