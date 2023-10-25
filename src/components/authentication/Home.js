import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  });
  return (
    <div>
      <div>Home</div>
    </div>
  );
}

export default Home;
