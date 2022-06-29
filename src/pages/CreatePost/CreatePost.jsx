import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();

  const handleSubmit = e => {
    e.preventDefault();
    setFormError("");

    // Validar URL da imagem.

    // Criar o array de tags.

    // Checar todos os valores.
    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName
    })

    console.log(user);

    // Redirect to home page.
  }

  return (
    <div className={styles.createPost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input 
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa o seu post"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea 
            name="body"  
            required
            placeholder="Insira o conteúdo do post"
            onChange={e => setBody(e.target.value)}
            value={body}
          >
          </textarea>
        </label>
        <label>
          <span>Tags</span>
          <input 
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgulas."
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </label>
        {!response.loading && (
          <button className="btn">
            Criar Post
          </button>
        )}
        {response.loading && (
          <button className="btn" disabled>
          Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  )
}