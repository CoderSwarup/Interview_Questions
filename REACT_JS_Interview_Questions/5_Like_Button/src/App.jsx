import { useState } from "react";
import "./App.css";

function App() {
  const [liked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async () => {
    console.log("click");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      let data = await res.json();
      if (data.message === "Success!") {
        setLiked(!liked);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something Wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Like Button With Loading State</h1>

      <div className="main">
        <button
          className={`${liked ? "likedbutton" : "likebutton"}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          {isLoading ? (
            <img src="/Rolling.svg" alt="" />
          ) : (
            <img src="/heart.png" alt="" />
          )}{" "}
          {liked ? "Liked" : "Like"}
        </button>
        {error && <span>{error}</span>}
      </div>
    </>
  );
}

export default App;
