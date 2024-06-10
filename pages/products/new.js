import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct(){
  return (
    <Layout>
      <h1>Novo Produto</h1>
      <ProductForm />
    </Layout>
  );  
}