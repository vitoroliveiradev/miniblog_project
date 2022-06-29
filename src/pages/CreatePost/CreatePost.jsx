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
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setFormError("");

    // Validar URL da imagem.
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // Criar o array de tags.
    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase());

    // Checar todos os valores.
    if(!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    console.log(user);

    // Redirect to home page.
    navigate("/");
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
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}