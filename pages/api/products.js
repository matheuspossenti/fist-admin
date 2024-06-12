import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res){
  const { method } = req;
  await mongooseConnect();

  if(method === 'GET'){
    if(req.query?.id){
      res.json(await Product.findOne({_id: req.query.id}));
    }else{
      res.json(await Product.find());
    }
  }

  if(method === 'POST'){
    const {title, images, description, price} = req.body;
    const productDoc = await Product.create({
      title,
      images,
      description,
      price
    });
    res.json(productDoc);
  }

  if(method === 'PUT'){
    const {title, images, description, price, _id} = req.body;
    await Product.updateOne({_id}, {title, images, description, price});
    res.json({message: 'Produto atualizado com sucesso'});
  }

  if(method === 'DELETE'){
    if(req.query?.id){
      await Product.deleteOne({_id: req.query.id});
      res.json({message: 'Produto deletado com sucesso'});
    }
  }
}