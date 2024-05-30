"use client";
import React, { useState } from "react";
import { encrypt, decrypt } from "@/helper/lit";
function page() {
  const [ciphertext, setCiphertext] = useState("");
  const [dataToEncryptHash, setDataToEncryptHash] = useState("");
  const handleEncrypt = async () => {
    const { ciphertext, dataToEncryptHash } = await encrypt("Remo_mama");
    setCiphertext(ciphertext);
    setDataToEncryptHash(dataToEncryptHash);
  };
  const handleDecrypt = async () => {
    await decrypt(ciphertext, dataToEncryptHash);
  };
  return (
    <div>
      <button onClick={handleEncrypt}>encrypt</button>
      <br />
      <button onClick={handleDecrypt}>decrypt</button>
    </div>
  );
}

export default page;
