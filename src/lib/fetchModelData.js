/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 */
function fetchModel(url) {
  return fetch(url)
    .then((response) => {
      // Nếu server trả về mã lỗi (ví dụ 404 Not Found, 500 Server Error)
      if (!response.ok) {
        return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
      }
      // Dịch phản hồi từ server sang định dạng JSON
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi fetch dữ liệu:", error);
      return Promise.reject(error);
    });
}

export default fetchModel;