import React, { useState, useEffect } from "react";
import Navbar from "../home/navbar";
import { Box, Menu, Typography } from "@mui/material";
import InputAddress from "./textfield/address";
import InputBalance from "./textfield/balance";
import { ZHENLogo, RemindIcon } from "../home/icons";
import NextstepButtons from "./button/nextstepbutton";
import { useWallet } from "../../zhien/walletcontext";
import {
  formatBalance,
  formatGasPrice,
  formatGasPrice1,
} from "../../zhien/transform";
import { fetchGoldToCNYPrice } from "../home/api";

interface Send1Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleReturn: () => void;
  handleNext: () => void;
  setInputBalanceValue: (value: string) => void;
  setInputAddressValue: (value: string) => void;
}

const Send1: React.FC<Send1Props> = ({
  anchorEl,
  open,
  handleClose,
  handleReturn,
  handleNext,
  setInputBalanceValue,
  setInputAddressValue,
}) => {
  const { balance, gasPrice } = useWallet();
  const [goldToCNYPrice, setGoldToCNYPrice] = useState(null);
  const [disableNext, setDisableNext] = useState(true);
  const [balanceInput, setBalanceInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const isStrictFloat = (value: string) => /^-?\d*(\.\d+)?$/.test(value) && parseFloat(value) > 0.0001;

  const isValidEthereumAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleBalanceChange = (value: string) => {
    setBalanceInput(value);
    setInputBalanceValue(value);
    setDisableNext(!(isStrictFloat(value) && isValidEthereumAddress(addressInput)));
  };

  const handleAddressChange = (value: string) => {
    setAddressInput(value);
    setInputAddressValue(value);
    setDisableNext(!(isStrictFloat(balanceInput) && isValidEthereumAddress(value)));
  };

  useEffect(() => {
    fetchGoldToCNYPrice().then((priceInfo) => {
      setGoldToCNYPrice(priceInfo);
    });
  }, []);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: 360,
          height: 560,
          marginTop: "10px",
          borderRadius: "20px",
        },
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Navbar />
        <Box
          sx={{
            width: "320px",
            height: "160px",
            display: "flex",
            marginTop: "80px",
            textAlign: "left",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "24px", fontWeight: "normal" }}
          >
            发送 ZHEN
          </Typography>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                目标地址
              </Typography>
            </Box>
            <InputAddress onChange={handleAddressChange} />
          </Box>

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "210px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                border: "1.2px solid #D9D9D9",
                borderRadius: "8px",
                padding: "10px",
                alignItems: "center",
              }}
            >
              <ZHENLogo width={32} height={32} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "normal",
                  }}
                >
                  余额: {formatBalance(balance?.toString() || "0")} ZHEN
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "15px",
                    color: "#7F7F7F",
                    fontWeight: "normal",
                  }}
                >
                  ¥{" "}
                  {(
                    Number(formatBalance(balance?.toString() || "0")) *
                    (goldToCNYPrice || 0)
                  ).toFixed(3)}{" "}
                  CNY
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "normal",
                  }}
                >
                  发送数量
                </Typography>
              </Box>
              <InputBalance onChange={handleBalanceChange} />
            </Box>
          </Box>

          <Box
            sx={{
              width: "290px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border: "1.2px solid #D9D9D9",
              borderRadius: "8px",
              padding: "15px",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  网络资源费
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "14px",
                    color: "#7F7F7F",
                    fontWeight: "normal",
                  }}
                >
                  (实时)
                </Typography>
                <RemindIcon width={18} height={18} fill="#7F7F7F" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                }}
              >
                {formatGasPrice(gasPrice?.toString() || "0")} ZHEN
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#28A76F",
                }}
              >
                大概在 10秒 以内
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#7F7F7F",
                  }}
                >
                  最大费用:
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "normal",
                    color: "#7F7F7F",
                  }}
                >
                  {formatGasPrice1(gasPrice?.toString() || "0")} ZHEN
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "80px",
            }}
          >
            <NextstepButtons
              onReturn={handleReturn}
              onNext={handleNext}
              disableNext={disableNext}
            />
          </Box>
        </Box>
      </Box>
    </Menu>
  );
};

export default Send1;
