import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/recipies", async (req, res) => {
  const search = req.query.query;
  console.log("Search query:", search);

  const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${search}`;
  console.log("Request URL:", url);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "642c45194bmsh4b63458a91440efp1e6cdcjsn94ba3ffd35c2",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    console.log("Response status:", response.status);

    const result = await response.json();
    console.log("Response body:", result);

    res.json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
