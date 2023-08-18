import React, { useEffect, useState } from "react";
import Header from "./Header";
import Document from "./Document";
import { v4 as uuidV4 } from "uuid";

function Home() {
  const [documents, setDocument] = useState([]);

  useEffect(() => {
    const getDocuments = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:3000/documents", requestOptions)
        .then((response) => response.json())
        .then((result) => setDocument(result))
        .catch((error) => console.log("error", error));
    };
    getDocuments();
  }, []);
  return (
    <div>
      <Header />
      <div className="text-xl font-semibold text-left mb-4">Your Documents</div>
      <div className="flex gap-4 flex-wrap">
        {documents.map((item, index) => (
          <Document item={item} key={item._id} />
        ))}
        <Document item={{ _id: uuidV4(), new: true }} key={uuidV4()} />
      </div>
    </div>
  );
}

export default Home;
