function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    const cleanUrl = url.replace(/^\/+/, '');
    const fullUrl = `http://localhost:8081/${cleanUrl}`;

    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          reject({ status: response.status, statusText: response.statusText });
          return;
        }
        return response.json();
      })
      .then(data => resolve({ data: data }))
      .catch(error => reject(error));
  });
}

export default fetchModel;