import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscribeButton({ userProfile }) {
  const { subscriptions, addSubscription, deleteSubscription, getSubscriptions } = useContext(SubscriptionContext)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getSubscriptions();
    // eslint-disable-next-line 
  }, []);

  function subscribe(e) {
    e.preventDefault();
    const newSubscription = {
      ProviderUserProfileId: userProfile.id,
    };
    addSubscription(newSubscription);
  }
  function unsubscribe(subscriptionId) {
    deleteSubscription(subscriptionId);
  }
  subscriptions.map((subscription) => {
    if (
      subscription.providerUserProfileId === userProfile.id
    ) {
      return (
        <>
          <Button onClick={unsubscribe(subscription.id)}>UNSUBSCRIBE</Button>
        </>
      );
    }
  });
  return (
    <>
    
      {/* {!userProfile.id === currentUser.id && ( */}
        <Button onClick={subscribe}>Subscribe to Author</Button>
      {/* )} */}
    </>
  );
}