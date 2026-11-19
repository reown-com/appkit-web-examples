class UserOpBuilderApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'UserOpBuilderApiError';
  }
}

export async function prepareCalls(args) {
    const projectId = process.env["SERVER_PROJECT_ID"];
    if (!projectId) {
      throw new Error("SERVER_PROJECT_ID is not set");
    }

    // i have to find the correct URL
    const url = `https://rpc.walletconnect.org/v1/wallet?projectId=${projectId}`;
  
    return jsonRpcRequest("wallet_prepareCalls", [args], url);
  }

  export async function sendPreparedCalls(args) {
    const projectId = process.env["SERVER_PROJECT_ID"];
    if (!projectId) {
      throw new Error("SERVER_PROJECT_ID is not set");
    }
    const url = `https://rpc.walletconnect.org/v1/wallet?projectId=${projectId}`;
  
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

  export async function handleFetchReceipt(userOpHash, options = {}) {
    const { timeout = 30000, interval = 3000 } = options;
    const endTime = Date.now() + timeout;
  
    while (Date.now() < endTime) {
      const response = await getCallsStatus(userOpHash);
      if (response.status === "CONFIRMED") {
        return response;
      }
  
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  
    throw new AppError(
      ErrorCodes.TIMEOUT_ERROR,
      'Timeout: Transaction is still processing'
    );
  }

  export async function getCallsStatus(args, options = {}) {
    const projectId = process.env["SERVER_PROJECT_ID"];
    if (!projectId) {
      throw new Error("SERVER_PROJECT_ID is not set");
    }
    const url = `https://rpc.walletconnect.org/v1/wallet?projectId=${projectId}`;
  
    const { timeout = 60000, interval = 2000 } = options; // Increased timeout to 60 seconds, reduced interval to 2 seconds
    const endTime = Date.now() + timeout;
    while (Date.now() < endTime) {
      try {
        console.log("args: ", args);
        const response = await jsonRpcRequest("wallet_getCallsStatus", [args], url);
        console.log("response: ", response);
        
        // Handle different status cases
        if (response.status === "CONFIRMED") {
          return response;
        } else if (response.status === "FAILED") {
          throw new Error(`Transaction failed: ${response.error || 'Unknown error'}`);
        } else if (response.status === "PENDING") {
          // Continue polling
        } else {
          console.warn(`Unexpected status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error polling transaction status:", error);
        // Continue polling on non-fatal errors
        if (error.message.includes("SERVER_PROJECT_ID") || error.message.includes("Invalid response")) {
          throw error; // Re-throw critical errors
        }
      }
  
      // Wait for the specified interval before polling again
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error(
      `Timeout: Transaction not confirmed after ${timeout/1000} seconds. Last status: ${response?.status || 'unknown'}`
    );
  }

  export function bigIntReplacer(_key, value) {
    if (typeof value === "bigint") {
      return `0x${value.toString(16)}`;
    }
  
    return value;
  }