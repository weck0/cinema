import Button from "@mui/material/Button";
import BorderLinearProgress from "@mui/material/LinearProgress";
import "./Card.scss";
import Like from "./Like";

const getPourcent = (like, dislike) => {
  return (like / (like + dislike)) * 100;
};

const Card = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id, props.category);
  };

  return (
    <div className="movie-card">
      <img src={`./movies_images/${props.img}`} alt={props.title} />
      <li>
        <strong>{props.title}</strong>
      </li>
      <li>{props.category}</li>
      <li className="progress-bar">
        <BorderLinearProgress
          variant="determinate"
          value={getPourcent(props.likes, props.dislikes)}
        />
      </li>

      <Like likes={props.likes} dislikes={props.dislikes} />

      <li className="button" onClick={deleteHandler}>
        <Button variant="contained">Delete</Button>
      </li>
    </div>
  );
};

export default Card;
