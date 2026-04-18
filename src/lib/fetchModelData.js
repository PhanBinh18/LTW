function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
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