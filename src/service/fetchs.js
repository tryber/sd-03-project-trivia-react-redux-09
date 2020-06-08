export async function tokenApi() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch (error) {
    alert(error);
  }
}

