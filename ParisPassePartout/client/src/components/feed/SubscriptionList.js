import React, { useContext, useEffect } from "react"
import OtherUsersPost from "../posts/OtherUsersPost";
import {CardColumns, Button} from "reactstrap"
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscriptionList () {
    const { subscriptions, getSubscriptions} = useContext(SubscriptionContext);


    useEffect(() => {
        getSubscriptions();
        // eslint-disable-next-line 
      }, []);



    return (
        <>
            <section>
                <CardColumns>
                    {
                        subscriptions.map(subscription => {
                            return <OtherUsersPost key={subscription.id} post={subscription} />
                        })
                    }
                </CardColumns>
            </section>
        </>
    )
}