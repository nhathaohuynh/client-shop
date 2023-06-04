import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "../axios";

function Activation() {
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const activation_token = searchParams.get("token");

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await instance
          .post(
            `/user/activation`,
            {
              activation_token,
            },
            { withCredentials: true }
          )
          .then((res) => console.log(res))
          .catch((err) => {
            setError(true);
            console.log(err);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        fontSize: "30px",
        color: "green",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <h2>Token is expired</h2>
      ) : (
        <h2>Account was created successfully </h2>
      )}
    </div>
  );
}

export default Activation;
