const fetchQuestions = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const data = await fetch(url);
    const json = await data.json();
    return json;
  } catch (error) {
    return error;
  }
};
export default fetchQuestions;
