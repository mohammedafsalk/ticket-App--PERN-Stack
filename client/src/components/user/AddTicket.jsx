import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { message } from "antd";
import { useAuth } from "../../context/context";
import { createTicket } from "../../services/user";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddTicket({ open, handleClose, assignees }) {
  const { user, setRefresh } = useAuth();

  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assign, setAssign] = useState({});

  const handleSave = async () => {
    const values = {
      requested_by: user.details.name,
      requestedId: user.details.id,
      subject,
      status: "Open",
      dueDate,
      assignee: assign.name,
      assigneeId: assign.id,
    };
    let { data } = await createTicket(values);
    if (data.success) {
      handleClose();
      setRefresh();
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box textAlign={"center"}>
          <Typography variant="h5" fontWeight={500}>
            Enter Ticket Details
          </Typography>
        </Box>
        <Box py={2} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField
            id="outlined-multiline-static"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            multiline
            fullWidth
            rows={4}
          />

          <TextField
            id="standard-number"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="Date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            fullWidth
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Assign To"
            value={assign}
            onChange={(e) => setAssign(e.target.value)}
            fullWidth
          >
            {assignees.map((option) => (
              <MenuItem key={option.name} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            type="button"
            onClick={handleSave}
            variant="contained"
            sx={{ color: "white", bgcolor: "blue" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
