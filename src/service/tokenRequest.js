function tokenApi() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  fetch(url)
    .then((response) => response.json()
      .then((json) => Promise.ok ?
        Promise.resolve(json) : Promise.reject(json)));
}

export default tokenApi;
