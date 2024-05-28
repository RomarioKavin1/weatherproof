const LitJsSdk = require("@lit-protocol/lit-node-client");
import { LitNetwork } from "@lit-protocol/constants";
import { checkAndSignAuthMessage } from "@lit-protocol/lit-node-client";

class Lit {
  litNodeClient: any;
  chain: string;
  accessControlConditions: any;
  wallet: any;
  constructor(client: any) {
    this.litNodeClient = client;
    this.chain = "ethereum";
    this.accessControlConditions = [
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
    this.wallet =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  }

  async connect() {
    await this.litNodeClient.connect();
  }

  async getSessionSigsServer() {
    const nonce = await this.litNodeClient.getLatestBlockhash();
    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
      nonce,
    });
    return authSig;
  }
  async encrypt(message: string) {
    const sessionSigs = await this.getSessionSigsServer();
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions: this.accessControlConditions,
        chain: this.chain,
        dataToEncrypt: message,
        authSig: sessionSigs,
      },
      this.litNodeClient
    );
    return {
      ciphertext,
      dataToEncryptHash,
    };
  }

  async decrypt(ciphertext: string, dataToEncryptHash: string) {
    const sessionSigs = await this.getSessionSigsServer();
    console.log("Aaah OOh: ", sessionSigs);
    const decryptedString = await LitJsSdk.decryptToString(
      {
        accessControlConditions: this.accessControlConditions,
        chain: this.chain,
        ciphertext,
        dataToEncryptHash,
        authSig: sessionSigs,
      },
      this.litNodeClient
    );
    console.log("Decrypted Stringasdsad: ", decryptedString);

    return { decryptedString };
  }

  //   async decryptLitAction(ciphertext: string, dataToEncryptHash: string) {
  //     const sessionSigs = await this.getSessionSigsServer();

  //     const res = await this.litNodeClient.executeJs({
  //       sessionSigs,
  //       code: litActionCode,
  //       jsParams: {
  //         accessControlConditions: this.accessControlConditions,
  //         ciphertext,
  //         dataToEncryptHash,
  //         sessionSigs,
  //         publicKey2: process.env.SOLANA_WALLET_C_PUBLIC_KEY,
  //       },
  //     });

  //     return res.response;
  //   }
}

const client = new LitJsSdk.LitNodeClient({
  litNetwork: LitNetwork.Cayenne,
  checkNodeAttestation: true,
  debug: true,
});

const lit = new Lit(client);
lit.connect();

export default lit;
