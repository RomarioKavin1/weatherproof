import * as LitJsSdkNodeJs from "@lit-protocol/lit-node-client-nodejs";
import { checkAndSignAuthMessage } from "@lit-protocol/auth-browser";
import { LitNetwork } from "@lit-protocol/constants";

export async function encrypt(message: string) {
  const client = new LitJsSdkNodeJs.LitNodeClientNodeJs({
    litNetwork: LitNetwork.Cayenne,
    defaultAuthCallback: checkAndSignAuthMessage,
  });

  await client.connect();

  const authSig = await checkAndSignAuthMessage({
    chain: "ethereum",
  });
  console.log("AuthSig: ", authSig);
  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "000000000000", // 0.000001 ETH
      },
    },
  ];
  const chain = "ethereum";
  const { ciphertext, dataToEncryptHash } = await LitJsSdkNodeJs.encryptString(
    {
      accessControlConditions: accessControlConditions,
      // chain: chain,
      dataToEncrypt: message,
      // authSig: authSig,
    },
    client
  );
  console.log("Ciphertext: ", ciphertext);
  console.log("DataToEncryptHash: ", dataToEncryptHash);
  return { ciphertext, dataToEncryptHash };
}

export async function decrypt(ciphertext: any, dataToEncryptHash: any) {
  const client = new LitJsSdkNodeJs.LitNodeClientNodeJs({
    litNetwork: LitNetwork.Cayenne,
    defaultAuthCallback: checkAndSignAuthMessage,
  });

  await client.connect();

  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "000000000000", // 0.000001 ETH
      },
    },
  ];
  const message = "Hello pls work";
  const chain = "ethereum";
  const authSig = await checkAndSignAuthMessage({
    chain: "ethereum",
  });
  console.log("AuthSig: ", authSig);
  const decryptedString = await LitJsSdkNodeJs.decryptToString(
    {
      accessControlConditions: accessControlConditions,
      chain: chain,
      ciphertext,
      dataToEncryptHash,
      authSig: authSig,
    },
    client
  );
  console.log("Decrypted Stringasdsad: ", decryptedString);

  return { decryptedString };
}
