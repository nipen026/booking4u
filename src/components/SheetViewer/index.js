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
                            {/* Date Header */}
                            <TableRow sx={{ backgroundColor: "#1E88E5" }}>
                                <TableCell
                                    align="center"
                                    rowSpan={3}
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
                                {dates.map((date) => {
                                    const turfsPerDate = boxDetails.reduce((sum, box) => {
                                        const turfsForBox = turfs.filter((t) => t.boxId === box.id);
                                        return sum + turfsForBox.length;
                                    }, 0);

                                    return (
                                        <TableCell
                                            key={date}
                                            colSpan={turfsPerDate}
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
                                    );
                                })}
                            </TableRow>

                            {/* Box Name Row */}
                            <TableRow sx={{ backgroundColor: "#1565C0" }}>
                                {dates.map((date) =>
                                    boxDetails.map((box, boxIndex) => {
                                        const boxTurfs = turfs.filter((t) => t.boxId === box.id);
                                        return (
                                            <TableCell
                                                key={`${date}-box-${boxIndex}`}
                                                colSpan={boxTurfs.length}
                                                align="center"
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "white",
                                                    border: "1px solid #ddd"
                                                }}
                                            >
                                                {box.name}
                                            </TableCell>
                                        );
                                    })
                                )}
                            </TableRow>

                            {/* Turf Row */}
                            <TableRow sx={{ backgroundColor: "#1976D2" }}>
                                {dates.map((date) =>
                                    boxDetails.map((box) => {
                                        const boxTurfs = turfs.filter((t) => t.boxId === box.id);                                        
                                        return boxTurfs.map((turf) => (
                                            <TableCell
                                            key={`${date}-${box.id}-${turf.id}`}
                                                align="center"
                                                sx={{
                                                    fontWeight: "normal",
                                                    fontSize: "13px",
                                                    color: "#fff",
                                                    border: "1px solid #ddd"
                                                }}
                                            >
                                                {turf.turfname}
                                            </TableCell>
                                        ));
                                    })
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
                                        boxDetails.map((box) => {
                                            const boxTurfs = turfs.filter((t) => t.boxId === box.id);
                                        
                                            return boxTurfs.map((turf) => {
                                                
                                                const booking = bookingData.find(
                                                    (b) =>
                                                        b.date === date &&
                                                    b.boxId === box.id &&
                                                    b.turfId === turf.id &&
                                                    b.startTime === slot
                                                );
                                                
                                                console.log(bookingData.find(
                                                    (b) => b))
                                                if (booking) {
                                                    const rowSpan = getRowSpan(booking.startTime, booking.endTime, allSlots);
                                                    const bgColor = booking.paymentMethod === "cash" ? "red" : "green";
                                        
                                                    return (
                                                        <TableCell
                                                            key={`${date}-${box.id}-${turf.id}`}
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
                                        
                                                // Check if this cell falls under a previously spanned booking
                                                const isPartOfBooking = bookingData.some(
                                                    (b) =>
                                                        b.date === date &&
                                                        b.boxId === box.id &&
                                                        b.turfId === turf.id &&
                                                        allSlots.indexOf(b.startTime) < slotIndex &&
                                                        allSlots.indexOf(b.endTime) > slotIndex
                                                );
                                        
                                                return isPartOfBooking ? null : (
                                                    <TableCell
                                                        key={`${date}-${box.id}-${turf.id}`}
                                                        sx={{ border: "1px solid #ddd" }}
                                                    />
                                                );
                                            });
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
// import React, { useEffect, useState } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Grid,
//     Card,
//     CardContent,
//     Typography
// } from "@mui/material";
// import { EXPORT_BOOKING, EXPORT_PAYMENT } from "../../Api/post";
// import { useLocation } from "react-router-dom";
// import Header from "../../common/Header";

// // Function to calculate row span
// const getRowSpan = (startTime, endTime, allSlots) => {
//     let startIdx = allSlots.indexOf(startTime);
//     let endIdx = allSlots.indexOf(endTime);
//     if (startIdx === -1 || endIdx === -1) return 1;
//     return Math.max(1, endIdx + 1 - startIdx);
// };

// const SheetViewer = () => {
//     const location = useLocation();
//     const [tableData, setTableData] = useState(null);

//     useEffect(() => {
//         handleShow();
//     }, []);

//     const handleShow = async () => {
//         try {
//             const res =
//                 location.state.exportType === "Bookings"
//                     ? await EXPORT_BOOKING({
//                         startDate: location?.state?.startDate,
//                         endDate: location?.state?.endDate
//                     })
//                     : await EXPORT_PAYMENT({
//                         startDate: location?.state?.startDate,
//                         endDate: location?.state?.endDate
//                     });

//             if (res.data.status) {
//                 setTableData(res.data);
//             } else {
//                 alert("Failed to fetch booking data");
//             }
//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     };

//     if (!tableData) {
//         return (
//             <p
//                 style={{
//                     textAlign: "center",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                     marginTop: "20px"
//                 }}
//             >
//                 Loading Booking Data...
//             </p>
//         );
//     }

//     const { allSlots, dates, boxDetails, bookingData, turfs } = tableData;

//     const totalCash = bookingData
//         .filter((b) => b.paymentMethod === "cash")
//         .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);

//     const totalPrepaid = bookingData
//         .filter((b) => b.paymentMethod === "prepaid")
//         .reduce((sum, b) => sum + (b.price ? b.price - 10 : 0), 0);

//     return (
//         <>
//             <Header />
//             <div
//                 style={{
//                     padding: "20px",
//                     background: "#f5f5f5",
//                     minHeight: "100vh"
//                 }}
//             >
//                 <div
//                     style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginBottom: "10px",
//                         gap: "20px",
//                         fontSize: "14px",
//                         fontWeight: "bold"
//                     }}
//                 >
//                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                         <span
//                             style={{
//                                 width: "15px",
//                                 height: "15px",
//                                 backgroundColor: "red",
//                                 borderRadius: "50%",
//                                 display: "inline-block"
//                             }}
//                         ></span>
//                         <span>Cash</span>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                         <span
//                             style={{
//                                 width: "15px",
//                                 height: "15px",
//                                 backgroundColor: "green",
//                                 borderRadius: "50%",
//                                 display: "inline-block"
//                             }}
//                         ></span>
//                         <span>Bank Transfer(UPI, NET BANKING)</span>
//                     </div>
//                 </div>

//                 <Grid container spacing={2} style={{ marginBottom: "20px" }}>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <Card sx={{ backgroundColor: "red", color: "white" }}>
//                             <CardContent>
//                                 <Typography variant="h6" fontWeight="bold">
//                                     Total Cash
//                                 </Typography>
//                                 <Typography variant="h5" fontWeight="bold">
//                                     ₹{totalCash}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={2}>
//                         <Card sx={{ backgroundColor: "green", color: "white" }}>
//                             <CardContent>
//                                 <Typography variant="h6" fontWeight="bold">
//                                     Total Bank Transfer
//                                 </Typography>
//                                 <Typography variant="h5" fontWeight="bold">
//                                     ₹{totalPrepaid}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>

//                 <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: "auto" }}>
//                     <Table sx={{ minWidth: 900 }} aria-label="booking table">
//                         <TableHead>
//                             {/* Date Header */}
//                             <TableRow sx={{ backgroundColor: "#1E88E5" }}>
//                                 <TableCell
//                                     align="center"
//                                     rowSpan={3}
//                                     sx={{
//                                         fontWeight: "bold",
//                                         color: "white",
//                                         border: "1px solid #ddd",
//                                         position: "sticky",
//                                         left: 0,
//                                         zIndex: 2,
//                                         backgroundColor: "#1E88E5"
//                                     }}
//                                 >
//                                     Slots
//                                 </TableCell>
//                                 {dates.map((date) => {
//                                     const turfsPerDate = boxDetails.reduce((sum, box) => {
//                                         const turfsForBox = turfs.filter((t) => t.boxId === box.id);
//                                         return sum + turfsForBox.length;
//                                     }, 0);

//                                     return (
//                                         <TableCell
//                                             key={date}
//                                             colSpan={turfsPerDate}
//                                             align="center"
//                                             sx={{
//                                                 fontWeight: "bold",
//                                                 color: "white",
//                                                 border: "1px solid #ddd"
//                                             }}
//                                         >
//                                             {new Date(date).toLocaleDateString("en-GB", {
//                                                 weekday: "long",
//                                                 day: "2-digit",
//                                                 month: "short"
//                                             })}
//                                         </TableCell>
//                                     );
//                                 })}
//                             </TableRow>

//                             {/* Box Name Row */}
//                             <TableRow sx={{ backgroundColor: "#1565C0" }}>
//                                 {dates.map((date) =>
//                                     boxDetails.map((box, boxIndex) => {
//                                         const boxTurfs = turfs.filter((t) => t.boxId === box.id);
//                                         return (
//                                             <TableCell
//                                                 key={`${date}-box-${boxIndex}`}
//                                                 colSpan={boxTurfs.length}
//                                                 align="center"
//                                                 sx={{
//                                                     fontWeight: "bold",
//                                                     color: "white",
//                                                     border: "1px solid #ddd"
//                                                 }}
//                                             >
//                                                 {box.name}
//                                             </TableCell>
//                                         );
//                                     })
//                                 )}
//                             </TableRow>

//                             {/* Turf Row */}
//                             <TableRow sx={{ backgroundColor: "#1976D2" }}>
//                                 {dates.map((date) =>
//                                     boxDetails.map((box) => {
//                                         const boxTurfs = turfs.filter((t) => t.boxId === box.id);                                        
//                                         return boxTurfs.map((turf) => (
//                                             <TableCell
//                                                 key={`${date}-${box._id}-${turf._id}`}
//                                                 align="center"
//                                                 sx={{
//                                                     fontWeight: "normal",
//                                                     fontSize: "13px",
//                                                     color: "#fff",
//                                                     border: "1px solid #ddd"
//                                                 }}
//                                             >
//                                                 {turf.turfname}
//                                             </TableCell>
//                                         ));
//                                     })
//                                 )}
//                             </TableRow>
//                         </TableHead>

//                         {/* Table Body */}
//                         <TableBody>
//                             {allSlots.map((slot, slotIndex) => (
//                                 <TableRow key={slotIndex}>
//                                     <TableCell
//                                         align="center"
//                                         sx={{
//                                             fontWeight: "bold",
//                                             border: "1px solid #ddd",
//                                             position: "sticky",
//                                             left: 0,
//                                             zIndex: 2,
//                                             backgroundColor: "white"
//                                         }}
//                                     >
//                                         {slot} - {allSlots[slotIndex + 1] || ""}
//                                     </TableCell>

//                                     {dates.map((date) =>
//                                         boxDetails.map((box) => {
//                                             const boxTurfs = turfs.filter((t) => t.boxId === box._id);

//                                             return boxTurfs.map((turf) => {
//                                                 const booking = bookingData.find(
//                                                     (b) =>
//                                                         b.date === date &&
//                                                         b.boxName === box.name &&
//                                                         b.turfname === turf.turfname &&
//                                                         b.startTime === slot
//                                                 );

//                                                 if (booking) {
//                                                     const rowSpan = getRowSpan(booking.startTime, booking.endTime, allSlots);
//                                                     const bgColor = booking.paymentMethod === "cash" ? "red" : "green";

//                                                     return (
//                                                         <TableCell
//                                                             key={`${date}-${box._id}-${turf._id}-${slotIndex}`}
//                                                             rowSpan={rowSpan}
//                                                             align="center"
//                                                             sx={{
//                                                                 backgroundColor: bgColor,
//                                                                 color: "white",
//                                                                 fontWeight: "bold",
//                                                                 border: "1px solid #ddd"
//                                                             }}
//                                                         >
//                                                             <p style={{ margin: "0px" }}>{booking.name}</p>
//                                                             <p style={{ margin: "0px" }}>{booking.phone}</p>
//                                                             <p style={{ margin: "0px" }}>{booking.email}</p>
//                                                             <span style={{ fontStyle: "italic" }}>{booking.status}</span>
//                                                             <p style={{ fontStyle: "italic", margin: "0px" }}>
//                                                                 {booking.price ? `Price: ₹${booking.price - 10}` : ""}
//                                                             </p>
//                                                         </TableCell>
//                                                     );
//                                                 }

//                                                 let isPartOfBooking = bookingData.some(
//                                                     (b) =>
//                                                         b.date === date &&
//                                                         b.boxName === box.name &&
//                                                         b.turfname === turf.turfname &&
//                                                         allSlots.indexOf(b.startTime) < slotIndex &&
//                                                         allSlots.indexOf(b.endTime) > slotIndex
//                                                 );

//                                                 return isPartOfBooking ? null : (
//                                                     <TableCell
//                                                         key={`${date}-${box._id}-${turf._id}-${slotIndex}`}
//                                                         sx={{ border: "1px solid #ddd" }}
//                                                     />
//                                                 );
//                                             });
//                                         })
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>

//                     </Table>
//                 </TableContainer>
//             </div>
//         </>
//     );
// };

// export default SheetViewer;
