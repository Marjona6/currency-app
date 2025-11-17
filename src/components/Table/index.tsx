import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ConversionData {
  date: string;
  [key: string]:
    | {
        [key: string]: number;
      }
    | string;
}

interface CurrencyTableProps {
  selectedCurrencies: string[];
  conversionData: ConversionData | null;
}

function CurrencyTable({ selectedCurrencies, conversionData }: CurrencyTableProps) {
  const [baseAmount, setBaseAmount] = useState<string>("1");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseAmount(e.target.value);
  };

  const baseAmountNum = parseFloat(baseAmount) || 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{selectedCurrencies[0].toUpperCase()}</StyledTableCell>
            {selectedCurrencies.slice(1).map((currency) => (
              <StyledTableCell align="right" key={currency}>
                {currency.toUpperCase()}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key="conversion-row">
            <StyledTableCell component="th" scope="row">
              <TextField type="number" value={baseAmount} onChange={handleAmountChange} size="small" />
            </StyledTableCell>
            {selectedCurrencies.slice(1).map((currency) => {
              const baseCurrency = selectedCurrencies[0];
              const conversionRate = conversionData && typeof conversionData[baseCurrency] === "object" && (conversionData[baseCurrency] as Record<string, number>)[currency];
              const convertedAmount = conversionRate ? conversionRate * baseAmountNum : null;
              return (
                <StyledTableCell align="right" key={currency}>
                  {convertedAmount !== null ? convertedAmount.toFixed(2) : "-"}
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CurrencyTable };
