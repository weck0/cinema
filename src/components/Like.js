import { useReducer, useState } from "react";
import "./Like.scss";

const Like = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);
  const [active, setActive] = useState("");

  // Action executed when like button is cliked
  const onLike = () => {
    setLikes(likes + 1);
    if (active === "dislike") {
      setDislikes(dislikes - 1);
    }
    setActive("like");
  };

  // Action executed when dislike button is cliked
  const onDislike = () => {
    setDislikes(dislikes + 1);
    if (active === "like") {
      setLikes(likes - 1);
    }
    setActive("dislike");
  };

  return (
    <li className="Like">
      <button
        style={{
          color: active === "like" ? "green" : "black",
          marginRight: "10px",
        }}
        onClick={() => onLike()}
      >
        <strong>Likes</strong>
        &nbsp;|&nbsp;
        {likes}
      </button>
      <button
        style={{ color: active === "dislike" ? "red" : "black" }}
        onClick={() => onDislike()}
      >
        <strong>Dislikes</strong>
        &nbsp;|&nbsp;
        {dislikes}
      </button>
    </li>
  );
};

export default Like;
