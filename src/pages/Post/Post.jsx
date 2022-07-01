import styles from "./Post.module.css";

// Hooks
import { useParams } from "react-router-dom";

export const Post = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Post</h1>
      <p>{id}</p>
    </div>
  )
}