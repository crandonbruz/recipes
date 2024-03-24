export const searchRecipies = async (search: string) => {
  const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${search}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "642c45194bmsh4b63458a91440efp1e6cdcjsn94ba3ffd35c2",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
