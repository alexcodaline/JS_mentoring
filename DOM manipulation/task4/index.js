const addComment = document.getElementById("formAddComment");
const commentsContainer = document.getElementById("comments-container");

addComment.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCommentText = document.getElementById("newCommentInput").value;
  //-------------------- add comment
  if (newCommentText !== "") {
    const newCommentElement = document.createElement("div");
    newCommentElement.classList.add("comment");

    // ------------------comment container
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");

    // Create wrapper for comment text
    const commentTextWrapper = document.createElement("div");
    commentTextWrapper.classList.add("comment-text");
    commentTextWrapper.textContent = newCommentText;
    commentContent.appendChild(commentTextWrapper);

    // 
    const timesData = document.createElement("div");
    timesData.classList.add("comment-date");
    timesData.textContent = dateTime();
    commentContent.appendChild(timesData);

    newCommentElement.appendChild(commentContent);

    const commentControls = document.createElement("div");
    commentControls.classList.add("comment-controls");

    // -------------------Button remove comment
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", () => {
      commentsContainer.removeChild(newCommentElement);
    });

    // -------------------reply button
    const replyButton = document.createElement("button");
    replyButton.textContent = "Reply";
    replyButton.addEventListener("click", () => {
      const existingForm = newCommentElement.querySelector(".reply-form");
      if (existingForm) {
        existingForm.remove();
        return;
      }

      // -------------------------reply form
      const replyForm = document.createElement("form");
      replyForm.classList.add("reply-form");

      const replyInput = document.createElement("input");
      replyInput.type = "text";
      replyInput.placeholder = "your reply...";

      const submitReply = document.createElement("button");
      submitReply.type = "submit";
      submitReply.textContent = "reply";

      replyForm.appendChild(replyInput);
      replyForm.appendChild(submitReply);

      // -----------------------submit reply coment
      replyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const replyText = replyInput.value;
        if (replyText !== "") {
          const replyElement = document.createElement("div");
          replyElement.classList.add("reply");
          // styles for reply
          const replyTextWrapper = document.createElement("div");
          replyTextWrapper.classList.add("reply-text");
          replyTextWrapper.textContent = replyText;
          replyElement.appendChild(replyTextWrapper);
          // ----------------date time reply
          const replyTimesData = document.createElement("div");
          replyTimesData.classList.add("comment-date");
          replyTimesData.textContent = dateTime();
          replyElement.appendChild(replyTimesData);

          //----------------------- delete button reply
          const deleteReplyBtn = document.createElement("button");
          deleteReplyBtn.textContent = "Delete";
          deleteReplyBtn.addEventListener("click", () => {
            replyElement.remove();
          });
          replyElement.appendChild(deleteReplyBtn);

          //------------------- add reply to container reply
          if (!newCommentElement.querySelector(".replies")) {
            const repliesContainer = document.createElement("div");
            repliesContainer.classList.add("replies");
            newCommentElement.appendChild(repliesContainer);
          }

          newCommentElement.querySelector(".replies").appendChild(replyElement);
          replyForm.remove();
        } else {
          alert("enter a reply");
        }
      });

      newCommentElement.appendChild(replyForm);
    });

    commentControls.append(replyButton, removeButton);
    newCommentElement.appendChild(commentControls);
    commentsContainer.appendChild(newCommentElement);
    document.getElementById("newCommentInput").value = "";
  } else {
    alert("Enter your comment");
  }
  // --------------------date comment
  function dateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
  }
});
