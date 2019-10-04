const createOne = Model => async (req, res, next) => {
  try {
    let doc = await new Model(req.body).save();
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

const updateOne = Model => async (req, res, next) => {
  const toUpdate = req.body;
  const id = req.body.id;
  try {
    let doc = await Model.updateOne(id, toUpdate);
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

const deleteOne = Model => async (req, res, next) => {
  let id = req.params.imageId;
  try {
    let doc = await Model.findByIdAndDelete(id);
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

const getOne = Model => async (req, res, next) => {
  // const id = req.body.imageId;
  const id = req.params.imageId;
  try {
    let doc = await Model.findById(id);
    return res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

const getAll = Model => async (req, res, next) => {
  try {
    let docs = await Model.find({});
    res.json(docs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getOne,
  getAll
};
