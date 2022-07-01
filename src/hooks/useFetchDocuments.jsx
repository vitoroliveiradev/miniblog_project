import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  where 
} from "firebase/firestore";


export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {

    const loadData = async () => {
      if(cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        
        let q;

        // dashboard
        
        // Pegando os dados
        // Fazendo a Busca.
        if(search) {
          q = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"));
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        // Mapear dados, se alterar um dado, ele vai marcar e ver que tem diferença entre os dados. Vai trazer o dado atualizado. ID vem separado dos dados.
        await onSnapshot(q, (querySnapshot) => {
          // Pegando e setando os documentos do banco.
          setDocuments(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          )

        })
        setLoading(false);

      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, documents, search, uid, cancelled])

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    documents,
    loading, 
    error
  }

}