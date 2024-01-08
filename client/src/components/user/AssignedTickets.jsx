import React from "react";
import { Chip } from "@mui/material";
export default function AssignedTickets({assingedTickets}) {
  return (
    <>
      {assingedTickets.length === 0 && <div>No tickets</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assingedTickets.length > 0 &&
          assingedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-5 flex flex-col gap-3 rounded-lg text-center max-w-60 "
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <div>
                <span>Subject:</span>
                <h2 className="text-md font-semibold ">{ticket.subject}</h2>
              </div>

              <p>Requested by : {ticket.requested_by}</p>
              <div className="flex justify-center">
                <Chip
                  className=" w-28 "
                  label={ticket.status}
                  color="primary"
                />
              </div>
              <p>Due Date: {new Date(ticket.due_date).toLocaleDateString()}</p>
              <p>
                {`Created At: ${new Date(
                  ticket.createdAt
                ).toLocaleDateString()}`}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
