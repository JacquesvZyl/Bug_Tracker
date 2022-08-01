import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button/Button.component";
import styles from "./Comments.module.scss";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../Firebase/firebase";
import { returnSpecificUser, toastStyleError } from "../../utils/Global";
import ProfilePicture from "../ProfilePicture/ProfilePicture.component";

function Comments() {
  const { id: projectId } = useParams();
  const ticketData = useSelector((state) => state.projects.selectedTicket);
  const user = useSelector((state) => state.user.user);
  const commentRef = useRef(null);
  const [comments, setComments] = useState(null);
  const allUsers = useSelector((state) => state.allUsers.allUsers);

  useEffect(() => {
    async function setCommentsToState() {
      await getComments(projectId, ticketData.id, setComments);
      console.log(comments);
    }

    setCommentsToState();
  }, [ticketData.id, projectId]);

  async function addComment(e) {
    e.preventDefault();
    if (user?.role?.readOnly) {
      toast(`⚠ Insufficient Permissions`, {
        duration: 4000,
        style: toastStyleError,
      });
      return;
    }
    const date = new Date();
    try {
      if (commentRef.current.value.trim().length === 0)
        throw new Error("Field cannot be blank");

      await createComment(projectId, ticketData.id, {
        authorId: user.uid,
        date: date.toISOString(),
        comment: commentRef.current.value,
      });
      commentRef.current.value = "";
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
  }

  async function removeComment(e) {
    const commentId = e.target.dataset.commentid;
    console.log(commentId);
    try {
      await deleteComment(projectId, ticketData.id, commentId);
    } catch (error) {
      toast(`⚠ ${error.message}`, {
        duration: 6000,
        style: toastStyleError,
      });
    }
  }

  const sortedComments = comments?.slice().sort((a, b) => {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  });
  console.log(sortedComments);
  return (
    <div className={styles.comments__wrapper}>
      <div className={styles.comments__header}>
        <h3>Comments</h3>
      </div>
      <div className={styles.comments}>
        {sortedComments?.map((comment) => {
          const returnedUser = returnSpecificUser(allUsers, comment.authorId);
          return (
            <div className={styles.comment} key={comment.id}>
              <div className={styles.comment__header}>
                <div className={styles.profile__image}>
                  <ProfilePicture profileImage={returnedUser?.profilePicture} />
                </div>
                <p className={styles.author}>
                  {returnedUser?.fullName} -{" "}
                  <span>{new Date(comment.date).toLocaleString()}</span>
                </p>
                {user.uid === comment.authorId || user.role.admin === true ? (
                  <span
                    className={styles.delete}
                    data-commentid={comment.id}
                    onClick={removeComment}
                  >
                    &#10006;
                  </span>
                ) : (
                  ""
                )}
              </div>

              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>

      <form className={styles.comments__input} onSubmit={addComment}>
        <input
          type="text"
          ref={commentRef}
          placeholder={ticketData.status === "resolved" ? "" : "Add comment"}
          disabled={ticketData.status === "resolved"}
        />
        <Button disabled={ticketData.status === "resolved"}>Comment</Button>
      </form>
    </div>
  );
}

export default Comments;
