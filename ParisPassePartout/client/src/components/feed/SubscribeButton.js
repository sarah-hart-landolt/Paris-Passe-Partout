import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscribeButton({ userProfile }) {
  const { userSubscriptions, addSubscription, deleteSubscription, getSubscriptionsByUser } = useContext(SubscriptionContext)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getSubscriptionsByUser();
  }, []);

  const refresh =() => {
    getSubscriptionsByUser()}

  function subscribe(e) {
    e.preventDefault();
    const newSubscription = {
      ProviderUserProfileId: userProfile.id,
    };
    addSubscription(newSubscription).then(refresh);
  }
 const subscription = userSubscriptions?.find(subscription=>(subscription.providerUserProfileId==userProfile.id))
 
  return (
    <>
        {subscription ? 

    <Button onClick={() =>
      window.confirm(
        "Are you sure you wish to unsubscribe?") && deleteSubscription(subscription.id).then(refresh)}>UNSUBSCRIBE</Button> :
    <Button onClick={subscribe}>Subscribe to Author</Button>
}

    
    </>
  );
}