import lighthouse from "@lighthouse-web3/sdk";
import { promises } from "dns";
import { useState } from "react";
export async function Upload({ details }: { details: string }) {
  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
  if (apiKey) {
    const { data } = await lighthouse.uploadText(details, apiKey);
    console.log(data.Hash);
    return data.Hash;
  } else {
    console.log("Lighthouse API Key not found");
  }
  const cid = "QmbyswsHbp3UtziX8FsAdxS1Mgmi75FeT8D7Et9vhkinSM";
}

export const readFileContent = async (cid: string): Promise<string[]> => {
  let ciphertext = "";
  let dataToEncryptHash = "";
  await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
    .then((response) => {
      if (response.ok) return response.text();
      throw new Error("Network response was not ok.");
    })
    .then((text) => {
      console.log("File content:", JSON.parse(text));
      ciphertext = JSON.parse(text).ciphertext;
      dataToEncryptHash = JSON.parse(text).dataToEncryptHash;
    })
    .catch((error) => {
      console.error("Failed to read the file:", error);
    });
  return [ciphertext, dataToEncryptHash];
};
