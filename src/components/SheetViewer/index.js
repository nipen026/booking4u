// import React, { useEffect, useState, useRef } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { EXPORT_BOOKING, EXPORT_PAYMENT } from "../../Api/post";
// import { useLocation } from "react-router-dom";
// import { Card, CardContent, Typography, Grid } from "@mui/material";
// import Header from "../../common/Header";


// // Function to calculate row span
// const getRowSpan = (startTime, endTime, allSlots) => {
//     let startIdx = allSlots.indexOf(startTime);
//     let endIdx = allSlots.indexOf(endTime);

//     if (startIdx === -1 || endIdx === -1) return 1; // Ensure valid index
//     return Math.max(1, endIdx + 1 - startIdx); // Adding +1 for correct row span
// };




// const SheetViewer = () => {
//     const location = useLocation();
//     const [tableData, setTableData] = useState(null);

//     useEffect(() => {
//         handleShow();
//     }, []);
//     console.log(location);

//     const handleShow = async () => {
//         try {
//             if (location.state.exportType == 'Bookings') {
//                 const res = await EXPORT_BOOKING({
//                     startDate: location?.state?.startDate,
//                     endDate: location?.state?.endDate
//                 });

//                 if (res.data.status) {
//                     setTableData(res.data);
//                 } else {
//                     alert("Failed to fetch booking data");
//                 }
//             } else {
//                 const res = await EXPORT_PAYMENT({
//                     startDate: location?.state?.startDate,
//                     endDate: location?.state?.endDate
//                 });

//                 if (res.data.status) {
//                     setTableData(res.data);
//                 } else {
//                     alert("Failed to fetch booking data");
//                 }
//             }

//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     };

//     const exportPDF = () => {
//         if (!tableData) return;

//         const { allSlots, dates, boxDetails, bookingData } = tableData;
//         const doc = new jsPDF("l", "mm", "a4");

//         // Table Headers
//         let headers = ["Slots"];
//         dates.forEach(date => {
//             boxDetails.forEach(box => {
//                 headers.push(`${box.name} (${new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })})`);
//             });
//         });

//         // Table Body
//         let body = allSlots.map((slot) => {
//             let row = [slot]; // First column (Time Slots)  

//             dates.forEach((date) => {
//                 boxDetails.forEach((box) => {
//                     let booking = bookingData.find((b) => b.date === date && b.boxName === box.name && b.startTime === slot);

//                     if (booking) {
//                         row.push(`${booking.name}\n${booking.phone}\n${booking.status}`);
//                     } else {
//                         row.push(""); // Empty cell if no booking
//                     }
//                 });
//             });

//             return row;
//         });

//         // Generate PDF Table
//         autoTable(doc, {
//             head: [headers],
//             body: body,
//             styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak" },
//             headStyles: { fillColor: "#1565C0", textColor: "#FFFFFF", fontSize: 10, fontStyle: "bold" },
//             alternateRowStyles: { fillColor: "#f9f9f9" },
//             columnStyles: { 0: { cellWidth: 25 } }, // Adjust slot column width
//             margin: { top: 20 }
//         });

//         doc.save("booking-report.pdf");
//     };

//     if (!tableData) return <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>Loading Booking Data...</p>;

//     const { allSlots, dates, boxDetails, bookingData } = tableData;
//     const totalCash = bookingData
//         .filter((b) => b.paymentMethod === "cash")
//         .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);

//     const totalPrepaid = bookingData
//         .filter((b) => b.paymentMethod === "prepaid")
//         .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);
//     return (
//        <>
//        <Header/>
//         <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//                 <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>📅 Booking Schedule</h2>
//                 {/* <Button variant="contained" color="primary" onClick={exportPDF}>Download PDF</Button> */}
//             </div>
//             <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: "10px",
//                 gap: "20px",
//                 fontSize: "14px",
//                 fontWeight: "bold"
//             }}>
//                 {/* 🔴 Red Badge for Cash */}
//                 <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                     <span style={{
//                         width: "15px",
//                         height: "15px",
//                         backgroundColor: "red",
//                         borderRadius: "50%",
//                         display: "inline-block"
//                     }}></span>
//                     <span>Cash</span>
//                 </div>

