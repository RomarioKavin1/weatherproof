"use client";
import { readFileContent, Upload } from "@/helper/lighthouse";
import { decrypt, encrypt } from "@/helper/lit";
import { useState } from "react";
export default function Home() {
  const [ciphertext, setCiphertext] = useState("");
  const [dataToEncryptHash, setDataToEncryptHash] = useState("");
  const [cid, setCid] = useState("");
  const handleEncrypt = async () => {
    const { ciphertext, dataToEncryptHash } = await encrypt(
      "Lat: 12.9716, Long: 77.5946,Reason:Rainfall"
    );
    setCiphertext(ciphertext);
    setDataToEncryptHash(dataToEncryptHash);
    const cid = await Upload({
      details: `{"ciphertext": "${ciphertext}", "dataToEncryptHash": "${dataToEncryptHash}"}`,
    });
    setCid(cid);
    console.log(cid);
  };
  const handleDecrypt = async () => {
    await decrypt("Qma7Z3mU7oVudcV7vWp2HJcCRqHt7D4HkNjWrEXkvWdzbv");
  };
  return (
    <div>
      <button onClick={handleEncrypt}>Upload</button>
      <br />
      <button
        onClick={() =>
          readFileContent("Qma7Z3mU7oVudcV7vWp2HJcCRqHt7D4HkNjWrEXkvWdzbv")
        }
      >
        {" "}
        Read
      </button>
      <br />
      <button onClick={handleDecrypt}>Decrypt</button>
    </div>
  );
}
