function getSelf(callback) {
  console.log('이 함수 작동?!')
  $.ajax({
    type: "GET",
    url: "/api/users/me",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      callback(response.user);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert("로그인이 필요합니다.");
      } else {
        localStorage.clear();
        alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
      }
      window.location.href = "/";
    },
  });
}