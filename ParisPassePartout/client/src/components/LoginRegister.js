import React from "react";
import parispassepartout2 from "./parispassepartout2.png";
import {MDBContainer, MDBRow} from "mdbreact";


export default function LoginRegister() {

  return (
    <>
    <MDBContainer>
      <MDBRow>
        <>
      <main>
        <header className="masthead bg text-white text-center">
          <div className="container d-flex align-items-center flex-column">
            <img src={parispassepartout2} alt=""/>
            <p></p>
            <div className="divider-custom divider-light">
              <div className="divider-custom-line"></div>
              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
              <div className="divider-custom-line"></div>
            </div>
          </div>
        </header>
      </main>
      </>
      </MDBRow>
      </MDBContainer>
    </>
  );
};