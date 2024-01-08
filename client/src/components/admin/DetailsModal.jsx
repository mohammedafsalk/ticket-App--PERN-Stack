import React, { useState } from "react";
import { message } from "antd";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { updateStatus } from "../../services/admin";
import { useAuth } from "../../context/context";
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

export default function DetailsModal({ open, handleClose }) {
  const { setRefresh } = useAuth();
  const [value, setValue] = useState("");
  const statusOptions = ["Open", "In progress", "Pending", "Closed"];

  const handleSave = async (id) => {
    const values = { id, value };
    let { data } = await updateStatus(values);
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
      open={open.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box textAlign={"center"}>
          <Typography variant="h5" fontWeight={500}>
            Update Ticket Status
          </Typography>
        </Box>
        <Box py={2} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField
            id="outlined-multiline-static"
            label="Requested by"
            value={open?.item?.requested_by}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Subject"
            value={open?.item?.assignee}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Subject"
            value={open?.item?.subject}
            multiline
            fullWidth
            InputProps={{ readOnly: true }}
            rows={2}
          />
          <TextField
            id="outlined-select-currency"
            select
            defaultValue={open?.item?.status}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            type="button"
            onClick={() => handleSave(open?.item?.id)}
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
