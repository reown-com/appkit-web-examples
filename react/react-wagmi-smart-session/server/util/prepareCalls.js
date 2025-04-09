


export async function prepareCalls(args) {
    const projectId = process.env["SERVER_PROJECT_ID"];
    if (!projectId) {
      throw new Error("SERVER_PROJECT_ID is not set");
    }

    // i have to find the correct URL
    const url = `https://rpc.walletconnect.org/v1/wallet?projectId=${projectId}`;
    //const url = `https://rpc.walletconnect.org/v1/wallets/prepareCalls?projectId=${projectId}`;
  
    return jsonRpcRequest("wallet_prepareCalls", [args], url);
  }

  export async function sendPreparedCalls(args) {
    const projectId = process.env["SERVER_PROJECT_ID"];
    if (!projectId) {
      throw new Error("SERVER_PROJECT_ID is not set");
    }
    const url = `https://rpc.walletconnect.org/v1/wallet?projectId=${projectId}`;
    //const url = `https://rpc.walletconnect.org/v1/wallets/prepareCalls?projectId=${projectId}`;
  
    return jsonRpcRequest("wallet_sendPreparedCalls", [args], url);
  }
  
  async function jsonRpcRequest(method, params, url) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          jsonrpc: "2.0",
          id: "1",
          method,
          params,
        },
        bigIntReplacer,
      ),
    });

    if (!response.ok) {
      throw new UserOpBuilderApiError(response.status, await response.text());
    }

    const data = await response.json();

    if ("error" in data) {
      throw new UserOpBuilderApiError(500, JSON.stringify(data.error));
    }

    return data.result; // Return the result if successful
  }

  export function bigIntReplacer(_key, value) {
    if (typeof value === "bigint") {
      return `0x${value.toString(16)}`;
    }
  
    return value;
  }