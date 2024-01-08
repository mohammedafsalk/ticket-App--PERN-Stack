import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import {
  GarageOutlined,
  MonetizationOnOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { adminLogout } from "../../services/admin";
import { useAuth } from "../../context/context";
const AdminHome = () => {
  const { setRefresh } = useAuth();
  const handleLogout = async () => {
    let { data } = await adminLogout();
    console.log(data);
    setRefresh();
  };

  return (
    <div className="min-h-screen max-w-[1280px] mx-auto flex flex-col">
      {/* Navbar */}

      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">Admin Panel</div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <Container sx={{ marginTop: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <MonetizationOnOutlined
                sx={{ color: "#6BAF76" }}
                fontSize="large"
              />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Users
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  className="text-gray-400"
                >
                  Total Users
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <GarageOutlined sx={{ color: "#DA3E40" }} fontSize="large" />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Users
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  className="text-gray-400"
                >
                  Total Users
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <PeopleAltOutlined sx={{ color: "#DD9167" }} fontSize="large" />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Users
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  className="text-gray-400"
                >
                  Total Users
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminHome;
