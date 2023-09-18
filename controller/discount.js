const con = require("./config");

exports.getDiscount = (req, res, next) => {
  // const price = req.body.price;
  const discountType = req.body.discount_type;
  const amount = req.body.amount;
  const percent_category = req.body.percent_category;
  const point_every = req.body.point_every;
  const item_cart = req.body.item_cart;
  const price = findPrice(item_cart);


  // console.log(item_cart.length);

  const totalDiscount = callDiscount(
    price,
    discountType,
    amount,
    percent_category,
    point_every,
    item_cart
  );
  let totalPrice = price - totalDiscount;

  res.status(201).json({
    price: price,
    item_cart: item_cart,
    type: discountType,
    amount: amount,
    percent_category: percent_category,
    every: point_every,
    totalDiscount: totalDiscount,
    totalPrice: totalPrice,
  });
};

function callDiscount(price, type, amount, percent_category, point_every, item_cart) {
  let totalDiscount = 0;
  let discount;

// amount[0] = coupon, amount[1] = on top, amount[2] = seasonal

  for (let i = 0; i < type.length; i++) {
    switch (type[i]) {
      case 1:
        // console.log("case1");
        discount = fixedAmount(amount[0]);
        console.log("case 1 discount: "+discount);
        break;
      case 2:
        // console.log("case2");
        discount = percentDiscount(amount[0], price);
        console.log("case 2 discount: "+discount);
        break;
      case 3:
        // console.log("case3");
        discount = percentByCategory(percent_category, amount[1], price, item_cart);
        console.log("case 3 discount: "+discount);
        break;
      case 4:
        // console.log("case4");
        discount = discountByPoint(amount[1]);
        console.log("case 4 discount: "+discount);
        break;
      case 5:
        // console.log("case5");
        discount = campaigns(point_every, amount[2], price);
        console.log("case 5 discount: "+discount);
        break;
      default:
        discount = 0;
    }
    totalDiscount += discount;
  }
  return totalDiscount;
}

function fixedAmount(amount) {
  const discountFixed = amount;
  return discountFixed;
}

function percentDiscount(amount, price) {
  let discountPercentage = (price / 100) * amount;
  return discountPercentage;
}

function percentByCategory(percent_category, amount, price, cart) {
  let categoryPrice = 0;
  for(let i=0; i<cart.length; i++){
    let current = cart[i];
    if(current.category == percent_category){
      categoryPrice += current.price;
    }
  }
  discountCategory = percentDiscount(amount, categoryPrice);
  return discountCategory;
}

function discountByPoint(amount) {
  const discountByPoint = amount;
  return discountByPoint;
}

function campaigns(every, amount, price) {
  let round = Math.floor(price / every);
  let campaignsDiscount = round * amount;
  return campaignsDiscount;
}

exports.getItems = (req, res, next) => {
  const command = "SELECT * FROM item";
  con.query(command, function (err, data, fields) {
    if (err) return next(console.error());
    res.status(200).json({
      length: data?.length,
      item: data,
    });
  });
};

function findPrice(cart){
  let totalPrice = 0;
  for(let i=0; i<cart.length; i++){
    totalPrice += cart[i].price;
  }
  return totalPrice;
}

