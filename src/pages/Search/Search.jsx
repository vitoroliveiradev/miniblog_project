import styles from "./Search.module.css";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

// Components
import { PostDetail } from "../../components/PostDetail";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  console.log(posts);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div className={styles.noposts}>
        {posts && posts.length === 0 && (
          <div>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map(post => (
          <PostDetail 
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
} 