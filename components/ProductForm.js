import axios from "axios";
import {useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  images,
  description: existingDescription,
  price: existingPrice})
  {

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if(_id){
      //update
      await axios.put("/api/products", {...data, _id});
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts === true) {
    router.push("/products");
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Nome do produto</label>
      <input
        type="text"
        placeholder="Nome do produto"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>
        Fotos

      </label>
      <div className="mb-2">
        {!images?.length && <p>Nenhuma foto para esse produto</p>}
      </div>
      <label>Descrição</label>
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Preço (em R$)</label>
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Salvar
      </button>
    </form>
  );
}
