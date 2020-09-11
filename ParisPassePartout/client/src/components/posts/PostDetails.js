import React, { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Pin.css";
import moment from "moment";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import {
  Button,
  CardBody,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Form,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CommentForm } from "../comments/CommentForm";
import { Comment } from "../comments/Comment";
import { CategoryContext } from "../../providers/CategoryProvider";


const PostDetails = () => {
  const { getPostById, deletePost } = useContext(PostContext);
  const [editModal, setEditModal] = useState(false);
  const [captionText, setCaptionText] = useState();
  const [onePost, setOnePost] = useState();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const { editPost } = useContext(PostContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const category = useRef();
  const hasTried= useRef();
  const toggleEditModal = () => setEditModal(!editModal);


  useEffect(() => {
    getCategories();
  }, []);


  const history = useHistory();
  const toggleModal = () => setModal(!modal);
  const togglePostModal = () => setPostModal(!postModal);
  //   const { reactions, getReactions } = useContext(ReactionContext);
  //   const {
  //     addPostReaction,
  //     getPRByPostId,
  //     editPR,
  //     deletePostReaction,
  //   } = useContext(PostReactionContext);
  //   const [postReactions, setPostReactions] = useState([]);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  //   useEffect(() => {
  //     getReactions();
  //   }, []);

  useEffect(() => {
    getPostById(id).then(setOnePost);
    // eslint-disable-next-line
  }, []);

  const postId = parseInt(id);
  //   useEffect(() => {
  //     getPRByPostId(postId).then(setPostReactions);
  //     // eslint-disable-next-line
  //   }, []);

  const refreshPost = () => {
    getPostById(id).then(setOnePost);
  };

  //   const refreshPRs = () => {
  //     getPRByPostId(postId).then(setPostReactions);
  //   };

  if (!onePost) {
    return null;
  }

  //edit and delete post
  const editAndDelete = () => {
    return (
      <>
        <ListGroup horizontal>
          <i
            className="fa fa-pencil-square-o icon--comment"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              toggleEditModal();
            }}
          ></i>
          <br></br>
          <i
            className="fa fa-trash-o icon--comment"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.confirm("Are you sure you wish to delete this post?") &&
              deletePost(onePost.id).then(history.push("/posts"))
            }
          ></i>
        </ListGroup>
      </>
    );
  };

  const formattedDate = moment(onePost.publishDateTime).format("MM/DD/YYYY");
  const sortedComments = onePost.commentList.sort(
    (a, b) =>
      new Date(b.createDateTime).getTime() -
      new Date(a.createDateTime).getTime()
  );
  //   const postReactionObject = postReactions
  //     .filter((pr) => pr.userProfileId === userProfile.id)
  //     .find((pr) => pr.userProfileId === userProfile.id);

  //   const emojiCounter = () => {
  //     const emojiArray = postReactions.map((pr) => pr.reaction.emoji.name);
  //     let emojiObject = {};
  //     let emojiCountArray = [];
  //     emojiArray.forEach((emoji) => {
  //       if (emojiObject.hasOwnProperty(emoji)) {
  //         emojiObject[emoji] = emojiObject[emoji] + 1;
  //       } else {
  //         emojiObject[emoji] = 1;
  //       }
  //     });
  //     for (const [key, value] of Object.entries(emojiObject)) {
  //       emojiCountArray.push([key, value]);
  //     }
  //     return emojiCountArray;
  //   };

  const submitEditForm = (e) => {
    const categoryId = parseInt(category.current.value);
    const hasTriedInt = parseInt(hasTried.current.value);

    e.preventDefault();
    editPost({
    id: onePost.id,
    name: onePost.name,
    content: captionText? captionText : onePost.content,
    imageLocation: onePost.imageLocation,
    categoryId: categoryId? categoryId: onePost.categoryId,
    longitude: onePost.longitude,
    latitude: onePost.latitude,
    address: onePost.address, 
    status: onePost.status,
    zipCode: onePost.zipCode,
    phone: onePost.phone,
    website: onePost.website,
    hasTried: hasTriedInt,


    }).then(toggleEditModal).then(refreshPost);
  };

  return (
    <>
      <MDBContainer className="pageContainer">
        <h1>{onePost.name}</h1>
        <MDBRow>
          <MDBCol>
            <Card className="pinCard">
              <CardImg
                className="googlePhoto"
                top
                width="100%"
                src={onePost.imageLocation}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  <h4>{onePost.name}</h4>
                </CardTitle>
                <CardSubtitle>
                  Author: {onePost.userProfile.displayName}
                </CardSubtitle>

                <CardText>Category: {onePost.category.name}</CardText>
                <div>{onePost.zipCode}</div>
                <div>{onePost.address}</div>
                <div>{onePost.content}</div>
              </CardBody>
            </Card>
          </MDBCol>
          <MDBCol>
              <div className="authorContainer">
                Written by:{" "}
                <span className="author">
                  {onePost.userProfile.displayName}
                </span>
              </div>
                      <div className="publishedDate">
              Published: {formattedDate}
              {editAndDelete()}
            </div>
             
            {/*      
          <div className="allReactionsContainer">
            <div className="reactionContainer">
              {reactions.map((react) => (
                <div
                  className="reactionBubble"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      postReactionObject &&
                      postReactionObject.reactionId === react.id
                    ) {
                      deletePostReaction(postReactionObject.id);
                      refreshPRs();
                    } else if (postReactionObject) {
                      editPR({
                        id: postReactionObject.id,
                        postId: onePost.id,
                        reactionId: react.id,
                        userProfileId: userProfile.id,
                      });
                      refreshPRs();
                    } else {
                      addPostReaction({
                        postId: onePost.id,
                        reactionId: react.id,
                        userProfileId: userProfile.id,
                      });
                      refreshPRs();
                    }
                    refreshPRs();
                  }}
                >
                  {react.emoji.name}
                </div>
              ))}
            </div>
            <div
              className="postReactionContainer"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              {emojiCounter().map((subArray) => (
                <Badge pill>
                  {subArray[0]}
                  {subArray[1]}
                </Badge>
              ))}
            </div>
            {isShown &&
              postReactions.map((pr) => (
                <div>
                  <ListGroup className="hoverList">
                    <ListGroupItem className="justify-content-between">
                      {pr.reaction.emoji.name}'d by{" "}
                      {pr.userProfileId === userProfile.id
                        ? `You`
                        : pr.userProfile.displayName}{" "}
                    </ListGroupItem>
                  </ListGroup>
                </div>
              ))}
          </div> */}

            <Button
              outline
              color="secondary"
              onClick={toggleModal}
              style={{ marginBottom: "50px" }}
            >
              Add Comment
            </Button>
            <Card className="text-left">
              <div className="mt-10">
                <h3 className="postsHeader">Comments</h3>
              </div>
              <CardBody>
                {sortedComments.length ? (
                  sortedComments.map((comment) => (
                    <Comment
                      refreshPost={refreshPost}
                      key={comment.id}
                      comment={comment}
                    />
                  ))
                ) : (
                  <div className="alert alert-secondary mt-1" role="alert">
                    {" "}
                    No comments were found.
                  </div>
                )}
                <br />
              </CardBody>
            </Card>

            <Modal
              isOpen={modal}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={toggleModal}
              contentClassName="custom-modal-style-product"
            >
              <ModalHeader toggle={toggleModal}>
                Add a comment to "{onePost.name}"
              </ModalHeader>
              <ModalBody>
                <CommentForm
                  refreshPost={refreshPost}
                  postId={id}
                  toggle={toggleModal}
                />
              </ModalBody>
            </Modal>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Modal
            isOpen={editModal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleEditModal}
            contentClassName="custom-modal-style"
          >
            <ModalHeader toggle={toggleEditModal}>
              {onePost.name}
          </ModalHeader>
            <ModalBody>
            <CardImg top width="100%" src={onePost.imageLocation} alt="Card image cap" />
            <Form onSubmit={submitEditForm}>
                  <fieldset>
                    <FormGroup>
                      <Label for="captionText">Edit caption</Label>
                      <Input
                        required
                        id="captionText"
                        type="textarea"
                        defaultValue={onePost.content}
                        onChange={(e) => setCaptionText(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <fieldset className="input--addCategory">
                        <select
                          defaultValue={onePost.categoryId}
                          ref={category}
                          name="category"
                          id="category"
                          className="form-control"
                          required
                        >
                          <option value="0">Select a Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </FormGroup>
                    <FormGroup>
                      <fieldset className="input--addCategory">
                        <select
                          defaultValue={onePost.hasTried=== 0 ? 0 : 1}
                          ref={hasTried}
                          name="category"
                          id="category"
                          className="form-control"
                        >
                          <option value="0">Have you already tried this place?</option>
                          <option value={1}>
                            yes{" "}
                          </option>
                          <option value={0}>
                            no{" "}
                          </option>
                          ))
                        </select>
                      </fieldset>
                    </FormGroup>
                    <FormGroup>
                      <Button>Save Edit</Button>
                    </FormGroup>
                  </fieldset>
                </Form>
            </ModalBody>
          </Modal>
    </>
  );
};

export default PostDetails;
