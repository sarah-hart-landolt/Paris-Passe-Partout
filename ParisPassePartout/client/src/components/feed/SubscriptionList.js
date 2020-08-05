import React, { useContext, useEffect } from "react";
import OtherUsersPost from "../posts/OtherUsersPost";
import { CardColumns, Button } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider"; 
import {MDBContainer, MDBRow} from "mdbreact";

export default function SubscriptionList() {
  const { subscriptions, getSubscriptions } = useContext(SubscriptionContext);

  useEffect(() => {
    getSubscriptions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MDBContainer className="pageContainer">
        <MDBRow>
          <section>
            <CardColumns>
              {subscriptions.map((subscription) => {
                return (
                  <OtherUsersPost key={subscription.id} post={subscription} />
                );
              })}
            </CardColumns>
          </section>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
