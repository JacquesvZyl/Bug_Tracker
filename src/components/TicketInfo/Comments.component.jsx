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
import { toastStyleError } from "../../utils/Global";

function Comments() {
  const { id: projectId } = useParams();
  const ticketData = useSelector((state) => state.projects.selectedTicket);
  const user = useSelector((state) => state.user.user);
  const commentRef = useRef(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function setCommentsToState() {
      await getComments(projectId, ticketData.id, setComments);
      console.log(comments);
    }

    setCommentsToState();
  }, [ticketData.id, projectId]);

  async function addComment(e) {
    e.preventDefault();
    const date = new Date();
    try {
      if (commentRef.current.value.trim().length === 0)
        throw new Error("Field cannot be blank");

      await createComment(projectId, ticketData.id, {
        author: user.fullName,
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
          return (
            <div className={styles.comment} key={comment.id}>
              <div className={styles.comment__header}>
                <p className={styles.author}>
                  {comment.author} -{" "}
                  <span>{new Date(comment.date).toLocaleString()}</span>
                </p>
                {user.uid === comment.authorId ? (
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
        <input type="text" ref={commentRef} placeholder="Add comment" />
        <Button>Comment</Button>
      </form>
    </div>
  );
}

export default Comments;
