/**
 We created this file so
 that we do not have to re write thr code every time when we perform CRUD.
  Instead, import the required function and use that function
  Insipred from  Frontend Masters Link : https://frontendmasters.com/learn/node-js/
 */

/**
 * @description Creates New entry in database
 * @param {object} Model The model to perform action
 */
const createOne = Model => async (req, res, next) => {
  //creating the model upon requested
  try {
    let doc = await new Model(req.body).save();
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Updates a entry in database
 * @param {object} Model The model to perform action
 */
const updateOne = Model => async (req, res, next) => {
  //updating the model upon requested
  const toUpdate = req.body;
  const id = req.body.id;
  try {
    let doc = await Model.updateOne(id, toUpdate);
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Deletes a entry in database
 * @param {object} Model The model to perform action
 */
const deleteOne = Model => async (req, res, next) => {
  //deleting the model upon requested
  let id = req.params.id;
  try {
    let doc = await Model.findByIdAndDelete(id);
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Returns a entry in database
 * @param {object} Model The model to perform action
 */
const getOne = Model => async (req, res, next) => {
  //retrieving the model upon requested
  const id = req.params.id;
  try {
    let doc = await Model.findById(id);
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Returns all entries in database
 * @param {object} Model The model to perform action
 */
const getAll = Model => async (req, res, next) => {
  //retrieving all the model upon requested
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
