"use client";

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
} from "@mui/material";

export default function Home() {
  const [rows, setRows] = useState<number | string>("");
  const [cols, setCols] = useState<number | string>("");
  const [mainArray, setMainArray] = useState<string[][]>([]);
  const [temporaryArray, setTemporaryArray] = useState<string[][]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  const createArray = (): void => {
    if (/^\d*$/.test(rows.toString()) && /^\d*$/.test(cols.toString())) {
      const newMainArray: string[][] = [];
      const newTemporaryArray: string[][] = [];

      for (let i = 0; i < Number(rows); i++) {
        const row: string[] = [];
        const tempRow: string[] = [];
        for (let j = 0; j < Number(cols); j++) {
          row.push("");
          tempRow.push("");
        }
        newMainArray.push(row);
        newTemporaryArray.push(tempRow);
      }

      setMainArray(newMainArray);
      setTemporaryArray(newTemporaryArray);
      setShowTable(false);
    } else {
      alert("لطفاً فقط عدد وارد کنید");
    }
  };

  // Input validator: Only numbers allowed
  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ): void => {
    if (/^\d*$/.test(value)) {
      // Allow only numeric values
      const updatedTemporaryArray = [...temporaryArray];
      updatedTemporaryArray[rowIndex] = [...temporaryArray[rowIndex]];
      updatedTemporaryArray[rowIndex][colIndex] = value;
      setTemporaryArray(updatedTemporaryArray);
    } else {
      alert("لطفاً فقط عدد وارد کنید"); // Display alert for non-numeric input
    }
  };

  const toggleShowTable = (): void => {
    setMainArray([...temporaryArray]);
    setShowTable(true);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          direction: "rtl",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                align: "center",
                margin: "auto",
                height: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              ساخت آرایه دوبعدی دلخواه
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            لطفا تعداد سطرها و ستون‌های مورد نظر را وارد کرده و مقادیر آرایه را
            تنظیم کنید.
          </Typography>

          <Box display="flex" justifyContent="space-around">
            {/* Row input */}
            <TextField
              label="تعداد سطرها"
              type="text" // Change to text to allow typing
              fullWidth
              variant="outlined"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              inputProps={{
                pattern: "[0-9]*", // Keep the input only numeric
              }}
            />
            {/* Column input */}
            <TextField
              label="تعداد ستون‌ها"
              type="text" // Change to text to allow typing
              fullWidth
              variant="outlined"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              inputProps={{
                pattern: "[0-9]*", // Keep the input only numeric
              }}
            />
          </Box>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={createArray}>
              ایجاد آرایه
            </Button>
          </Box>

          {mainArray.length > 0 && (
            <>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
                sx={{ mt: 4 }}
              >
                مقادیر آرایه را وارد کنید (فقط اعداد)
              </Typography>

              <Box display="flex" flexDirection="column" alignItems="center">
                {temporaryArray.map((row, rowIndex) => (
                  <Box key={rowIndex} display="flex" justifyContent="center">
                    {row.map((cell, colIndex) => (
                      <TextField
                        key={colIndex}
                        type="text" // Change to text to allow typing
                        variant="outlined"
                        value={temporaryArray[rowIndex][colIndex]}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        sx={{ width: "60px", margin: "4px" }}
                        inputProps={{
                          pattern: "[0-9]*", // Numeric pattern for validation
                        }}
                      />
                    ))}
                  </Box>
                ))}
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  sx={{ background: "#2d6454" }}
                  onClick={toggleShowTable}
                >
                  نمایش جدول
                </Button>
              </Box>
            </>
          )}

          {showTable && mainArray.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableBody>
                  {mainArray.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        backgroundColor:
                          rowIndex % 2 === 0 ? "#fff" : "#9cabd8",
                      }}
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          align="center"
                          sx={{
                            height: "60px",
                            backdropFilter: "blur(0.5px)",
                            fontWeight: "800",
                            color: rowIndex % 2 === 0 ? "black" : "white",
                          }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" align="center">
              kiana lotfi{" "}
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}
