"use client";
import { readFileContent, Upload } from "@/helper/lighthouse";
import { decrypt, encrypt } from "@/helper/lit";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { fetchWeatherData } from "@/helper/weatherxm";
export default function Home() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [ciphertext, setCiphertext] = useState("");
  const [dataToEncryptHash, setDataToEncryptHash] = useState("");
  const [cid, setCid] = useState("");
  const handleEncrypt = async (data: string) => {};
  const handleDecrypt = async () => {
    await decrypt("Qma7Z3mU7oVudcV7vWp2HJcCRqHt7D4HkNjWrEXkvWdzbv");
  };
  return (
    <div>
      <ConnectKitButton theme="retro" />

      <button onClick={() => {}}>Upload</button>
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
