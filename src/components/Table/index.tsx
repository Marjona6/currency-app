import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{selectedCurrencies[0]}</StyledTableCell>
            {selectedCurrencies.slice(1).map((currency) => (
              <StyledTableCell align="right" key={currency}>
                {currency}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow key="conversion-row">
            <StyledTableCell component="th" scope="row">
              {"1.0000"}
            </StyledTableCell>
            {selectedCurrencies.slice(1).map((currency) => {
              const baseCurrency = selectedCurrencies[0];
              const conversionRate = conversionData && typeof conversionData[baseCurrency] === "object" && (conversionData[baseCurrency] as Record<string, number>)[currency];
              return (
                <StyledTableCell align="right" key={currency}>
                  {conversionRate ? conversionRate.toFixed(8) : "-"}
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
