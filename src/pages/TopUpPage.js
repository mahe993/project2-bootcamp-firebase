import React, { useState } from "react";

const TopUpPage = () => {
  const [balance, setBalance] = useState(0);
  return (
    <>
      <div>TopUpPage</div>
      <button onClick={() => setBalance(balance + 100)}>Add Money</button>
    </>
  );
};

export default TopUpPage;
