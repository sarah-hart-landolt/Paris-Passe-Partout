import React from "react";
import parispassepartout6 from "./parispassepartout6.png";
import { MDBContainer, MDBBox } from "mdbreact";
import "../index.css";

export default function LoginRegister() {
  return (
    <>
      <MDBContainer>
        <MDBBox>
          <>
            <main>
              <header className="masthead bg text-center">
                <div className="container d-flex align-items-center flex-column">
                  <img src={parispassepartout6} className="loginImage" alt="paris key" />
                  <div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-line"></div>
                  </div>
                </div>
              </header>
            </main>
          </>
        </MDBBox>{" "}
      </MDBContainer>
    </>
  );
}
