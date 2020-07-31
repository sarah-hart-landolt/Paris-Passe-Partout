import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { CardColumns } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Pin.css";

const PostList = () => {
  const { cuPosts, getUserPosts} = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getUserPosts();
    // eslint-disable-next-line
  }, []);

  const refreshPosts= () => {
    getUserPosts();
  };

  return (
    <>
      <section>
        <CardColumns>
          <div>
            {cuPosts.map((post) => {
              return <Post post={post} rp={refreshPosts}/>;
            })}
          </div>
        </CardColumns>
      </section>
    </>
  );
};

export default PostList;
