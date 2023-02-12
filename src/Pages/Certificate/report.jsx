import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const Report = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const pdf = new jsPDF();
    pdf.text("Hello world!", 10, 10);
    const data = pdf.output();
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", {
      to: email,
      from: "test@example.com",
      subject: "PDF Report",
      content: [
        {
          type: "application/pdf",
          value: data.toString("base64"),
        },
      ],
    });
    console.log(response);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <button onClick={handleSubmit}>Send Report</button>
    </div>
  );
};

export default Report;