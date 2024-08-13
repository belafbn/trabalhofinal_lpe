import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where, QuerySnapshot } from "firebase/firestore";

export const getLivrosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'livros'))
        onSnapshot(q, (QuerySnapshot) => {
            setListaObjetos(QuerySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                usuario: doc.data().usuario,
                uid: doc.data().uid,
                ano_publicacao: doc.data().ano_publicacao,
                autor: doc.data().autor,
                editora: doc.data().editora
            })))
        })
    } catch (error) {
        throw error;
    }
}
export const updateLivrosFirebase = async objeto => {
    try {
        const livroDocRef = doc(db, 'livros', objeto.id)
        await updateDoc(livroDocRef, {
            id: doc.id,
            titulo: doc.data().titulo,
            usuario: doc.data().usuario,
            uid: doc.data().uid,
            ano_publicacao: doc.data().ano_publicacao,
            autor: doc.data().autor,
            editora: doc.data().editora
        })
    } catch (error) {
        throw error;
    }
}


export const getLivrosUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "livros");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                usuario: doc.data().usuario,
                uid: doc.data().uid,
                ano_publicacao: doc.data().ano_publicacao,
                autor: doc.data().autor,
                editora: doc.data().editora
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteLivroFirebase = async objeto => {
    try {
        const livroDocRef = doc(db, 'livros', objeto.id)
        await deleteDoc(livroDocRef);
    } catch (err) {
        throw err;
    }
}

export const addLivroFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'livros'),
            {
                id: doc.id,
                titulo: doc.data().titulo,
                usuario: doc.data().usuario,
                uid: doc.data().uid,
                ano_publicacao: doc.data().ano_publicacao,
                autor: doc.data().autor,
                editora: doc.data().editora
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret
    } catch (err) {
        throw err;
    }
}