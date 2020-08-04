import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { CardColumns } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Pin.css";


const PostList = ({refresh}) => {
  const { cuPosts, getUserPosts} = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getUserPosts();
  }, []);

  const refreshPosts= () => {
    getUserPosts();
  };

  return (
    <>
      <section>
        <CardColumns>
          <div>
            {cuPosts.filter(p=>true).map((post) => {
              return <Post post={post} rp={refreshPosts} refresh={refresh}/>;
            })}
          </div>
        </CardColumns>
      </section>
    </>
  );
};

export default PostList;
