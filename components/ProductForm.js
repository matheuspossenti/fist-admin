import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  images,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts === true) {
    router.push("/products");
  }

  async function uploadImages(ev){
    const files = ev.target?.files;
    if(files?.length > 0){
      const data = new FormData();
      for(const file of files){
        data.append("file", file)
      }
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data
      })
      console.log(res);
    }
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
      <label>Fotos</label>
      <div className="mb-2">
        <label className="w-24 h-24 border flex flex-col items-center justify-center text-center rounded-lg cursor-pointer text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>
            Upload
          </div>
          <input type="file" onChange={uploadImages} className="hidden"/>
        </label>
        {!images?.length && <p>Nenhuma imagem cadastrada</p>}
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