//                 {/* 🟢 Green Badge for Prepaid */}
//                 <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                     <span style={{
//                         width: "15px",
//                         height: "15px",
//                         backgroundColor: "green",
//                         borderRadius: "50%",
//                         display: "inline-block"
//                     }}></span>
//                     <span>Bank Transfer(UPI, NET BANKING)</span>
//                 </div>
//             </div>
//             <Grid container spacing={2} style={{ marginBottom: "20px" }}>
//                 {/* Cash Total Card */}
//                 <Grid item xs={12} sm={6} md={2}>
//                     <Card sx={{ backgroundColor: "red", color: "white", textAlign: "left" }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">Total Cash</Typography>
//                             <Typography variant="h5" fontWeight="bold">₹{totalCash}</Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Prepaid Total Card */}
//                 <Grid item xs={12} sm={6} md={2}>
//                     <Card sx={{ backgroundColor: "green", color: "white", textAlign: "left" }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">Total Bank Transfer</Typography>
//                             <Typography variant="h5" fontWeight="bold">₹{totalPrepaid}</Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//             <TableContainer
//                 component={Paper}
//                 sx={{
//                     boxShadow: 3,
//                     overflowX: "auto", // Enable horizontal scrolling on small screens
//                     width: "100%", // Ensure it takes full width
//                 }}
//             >
//                 <Table
//                     sx={{
//                         minWidth: 900, // Minimum width for large screens
//                         width: "100%", // Takes full width on smaller screens
//                         border: "1px solid #ddd",
//                     }}
//                     aria-label="booking table"
//                 >
//                     {/* Table Head */}
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#1E88E5" }}>
//                             <TableCell
//                                 align="center"
//                                 sx={{
//                                     fontWeight: "bold",
//                                     fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive font size
//                                     color: "white",
//                                     border: "1px solid #ddd",
//                                     width: { xs: "80px", sm: "120px", md: "150px" }, // Responsive width
//                                     minWidth: { xs: "80px", sm: "120px", md: "150px" },
//                                     whiteSpace: "nowrap", // Prevent wrapping
//                                     overflow: "hidden",
//                                     position: "sticky",
//                                     left: 0,
//                                     zIndex: 2,
//                                     backgroundColor: "#1E88E5",
//                                     textOverflow: "ellipsis", // Show '...' if text overflows
//                                 }}
//                             >
//                                 Slots
//                             </TableCell>
//                             {dates.map((date, index) => (
//                                 <TableCell
//                                     key={index}
//                                     colSpan={boxDetails.length}
//                                     align="center"
//                                     sx={{
//                                         fontWeight: "bold",
//                                         fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive text
//                                         color: "white",
//                                         border: "1px solid #ddd",
//                                         whiteSpace: "nowrap", // Prevent wrapping
//                                     }}
//                                 >
//                                     {new Date(date).toLocaleDateString("en-GB", {
//                                         weekday: "long",
//                                         day: "2-digit",
//                                         month: "short",
//                                     })}
//                                 </TableCell>
//                             ))}
//                         </TableRow>

//                         {/* Second Row: Box Names */}
//                         <TableRow sx={{ backgroundColor: "#1565C0" }}>
//                             <TableCell sx={{ border: "1px solid #ddd",  position: "sticky",
//                                     left: 0,
//                                     zIndex: 2,backgroundColor: "#1565C0" }}></TableCell>
//                             {dates.map((date) =>
//                                 boxDetails.map((box, index) => (
//                                     <TableCell
//                                         key={`${date}-${index}`}
//                                         align="center"
//                                         sx={{
//                                             fontWeight: "bold",
//                                             fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive text
//                                             color: "white",
//                                             border: "1px solid #ddd",
//                                             whiteSpace: "nowrap", // Prevent wrapping
//                                         }}
//                                     >
//                                         {box.name}
//                                     </TableCell>
//                                 ))
//                             )}
//                         </TableRow>
//                     </TableHead>

//                     {/* Table Body */}
//                     <TableBody>
//     {allSlots.map((slot, slotIndex) => (
//         <TableRow key={slotIndex}>
//             {/* Time Slot Column */}
//             <TableCell
//                 align="center"
//                 sx={{
//                     fontWeight: "bold",
//                     border: "1px solid #ddd",
//                     fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Responsive font size
//                     whiteSpace: "nowrap",
//                     backgroundColor: "white",
//                     position: "sticky",
//                     left: 0,
//                     zIndex: 3,
//                     borderRight: "2px solid #ddd",
//                 }}
//             >
//                 {slot} - {allSlots[slotIndex + 1] || ""}
//             </TableCell>

