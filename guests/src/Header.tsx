import * as React from "react";

export const Header = () => {
  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "gray",
        cursor: "pointer",
      }}
      onClick={() => console.log("Header is interactive")}
    >
      <h1>Header from remote</h1>
    </div>
  );
};
