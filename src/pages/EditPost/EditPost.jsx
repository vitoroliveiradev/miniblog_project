import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";  
import { useFetchDocument } from "../../hooks/useFetchDocument";

export const EditPost = () => {
  // Pegando o id na url
  const { id } = useParams();
  // Pegando o documento no firebase pelo id.
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();

  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      // Transformando os itens do array em texto.
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);

    }
  },[post])

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
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
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
            <>
              <p className={styles.previewTitle}>
                Preview da imagem atual
              </p>
              <img 
                className={styles.imagePreview} 
                src={post.image} 
                alt={post.title} 
              />
            </>
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
                Editar
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
        </>
      )}
    </div>
  )
}