//             {/* Booking Data Cells */}
//             {dates.map((date) =>
//                 boxDetails.map((box, boxIndex) => {
//                     let booking = bookingData.find(
//                         (b) => b.date === date && b.boxName === box.name && b.startTime === slot
//                     );

//                     if (booking) {
//                         let rowSpan = getRowSpan(booking.startTime, booking.endTime, allSlots);
//                         let bgColor = booking.paymentMethod === "cash" ? "red" : "green";

//                         return (
//                             <TableCell
//                                 key={`${date}-${boxIndex}`}
//                                 rowSpan={rowSpan}
//                                 align="center"
//                                 sx={{
//                                     backgroundColor: bgColor,
//                                     color: "white",
//                                     fontWeight: "bold",
//                                     border: "1px solid #ddd",
//                                     fontSize: { xs: "10px", sm: "12px", md: "14px" },
//                                     whiteSpace: "nowrap",
//                                     padding: { xs: "4px", sm: "6px", md: "8px" },
//                                 }}
//                             >
//                                 <p style={{ margin: "0px" }}>{booking.name}</p>
//                                 <p style={{ margin: "0px" }}>{booking.phone}</p>
//                                 <p style={{ margin: "0px" }}>{booking.email}</p>
//                                 <span style={{ fontStyle: "italic" }}>{booking.status}</span>
//                                 <p style={{ fontStyle: "italic", margin: "0px" }}>
//                                     {booking.price ? `Price: ${booking.price - 10}` : ""}
//                                 </p>
//                             </TableCell>
//                         );
//                     }

//                     // Ensure slots that are part of an ongoing booking are not displayed again
//                     let isPartOfBooking = bookingData.some(
//                         (b) =>
//                             b.date === date &&
//                             b.boxName === box.name &&
//                             allSlots.indexOf(b.startTime) < slotIndex &&
//                             allSlots.indexOf(b.endTime) > slotIndex
//                     );

//                     return isPartOfBooking ? null : <TableCell key={`${date}-${boxIndex}`} />;
//                 })
//             )}
//         </TableRow>
//     ))}
// </TableBody>

//                 </Table>
//             </TableContainer>

//         </div>
//        </>
//     );
// };

// export default SheetViewer;
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import { EXPORT_BOOKING, EXPORT_PAYMENT } from "../../Api/post";
import { useLocation } from "react-router-dom";
import Header from "../../common/Header";

// Function to calculate row span
const getRowSpan = (startTime, endTime, allSlots) => {
    let startIdx = allSlots.indexOf(startTime);
    let endIdx = allSlots.indexOf(endTime);
    if (startIdx === -1 || endIdx === -1) return 1;
    return Math.max(1, endIdx + 1 - startIdx);
};

