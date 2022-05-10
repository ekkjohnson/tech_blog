const assist = document.getElementById("post-title");

const postId = assist.dataset.post;

const addNewComment = async () => {
  event.preventDefault();
  const comment = document.querySelector("#comment-content-input").value.trim();
  if (comment == "") {
    return alert("You must enter content for your new comment!");
  } else {
    const newComment = await fetch(`/api/post/${postId}`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: { "Content-Type": "application/json" },
    });

    return document.location.reload();
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", addNewComment);