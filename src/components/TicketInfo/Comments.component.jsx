import React from "react";
import Button from "../ui/button/Button.component";
import styles from "./Comments.module.scss";

function Comments({ data }) {
  return (
    <div className={styles.comments__wrapper}>
      <div className={styles.comments__header}>
        <h3>Comments</h3>
      </div>
      {data.comments.map((comment) => {
        return (
          <div className={styles.comment}>
            <p className={styles.author}>
              {comment.author} - <span>{comment.date}</span>
            </p>

            <p>{comment.comment}</p>
          </div>
        );
      })}

      <form className={styles.comments__input}>
        <input type="text" placeholder="Add comment" />
        <Button>Comment</Button>
      </form>
    </div>
  );
}

export default Comments;