const SheetViewer = () => {
    const location = useLocation();
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        handleShow();
    }, []);

    const handleShow = async () => {
        try {
            const res =
                location.state.exportType === "Bookings"
                    ? await EXPORT_BOOKING({
                        startDate: location?.state?.startDate,
                        endDate: location?.state?.endDate
                    })
                    : await EXPORT_PAYMENT({
                        startDate: location?.state?.startDate,
                        endDate: location?.state?.endDate
                    });

            if (res.data.status) {
                setTableData(res.data);
            } else {
                alert("Failed to fetch booking data");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    if (!tableData) {
        return (
            <p
                style={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "20px"
                }}
            >
                Loading Booking Data...
            </p>
        );
    }

    const { allSlots, dates, boxDetails, bookingData,turfs } = tableData;
    
    const totalCash = bookingData
        .filter((b) => b.paymentMethod === "cash")
        .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);

    const totalPrepaid = bookingData
        .filter((b) => b.paymentMethod === "prepaid")
        .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);

    return (
        <>
            <Header />
            <div
                style={{
                    padding: "20px",
                    background: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        gap: "20px",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span
                            style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: "red",
                                borderRadius: "50%",
                                display: "inline-block"
                            }}
                        ></span>
                        <span>Cash</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span
                            style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: "green",
                                borderRadius: "50%",
                                display: "inline-block"
                            }}
                        ></span>
                        <span>Bank Transfer(UPI, NET BANKING)</span>
                    </div>
                </div>

                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ backgroundColor: "red", color: "white" }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    Total Cash
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    ₹{totalCash}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card sx={{ backgroundColor: "green", color: "white" }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    Total Bank Transfer
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    ₹{totalPrepaid}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: "auto" }}>
                    <Table sx={{ minWidth: 900 }} aria-label="booking table">
                        <TableHead>
                            {/* Date Header Row */}
                            <TableRow sx={{ backgroundColor: "#1E88E5" }}>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "white",
                                        border: "1px solid #ddd",
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 2,
                                        backgroundColor: "#1E88E5"
                                    }}
                                >
                                    Slots
                                </TableCell>
                                {dates.map((date, index) => (
                                    <TableCell
                                        key={index}
                                        colSpan={boxDetails.length}
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            border: "1px solid #ddd"
                                        }}
                                    >
                                        {new Date(date).toLocaleDateString("en-GB", {
                                            weekday: "long",
                                            day: "2-digit",
                                            month: "short"
                                        })}
                                    </TableCell>
                                ))}
                            </TableRow>

                            {/* Box Name Header Row */}
                            <TableRow sx={{ backgroundColor: "#1565C0" }}>
                                <TableCell sx={{ border: "1px solid #ddd", position: "sticky", left: 0, zIndex: 2, backgroundColor: "#1565C0" }} />
                                {dates.map((date) =>
                                    boxDetails.map((box, index) => (
                                        <TableCell
                                            key={`${date}-box-${index}`}
                                            align="center"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "white",
                                                border: "1px solid #ddd"
                                            }}
                                        >
                                            {box.name}
                                        </TableCell>
                                    ))
                                )}
                            </TableRow>

                            {/* Turf Row Header */}
                            <TableRow sx={{ backgroundColor: "#1976D2" }}>
                                <TableCell
                                    sx={{
                                        border: "1px solid #ddd",
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 2,
                                        backgroundColor: "#1976D2"
                                    }}
                                />
                                {dates.map((date) =>
                                    boxDetails.map((box, boxIdx) => (
                                        <TableCell
                                            key={`${date}-turf-${boxIdx}`}
                                            align="center"
                                            sx={{
                                                fontWeight: "normal",
                                                fontSize: "13px",
                                                color: "#fff",
                                                border: "1px solid #ddd"
                                            }}
                                        >
                                            {/* Show all turf names comma-separated (if multiple) */}
                                            {(turfs || []).map(turf => turf.turfname).join(", ") || "-"}
                                        </TableCell>
                                    ))
                                )}
                            </TableRow>
                        </TableHead>

                        {/* Table Body */}
                        <TableBody>
                            {allSlots.map((slot, slotIndex) => (
                                <TableRow key={slotIndex}>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            border: "1px solid #ddd",
                                            position: "sticky",
                                            left: 0,
                                            zIndex: 2,
                                            backgroundColor: "white"
                                        }}
                                    >
                                        {slot} - {allSlots[slotIndex + 1] || ""}
                                    </TableCell>

                                    {dates.map((date) =>
                                        boxDetails.map((box, boxIndex) => {
                                            let booking = bookingData.find(
                                                (b) =>
                                                    b.date === date &&
                                                    b.boxName === box.name &&
                                                    b.startTime === slot
                                            );

                                            if (booking) {
                                                const rowSpan = getRowSpan(booking.startTime, booking.endTime, allSlots);
                                                const bgColor = booking.paymentMethod === "cash" ? "red" : "green";

                                                return (
                                                    <TableCell
                                                        key={`${date}-${boxIndex}`}
                                                        rowSpan={rowSpan}
                                                        align="center"
                                                        sx={{
                                                            backgroundColor: bgColor,
                                                            color: "white",
                                                            fontWeight: "bold",
                                                            border: "1px solid #ddd"
                                                        }}
                                                    >
                                                        <p style={{ margin: "0px" }}>{booking.name}</p>
                                                        <p style={{ margin: "0px" }}>{booking.phone}</p>
                                                        <p style={{ margin: "0px" }}>{booking.email}</p>
                                                        <span style={{ fontStyle: "italic" }}>{booking.status}</span>
                                                        <p style={{ fontStyle: "italic", margin: "0px" }}>
                                                            {booking.price ? `Price: ₹${booking.price - 10}` : ""}
                                                        </p>
                                                    </TableCell>
                                                );
                                            }

                                            let isPartOfBooking = bookingData.some(
                                                (b) =>
                                                    b.date === date &&
                                                    b.boxName === box.name &&
                                                    allSlots.indexOf(b.startTime) < slotIndex &&
                                                    allSlots.indexOf(b.endTime) > slotIndex
                                            );

                                            return isPartOfBooking ? null : <TableCell key={`${date}-${boxIndex}`} />;
                                        })
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default SheetViewer;
