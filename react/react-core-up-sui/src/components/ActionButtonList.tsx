import { useState, useEffect, useCallback, useRef } from "react";
import UniversalProvider from "@walletconnect/universal-provider";
import { DEFAULT_SUI_METHODS } from "../config";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useNotification } from "../contexts/NotificationContext";
import "../styles/dropdown.css";
import { Spinner } from "./Spinner";

// Network options with chainId mapping
const NETWORK_OPTIONS = [
  { id: "mainnet", name: "Mainnet", url: "mainnet", chainId: "sui:mainnet" },
  { id: "testnet", name: "Testnet", url: "testnet", chainId: "sui:testnet" },
  { id: "devnet", name: "Devnet", url: "devnet", chainId: "sui:devnet" },
];

const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface ActionButtonListProps {
  provider: UniversalProvider | undefined;
  address: string | undefined;
  session: any;
  setSession: (session: any) => void;
}

export const ActionButtonList = ({
  provider,
  address,
  session,
  setSession,
}: ActionButtonListProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>(
    NETWORK_OPTIONS[0].id
  );
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [amount, setAmount] = useState("0");
  const [sendAddress, setSendAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [suiPrice, setSuiPrice] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { showNotification } = useNotification();

  // Initialize SUI client based on selected network
  const getSuiClient = () => {
    return new SuiClient({ url: getFullnodeUrl(selectedNetwork as any) });
  };

  // Fetch SUI price from CoinGecko API
  const fetchSuiPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd"
      );
      const data = await response.json();
      const price = data.sui?.usd;
      if (price) {
        setSuiPrice(price);
        console.log("💰 SUI Price updated:", price);
      }
    } catch (error) {
      console.error("❌ Error fetching SUI price:", error);
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // Function to get address for selected network
  const getAddressForNetwork = (network: string) => {
    if (!session?.namespaces?.sui?.accounts) return undefined;

    const accounts = session.namespaces.sui.accounts;
    const networkAccount = accounts.find((account: string) =>
      account.includes(`sui:${network}`)
    );

    return networkAccount ? networkAccount.split(":")[2] : undefined;
  };

  // Function to fetch SUI balance
  const fetchBalance = async () => {
    const networkAddress = getAddressForNetwork(selectedNetwork);
    const currentNetwork = NETWORK_OPTIONS.find(
      (net) => net.id === selectedNetwork
    );

    if (!networkAddress) {
      setBalance("0");
      console.log(
        `💰 No address available for ${selectedNetwork.toUpperCase()}`
      );
      return;
    }

    if (!currentNetwork) {
      console.error(`❌ Invalid network: ${selectedNetwork}`);
      setBalance("0");
      return;
    }

    console.log(
      `💰 Fetching balance for ${selectedNetwork.toUpperCase()} address: ${networkAddress}`
    );
    setIsLoadingBalance(true);

    try {
      const suiClient = getSuiClient();
      const balanceData = await suiClient.getBalance({
        owner: networkAddress,
        coinType: "0x2::sui::SUI",
      });

      // Convert balance from MIST to SUI (1 SUI = 1,000,000,000 MIST)
      const balanceInSui = (
        parseInt(balanceData.totalBalance) /
        10 ** 9
      ).toString();
      setBalance(parseFloat(balanceInSui).toFixed(4));
      console.log(
        `💰 Balance updated for ${selectedNetwork.toUpperCase()}: ${balanceInSui} SUI`
      );
    } catch (error) {
      console.error(
        `❌ Error fetching balance for ${selectedNetwork.toUpperCase()}:`,
        error
      );
      setBalance("0");
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Fetch balance when address or network changes
  useEffect(() => {
    if (address && session) {
      fetchBalance();
    }
  }, [address, selectedNetwork, session]);

  // Fetch SUI price periodically
  useEffect(() => {
    fetchSuiPrice(); // Initial fetch

    // Update price every 30 seconds
    const priceInterval = setInterval(fetchSuiPrice, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  // Log current network and address when they change
  useEffect(() => {
    const networkAddress = getAddressForNetwork(selectedNetwork);
    console.log(`🌐 Current Network: ${selectedNetwork.toUpperCase()}`);
    console.log(`📍 Selected Address: ${networkAddress || "Not connected"}`);
    console.log(
      `📊 Available Networks:`,
      session?.namespaces?.sui?.accounts?.map((account: string) => {
        const [namespace, chain, address] = account.split(":");
        return { chain, address };
      }) || "No networks available"
    );
  }, [address, selectedNetwork, session]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".network-dropdown")) {
        setIsNetworkDropdownOpen(false);
      }
    };

    if (isNetworkDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNetworkDropdownOpen]);

  // Function to set max amount
  const handleMaxAmount = () => {
    if (balance && balance !== "0") {
      setAmount(balance);
    }
  };

  // Function to handle network selection
  const handleNetworkSelect = (network: string) => {
    console.log(
      `🔄 Switching from ${selectedNetwork.toUpperCase()} to ${network.toUpperCase()}`
    );
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false);
    // Reset amount when switching networks
    setAmount("0");
  };

  // function to sign a personal message
  const handleSignMsg = async () => {
    const message = "Hello Reown AppKit with SUI!"; // message to sign
    const networkAddress = getAddressForNetwork(selectedNetwork);
    console.log("address", networkAddress);

    if (!networkAddress) {
      console.error("❌ No address available for signing");
      showNotification("error", "No address available for signing");
      return;
    }

    setIsSigningMessage(true);
    try {
      const method = DEFAULT_SUI_METHODS.SUI_SIGN_PERSONAL_MESSAGE;
      const req = {
        address: networkAddress,
        message: message,
      };

      console.log("📝 Message signing request:", req);

      const result = await provider!.request<{
        signature: string;
        publicKey: string;
      }>(
        {
          method,
          params: req,
        },
        `sui:${selectedNetwork}`
      );

      console.log("✅ Message signature:", result.signature);
      console.log("✅ Public key:", result.publicKey);
      console.log("✅ Signature (base64):", result.signature);

      showNotification("success", "Message signed successfully!");
    } catch (error: any) {
      console.error("❌ Message signing error:", error);

      // Check for specific error types
      const errorMessage = error.message || error.toString();

      if (
        errorMessage.includes("User rejected") ||
        errorMessage.includes("User denied") ||
        errorMessage.includes("cancelled") ||
        errorMessage.includes("rejected") ||
        errorMessage.includes("denied")
      ) {
        // User cancelled the signing request
        showNotification("error", "Message signing was cancelled");
      } else if (
        errorMessage.includes("timeout") ||
        errorMessage.includes("expired")
      ) {
        // Request timed out
        showNotification("error", "Signing request timed out");
      } else {
        // Other errors
        showNotification("error", `Failed to sign message: ${errorMessage}`);
      }
    } finally {
      setIsSigningMessage(false);
    }
  };

  // function to sign a transaction
  const handleSignTransaction = async () => {
    const networkAddress = getAddressForNetwork(selectedNetwork);
    console.log("address", networkAddress);

    if (!networkAddress || !sendAddress || amount === "0") {
      console.error("❌ Invalid transaction parameters");
      showNotification("error", "Invalid transaction parameters");
      return;
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      console.error("❌ Invalid amount:", amount);
      showNotification("error", "Invalid amount");
      return;
    }

    setIsSendingTransaction(true);
    try {
      const method = DEFAULT_SUI_METHODS.SUI_SIGN_AND_EXECUTE_TRANSACTION;

      // Create proper SUI transaction
      const tx = new Transaction();
      const amountInMist = Math.floor(amountNum * 10 ** 9); // Convert SUI to MIST

      console.log("💰 Amount in SUI:", amountNum);
      console.log("💰 Amount in MIST:", amountInMist);

      // Split coins from gas for transfer
      const [coin] = tx.splitCoins(tx.gas, [amountInMist]);
      tx.setSender(networkAddress);
      tx.transferObjects([coin], sendAddress);

      const serialized = await tx.toJSON();
      console.log("📝 Serialized transaction type:", typeof serialized);
      console.log("📝 Serialized transaction:", serialized);

      // Convert to base64 - handle both string and object cases
      const transactionString =
        typeof serialized === "string"
          ? serialized
          : JSON.stringify(serialized);
      const req = {
        transaction: btoa(transactionString),
        address: networkAddress,
      };

      console.log("📝 Transaction request:", req);

      const result = await provider!.request<{ digest: string }>(
        {
          method,
          params: req,
        },
        `sui:${selectedNetwork}`
      );

      console.log("✅ Transaction executed! Digest:", result.digest);

      // Copy digest to clipboard
      try {
        await navigator.clipboard.writeText(result.digest);
        showNotification(
          "success",
          `Transaction successful! Digest copied to clipboard`
        );
      } catch (clipboardError) {
        console.error("Failed to copy digest to clipboard:", clipboardError);
        showNotification(
          "success",
          `Transaction successful! Digest: ${result.digest.slice(0, 8)}...`
        );
      }

      // Refresh balance after successful transaction
      await fetchBalance();
    } catch (error: any) {
      console.error("❌ Transaction signing error:", error);

      // Check for specific error types
      const errorMessage = error.message || error.toString();

      if (
        errorMessage.includes("User rejected") ||
        errorMessage.includes("User denied") ||
        errorMessage.includes("cancelled") ||
        errorMessage.includes("rejected") ||
        errorMessage.includes("denied")
      ) {
        // User cancelled the transaction
        showNotification("error", "Transaction was cancelled");
      } else if (
        errorMessage.includes("timeout") ||
        errorMessage.includes("expired")
      ) {
        // Request timed out
        showNotification("error", "Transaction request timed out");
      } else if (
        errorMessage.includes("insufficient") ||
        errorMessage.includes("balance")
      ) {
        // Insufficient balance
        showNotification("error", "Insufficient balance for transaction");
      } else {
        // Other errors
        showNotification("error", `Transaction failed: ${errorMessage}`);
      }
    } finally {
      setIsSendingTransaction(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (!provider) return;
      setIsDisconnecting(true);
      await provider.disconnect();
      setSession(null);
      console.log("disconnected");
      showNotification("success", "Wallet disconnected successfully");
    } catch (error) {
      console.error("Failed to disconnect:", error);
      showNotification("error", "Failed to disconnect wallet");
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleConnect = async () => {
    try {
      if (!provider) {
        throw new Error("Provider is not initialized");
      }
      setIsConnecting(true);
      await provider.connect({
        optionalNamespaces: {
          sui: {
            methods: [
              DEFAULT_SUI_METHODS.SUI_SIGN_TRANSACTION,
              DEFAULT_SUI_METHODS.SUI_SIGN_AND_EXECUTE_TRANSACTION,
              DEFAULT_SUI_METHODS.SUI_SIGN_PERSONAL_MESSAGE,
            ],
            chains: ["sui:mainnet", "sui:testnet", "sui:devnet"],
            events: [],
          },
        },
      });
      showNotification("success", "Wallet connected successfully");
    } catch (error) {
      console.error("Failed to connect:", error);
      showNotification("error", "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSendAddress(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleSend = async () => {
    // Validate amount first
    const amountNum = parseFloat(amount);
    if (
      !sendAddress ||
      amount === "" ||
      amount === "0" ||
      isNaN(amountNum) ||
      amountNum <= 0
    ) {
      console.error("❌ Invalid send parameters:", {
        sendAddress,
        amount,
        amountNum,
      });
      return;
    }

    // Check if amount exceeds balance
    const balanceNum = parseFloat(balance);
    if (amountNum > balanceNum) {
      console.error("❌ Amount exceeds available balance");
      return;
    }

    await handleSignTransaction();
  };

  // Check if amount exceeds balance for button state
  const isAmountExceedingBalance = () => {
    const amountNum = parseFloat(amount);
    const balanceNum = parseFloat(balance);
    return amountNum > balanceNum;
  };

  // Check if form is valid for send button styling
  const isFormValid = () => {
    const amountNum = parseFloat(amount);
    return (
      session &&
      sendAddress &&
      amount !== "" &&
      amount !== "0" &&
      !isNaN(amountNum) &&
      amountNum > 0 &&
      !isAmountExceedingBalance()
    );
  };

  return (
    <Card className="w-full flex flex-col justify-center items-center self-stretch rounded-[36px] border border-white/2 bg-white/2">
      <CardContent className="p-0 w-full">
        {/* Connect Wallet Section */}
        <div className="flex p-5 justify-between items-center self-stretch">
          <div className="flex items-center gap-2.5">
            <div className="flex p-3 items-center gap-[10px] rounded-xl bg-white/5">
              <img
                src="/Wallet.png"
                alt="Wallet"
                width={16}
                height={16}
                className="opacity-60"
              />
            </div>
            <span className="section-title-text">Connect Wallet</span>
          </div>
          {session ? (
            <Button
              onClick={handleDisconnect}
              variant="default"
              className="relative blueberry-button"
              disabled={isDisconnecting}
            >
              {isDisconnecting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner className="w-5 h-5 text-black" />
                </div>
              )}
              <span className={isDisconnecting ? "opacity-0" : "opacity-100"}>
                Disconnect
              </span>
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              variant="default"
              className="relative blueberry-button"
              disabled={isConnecting}
            >
              {isConnecting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner className="w-5 h-5 text-black" />
                </div>
              )}
              <span className={isConnecting ? "opacity-0" : "opacity-100"}>
                Connect
              </span>
            </Button>
          )}
        </div>

        {/* Divider Container */}
        <div className="w-full px-5">
          <Separator />
        </div>

        {/* Prove Control Section */}
        <div className="flex p-5 justify-between items-center self-stretch">
          <div className="flex items-center gap-2.5">
            <div className="flex p-3 items-center gap-[10px] rounded-xl bg-white/5">
              <img
                src="/Auth.png"
                alt="Auth"
                width={16}
                height={16}
                className="opacity-60"
              />
            </div>
            <span className="section-title-text">Prove control</span>
          </div>
          <Button
            onClick={handleSignMsg}
            variant="ghost"
            className="relative bg-gray-200 hover:bg-gray-300 text-black text-sm font-semibold py-2 px-4 rounded-lg disabled:bg-gray-200 disabled:opacity-100"
            disabled={!session || isSigningMessage}
          >
            {isSigningMessage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner className="w-5 h-5 text-black" />
              </div>
            )}
            <span className={isSigningMessage ? "opacity-0" : "opacity-100"}>
              Sign
            </span>
          </Button>
        </div>

        {/* Divider Container */}
        <div className="w-full px-5">
          <Separator />
        </div>

        {/* Send Token Section */}
        <div
          id="send-token-section"
          className="flex flex-col p-5 gap-4 self-stretch items-start"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex p-3 items-center gap-[10px] rounded-xl bg-white/5">
              <img
                src="/Paperplane.png"
                alt="Send"
                width={16}
                height={16}
                className="opacity-60"
              />
            </div>
            <span className="section-title-text">Send token</span>
          </div>

          {/* Send Token Form Container */}
          <div className="flex flex-col items-start self-stretch rounded-[28px] border border-white/2 bg-white/2">
            {/* Amount Component */}
            <div className="w-full bg-[#2D2D2D] p-4 rounded-lg">
              <div className="flex items-center max-w-[400px]">
                {/* Left Column - Number Input Section */}
                <div className="flex-1 mr-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow valid numbers
                      if (
                        value === "" ||
                        (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)
                      ) {
                        setAmount(value);
                      }
                    }}
                    className="amount-input-text max-w-[155px]"
                    placeholder="0"
                    disabled={!session}
                    min="0"
                    step="0.0001"
                  />
                  <div className="text-xs text-gray-400">
                    {isAmountExceedingBalance() && amount !== "0"
                      ? "Insufficient balance"
                      : suiPrice &&
                        amount &&
                        amount !== "" &&
                        parseFloat(amount) > 0
                      ? `$${(parseFloat(amount) * suiPrice).toFixed(2)}`
                      : "$0"}
                  </div>
                </div>

                {/* Right Column - Token Section */}
                <div className="w-auto">
                  {/* Token Selector */}
                  <div className="relative network-dropdown">
                    <div
                      className="flex h-[32px] py-[5px] pl-[16px] pr-[12px] justify-center items-center gap-[4px] rounded-full border border-white/2 bg-white/2 cursor-pointer"
                      onClick={() => {
                        console.log(
                          `🔽 Opening dropdown. Available networks:`,
                          NETWORK_OPTIONS.map((n) => n.name)
                        );
                        setIsNetworkDropdownOpen(!isNetworkDropdownOpen);
                      }}
                    >
                      <Avatar className="w-[24px] h-[24px]">
                        <AvatarImage src="/sui-token.png" alt="SUI Token" />
                      </Avatar>
                      <span className="token-selector-text">
                        {
                          NETWORK_OPTIONS.find((n) => n.id === selectedNetwork)
                            ?.name
                        }
                      </span>
                      <ChevronDownIcon />
                    </div>

                    {/* Network Dropdown */}
                    {isNetworkDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1 network-dropdown-bg border border-white/10 rounded-lg shadow-2xl z-50 min-w-[140px]">
                        {NETWORK_OPTIONS.filter(
                          (network) => network.id !== selectedNetwork
                        ).map((network) => {
                          return (
                            <div
                              key={network.id}
                              className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer text-sm text-gray-300 rounded-lg transition-colors"
                              onClick={() => handleNetworkSelect(network.id)}
                            >
                              <Avatar className="w-[24px] h-[24px]">
                                <AvatarImage
                                  src="/sui-token.png"
                                  alt="SUI Token"
                                />
                              </Avatar>
                              <span className="token-selector-text">
                                {network.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Balance Component */}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {isLoadingBalance ? (
                      "Loading..."
                    ) : (
                      <span>
                        {balance}{" "}
                        <span
                          onClick={handleMaxAmount}
                          className="text-blue-400 hover:text-blue-300 cursor-pointer"
                          style={{
                            pointerEvents:
                              !session || balance === "0" || isLoadingBalance
                                ? "none"
                                : "auto",
                          }}
                        >
                          Max
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider Container */}
            <div className="w-full px-5">
              <Separator />
            </div>

            {/* Address Component */}
            <div className="w-full bg-[#2D2D2D] p-4 rounded-lg">
              <div className="flex items-center max-w-[400px]">
                {/* Left Column - Address Input Section */}
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    placeholder="Type address"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    className="address-input-text max-w-[200px]"
                    disabled={!session}
                  />
                </div>

                {/* Right Column - Paste Button Section */}
                <div className="w-auto">
                  <Button
                    onClick={handlePaste}
                    variant="default"
                    className="paste-button"
                    disabled={!session}
                  >
                    <img
                      src="/copy.png"
                      alt="Copy"
                      width={12}
                      height={12}
                      className="paste-button-icon"
                    />
                    <span className="paste-button-text">Paste</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            className={`relative w-full flex h-[48px] py-[13px] px-[18px] justify-center items-center gap-[6px] self-stretch rounded-[16px] border border-white/2 m-0 ${
              isFormValid()
                ? "send-button-active"
                : "bg-white/2 disabled:bg-white/2"
            }`}
            disabled={
              !session ||
              !sendAddress ||
              amount === "" ||
              amount === "0" ||
              isNaN(parseFloat(amount)) ||
              parseFloat(amount) <= 0 ||
              isAmountExceedingBalance() ||
              isSendingTransaction
            }
          >
            {isSendingTransaction && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner
                  className={`w-6 h-6 ${
                    isFormValid() ? "text-black" : "disabled-send-button-text"
                  }`}
                />
              </div>
            )}
            <span
              className={
                isSendingTransaction
                  ? "opacity-0"
                  : `opacity-100 ${
                      isFormValid()
                        ? "send-button-active-text"
                        : "disabled-send-button-text"
                    }`
              }
            >
              Send
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
