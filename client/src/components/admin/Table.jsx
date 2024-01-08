import * as React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import DetailsModal from "./DetailsModal";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const rowsheads = [
  "ID",
  "Requested by",
  "Assigned To",
  "Status",
  "Created on",
  "Due Date",
  "Action",
];

const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "blue";
    case "In progress":
      return "yellow";
    case "Pending":
      return "orange";
    case "Closed":
      return "red";
    default:
      return "";
  }
};

export default function DataTable({ datas }) {
  const [open, setOpen] = React.useState({
    open: false,
    item: "",
  });

  const handleClose = () => setOpen((prev) => ({ ...prev, open: false }));

  const handleOpen = (item) => {
    setOpen((prev) => ({ ...prev, item, open: true }));
  };

  return (
    <>
      {datas.length === 0 && (
        <div className="text-center font-bold text-2xl">No datas</div>
      )}
      {datas.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {rowsheads &&
                  rowsheads.map((item, i) => (
                    <StyledTableCell key={i} align="center">
                      {item}
                    </StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {datas &&
                datas.map((item, i) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.requested_by}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.assignee}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Chip
                        label={item.status}
                        style={{
                          backgroundColor: getStatusColor(item.status),
                          color:
                            getStatusColor(item.status) === "blue"
                              ? "white"
                              : "black",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(item.due_date).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button
                        onClick={() => handleOpen(item)}
                        className="bg-black  rounded-md text-white p-2"
                      >
                        View
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DetailsModal open={open} handleClose={handleClose} />
    </>
  );
}
