import {
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./PaymentWidget.css";
import PaymentWidget from "./PaymentWidget.tsx";

const EnclosingPage = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  const [email, setEmail] = useState("johndoe@email.com");
  const [grandTotal, setGrandTotal] = useState(7260.86);
  const [paymentDueNow, setPaymentDueNow] = useState(6903.71);
  const [paymentDueResort, setPaymentDueResort] = useState(357.15);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="bold-change mbot">
        <div className="bold-change info-header" data-testid="typography">
          Enclosing Page{" "}
        </div>

        <div data-testid="Timer" className="month-year timer">
          <svg
            viewBox="0 0 31.7 31.7"
            width="1em"
            height="1em"
            focusable="false"
          >
            <path d="M15.8,0C7.1,0,0,7.1,0,15.8c0,8.7,7.1,15.8,15.8,15.8c8.7,0,15.8-7.1,15.8-15.8C31.7,7.1,24.6,0,15.8,0z M15.8,30C8,30,1.7,23.7,1.7,15.8C1.7,8,8,1.7,15.8,1.7C23.7,1.7,30,8,30,15.8S23.7,30,15.8,30z"></path>
            <path d="m25.6 19.1c-1.5 4.6-6 7.5-10.9 7s-8.6-4.3-9.1-9.1 2.3-9.3 6.9-10.9l-0.6-1.6c-5.3 1.8-8.6 7.1-8 12.7s5.1 10 10.6 10.6c5.6 0.6 10.8-2.8 12.6-8.1l-1.5-0.6z"></path>

            <path d="m15.9 18.3c1.1 0 2-0.7 2.4-1.7h8.5v-1.6h-8.5c-0.3-0.7-0.8-1.3-1.5-1.5v-9.3h-1.8v9.3c-1.1 0.4-1.8 1.6-1.6 2.8 0.2 1.1 1.3 2 2.5 2zm0-3.3c0.5 0 0.8 0.4 0.8 0.8 0 0.5-0.4 0.8-0.8 0.8-0.5 0-0.8-0.4-0.8-0.8-0.1-0.4 0.3-0.8 0.8-0.8z"></path>
          </svg>

          <div className="">Complete Purchase in 20:10</div>
        </div>

        <div className="">
          <div className="div-splitter">
            <div className="">Grand Total (1 item)</div>
            <div className="">${grandTotal}</div>
          </div>
          <div data-testid="divider" className="divider"></div>
          <div className="div-splitter">
            <div className="">Payment Due Now</div>
            <div className="">${paymentDueNow}</div>
          </div>
          <div className="div-splitter">
            <div className="">Due at Resort</div>
            <div className="">${paymentDueResort}</div>
          </div>
          <div className="divider"></div>
        </div>

        <form className="">
          <div className="info-header">Guest Information</div>
          <div className="mbot">
            <div className=" mbot">
              <TextField
                id="filled-basic"
                label="First Name"
                variant="filled"
                className="bold-change"
                InputLabelProps={{
                  style: {
                    fontWeight: 700,
                    fontSize: "13px",
                    marginTop: "4px",
                  },
                }}
                inputProps={{
                  style: { fontWeight: "bold", width: "640px" },
                }}
              />
            </div>
            <div className="">
              <TextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                className="bold-change"
                InputLabelProps={{
                  style: {
                    fontWeight: 700,
                    fontSize: "13px",
                    marginTop: "4px",
                  },
                }}
                inputProps={{
                  style: { fontWeight: "bold", width: "640px" },
                }}
              />
            </div>
          </div>

          <div className="mbot">
            <TextField
              id="filled-basic"
              label="Phone Number"
              variant="filled"
              className="bold-change"
              InputLabelProps={{
                style: {
                  fontWeight: 700,
                  fontSize: "13px",
                  marginTop: "4px",
                },
              }}
              inputProps={{
                style: { fontWeight: "bold", width: "640px" },
              }}
            />
          </div>
          <div className="mbot">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              className="bold-change"
              InputLabelProps={{
                style: {
                  fontWeight: 700,
                  fontSize: "13px",
                  marginTop: "4px",
                },
              }}
              inputProps={{
                style: { fontWeight: "bold", width: "640px" },
              }}
            />
          </div>
        </form>
        <button className="mbot" onClick={() => setShow(true)}>
          Go To Payment
        </button>
        <div data-testid="divider" className="divider"></div>
      </div>

      {show ? <PaymentWidget /> : <></>}
    </div>
  );
};

export default EnclosingPage;
