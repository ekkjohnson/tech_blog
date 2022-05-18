const addNewPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#post-title-input").value.trim();
    const content = document.querySelector("#post-content-input").value.trim();
    if (title == "" || content == "") {
      return alert("You must enter a title and content for your new post!");
    } else {
      const newPost = await fetch("/api/dashboard/add", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      return document.location.replace("/api/dashboard");
    }
  };
  
  document.querySelector(".new-post-form").addEventListener("submit", addNewPost);