import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, category, images, description, price, properties } =
      req.body;
    const productDoc = await Product.create({
      title,
      category: category || null,
      images,
      description,
      price,
      properties,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const {
      title,
      category,
      images,
      description,
      price,
      properties,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      { title, category: category || null, images, description, price, properties }
    );
    res.json({ message: "Produto atualizado com sucesso" });
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json({ message: "Produto deletado com sucesso" });
    }
  }
}
