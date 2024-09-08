import React, { useEffect, useImperativeHandle, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooking = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const scheduleId = localStorage.getItem("scheduleId");
    console.log("scheduleId : ", scheduleId);

    // Fetch booked seats from the API
    axios
      .get(`http://localhost:5001/api/seats/allseats/${scheduleId}`)
      .then((response) => {
        // Assuming response.data is an array of documents, each with a seat_id array
        const bookedSeats = response.data.flatMap((booking) => booking.seat_id);
        console.log("Booked Seats:", bookedSeats); // Check if this logs the correct booked seat IDs

        const generatedSeats = Array.from({ length: 59 }, (_, index) => ({
          id: index + 1,
          booked: bookedSeats.includes(index + 1), // Check if seat is booked
        }));

        setSeats(generatedSeats);
      })
      .catch((error) => {
        console.error("Error fetching booked seats:", error);
      });
  }, []);

  const handleSeatChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedSeats((prev) => [...prev, id]);
      setTotalAmount((prev) => prev + 1200);
    } else {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== id));
      setTotalAmount((prev) => prev - 1200);
    }
  };

  useImperativeHandle(ref, () => ({
    getSelectedSeats: () => selectedSeats,
    getSeatArray: () => seats.map((seat) => seat.id),
  }));

  const handleBook = () => {
    navigate("/Checkout", { state: { selectedSeats } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <div style={styles.title}>Seat Reservation</div>
          <div style={styles.status}>
            <div style={styles.statusItem}>
              <div style={{ ...styles.seat, backgroundColor: "#BDC8E8" }}></div>{" "}
              Available
            </div>
            <div style={styles.statusItem}>
              <div style={{ ...styles.seat, backgroundColor: "#FF4C4C" }}></div>{" "}
              Booked
            </div>
            <div style={styles.statusItem}>
              <div style={{ ...styles.seat, backgroundColor: "#4CAF50" }}></div>{" "}
              Selected
            </div>
          </div>
          <div style={styles.seatsContainer}>
            {seats.map((seat) => (
              <React.Fragment key={seat.id}>
                <input
                  type="checkbox"
                  name="tickets"
                  id={`seat-${seat.id}`}
                  disabled={seat.booked}
                  onChange={(e) => handleSeatChange(seat.id, e.target.checked)}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor={`seat-${seat.id}`}
                  style={{
                    ...styles.seat,
                    backgroundColor: seat.booked
                      ? "#FF4C4C" // Red for booked
                      : selectedSeats.includes(seat.id)
                      ? "#4CAF50" // Green for selected
                      : "#BDC8E8", // Light blue for available
                    cursor: seat.booked ? "not-allowed" : "pointer",
                  }}
                >
                  {seat.id} {/* Display seat number */}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={styles.footer}>
          <div style={styles.ticketInfo}>
            <span>{selectedSeats.length} Tickets</span>
          </div>
          <div style={styles.totalAmount}>Rs {totalAmount}</div>
          <button style={styles.button} type="button" onClick={handleBook}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
});

// Updated inline CSS styles according to the provided color palette
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F8F9FC", // Light background color
  },
  box: {
    background: "#ffffff", // White background for the box
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "600px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#11134F", // Dark blue color for the title
    marginBottom: "20px",
  },
  status: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  statusItem: {
    width: "33%",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#11134F", // Dark blue color for the status text
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  seatsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: "5px",
    marginBottom: "20px",
  },
  seat: {
    display: "block",
    padding: "10px",
    borderRadius: "5px",
    transition: "background 0.3s ease",
    textAlign: "center",
    lineHeight: "30px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#11134F", // Dark blue color for the footer text
  },
  ticketInfo: {
    display: "flex",
    alignItems: "center",
  },
  totalAmount: {
    color: "#FF5722", // Orange color for the total amount
  },
  button: {
    backgroundColor: "#FF5722", // Orange background for the button
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default CreateBooking;
