const express = require("express");
const router = express.Router();
const Order = require("../../Models/order");
const User = require("../../Models/user");
const Ingredient = require("../../Models/ingredient");
const Authmiddelware = require("../../middelwares/Authmiddelware");
const authAdmin = require("../../middelwares/authAdmin");

router.post("/newOrder", Authmiddelware, async (req, res) => {
  try {
    const { commandes, user, date, heure, tel, address, livraison, total } =
      req.body;
    const cart = {};
    cart.user = req.user.id;
    cart.commandes = commandes;
    cart.date = date;
    cart.heure = heure;
    cart.tel = tel;
    cart.address = address;
    cart.livraison = livraison;
    cart.total = total;
    const order = new Order(cart);
    await order.save();
    await User.findByIdAndUpdate({ _id: order. user}, {$push: {commandes: order._id}})


    res.status(200).json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

/* router.get ("/:id", Authmiddelware, async (req,res)=>{
try{
const bol= await Bol.findOne({_id: req.params.id})
console.log(req.params.id)
if (!bol) {
return res.status(404).json({ errors: [{ msg: "Bol not found" }] });}
res.status(200).json(bol)
}catch (err) {
console.log(err.message);
res.status(500).send("server error");
}
}) */

router.get(
  "/",
  authAdmin,  async (req, res) => {
    try {
      const orders = await Order.find({}).populate("user")
        

      res.status(200).json(orders);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

router.put("/:id", authAdmin, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = req.body;
     await Order.findByIdAndUpdate(filter, {$set:{delivred: req.body}});
    res.status(200).json('updated');
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "server error" });
  }
});


router.delete('/:id', authAdmin, async(req,res)=>{
try{
  const commande= await Order.findOne({ _id: req.params.id });

 if (!commande) { 
   return res.status(400).json({ errors: [{ msg: "order not found" }] })}
 commande.remove()
res.status(200).json({message:"order removed"});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
})
module.exports = router;
