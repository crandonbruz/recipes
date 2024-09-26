export const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aec3b0",
    // borderRadius: "10px",
    // margin: "10px",
  },
  data: {
    border: "5px solid #edede9",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
  },
  button: {
    color: "#edede9",
    backgroundColor: "#264653",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#52796f",
    },
  },
  map: {
    width: "50%",
    height: "100%",
    padding: "20px",
    border: "5px solid #edede9",
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
    margin: "10px",
    fontSize: "40px",
  },

  ingredients: {
    width: "100%",
    height: "100%",
    color: "#edede9",
    margin: "10px",
  },
  instructions: {
    width: "100%",
    height: "100%",
    color: "#edede9",
    margin: "10px",
  },
  servings: { width: "100%", height: "100%", color: "#edede9", margin: "10px" },
};
