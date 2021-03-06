import React, { useContext, useEffect, useState } from "react";
import OtherUsersPost from "../posts/OtherUsersPost";
import { CardColumns, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider"; 
import {MDBContainer, MDBRow} from "mdbreact";
import classnames from "classnames";
import { CollectionContext } from "../../providers/CollectionProvider";
import OtherUsersCollectionsList from "../collections/OtherUsersCollectionList";


export default function SubscriptionList() {
  const { subscriptions, getSubscriptions } = useContext(SubscriptionContext);
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

  const {collections, getCollections} = useContext(CollectionContext)
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const filteredCollections = collections.filter(collection=>collection.userProfileId!== currentUser.id)

  useEffect(() => {
    getSubscriptions();
    getCollections();
  }, []);

  return (
    <>
    
      <MDBContainer className="pageContainer">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
             Pins
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Collections
          </NavLink>
        </NavItem>
        </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
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
        </TabPane>
        <TabPane tabId="2">
        </TabPane>
        <TabPane tabId="2">
            <OtherUsersCollectionsList collections={filteredCollections} />
        </TabPane>
      </TabContent>
      
      </MDBContainer>
    </>
  );
}
