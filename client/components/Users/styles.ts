export const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "25vh",
    width: "50%",
    backgroundColor: "#aec3b0",
    borderRadius: "10px",
    margin: "10px",
  },
  data: {
    border: "5px solid #edede9",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
  },
  button: {
    color: "#edede9",
  },
  map: {
    width: "50%",
    height: "100%",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#aec3b0",
    ["@media (max-width: 925px)"]: {
      width: "100%",
    },
  },
  title: {
    width: "100%",
    height: "100%",
    color: "#edede9",
  },

  ingredients: { width: "100%", height: "100%", color: "#edede9" },
  instructions: { width: "100%", height: "100%", color: "#edede9" },
  servings: { width: "100%", height: "100%", color: "#edede9" },
};
