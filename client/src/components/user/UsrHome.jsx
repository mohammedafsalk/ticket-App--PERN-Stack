import React, { useEffect, useState } from "react";
import { AccountCircle, EventNote } from "@mui/icons-material";
import { Container, Tab, Tabs } from "@mui/material";
import AddTicket from "./AddTicket";
import { getAssignees } from "../../services/user";

export default function UsrHome() {
  const [value, setValue] = React.useState(1);
  const [open, setOpen] = useState(false);
  const [assignees, setAssignees] = useState([]);

  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = async () => {};

  useEffect(() => {
    (async function () {
      let { data } = await getAssignees();
      setAssignees(data.userDetails);
    })();
  }, []);

  return (
    <>
      <div className="min-h-screen max-w-[1280px] mx-auto flex flex-col">
        <nav className="bg-blue-400 p-4 text-white flex justify-between items-center">
          <div className="text-lg font-bold">Ticket App</div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-orange-500 text-white px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <Container
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tabs
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            sx={{ mb: 5 }}
          >
            <Tab icon={<AccountCircle />} label="Tickets" />
            <Tab icon={<EventNote />} label="Assigned to you" />
          </Tabs>
          {value === 0 && (
            <button
              className="bg-orange-500 text-white px-3 py-1 rounded"
              onClick={() => setOpen(true)}
            >
              Add Ticket
            </button>
          )}
          {value === 1 && (
            <button
              className="bg-orange-500 text-white px-3 py-1 rounded"
              onClick={handleLogout}
            >
              View Tickets
            </button>
          )}
        </Container>
      </div>
      <AddTicket open={open} handleClose={handleClose} assignees={assignees} />
    </>
  );
}
