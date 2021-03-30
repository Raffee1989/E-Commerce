const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name"],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CatData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["category_id"],
      },
    });

    if (!CatData) {
      res.status(404).json({ message: "No Category with this ID!" });
      return;
    }

    res.status(200).json(CatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const CategData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(CategData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const CategData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!CategData[0]) {
      res.status(404).json({ message: "No Category with this ID!" });
      return;
    }
    res.status(200).json(CategData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete one Category by its `id` value
  try {
    const CatDeta = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CatDeta) {
      res.status(404).json({ message: 'No Category with that id!' });
      return;
    }

    res.status(200).json(CatDeta);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
