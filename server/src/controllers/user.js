import * as services from "../services/user";

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOneUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at price controller: " + error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Update user fail",
      });
    const response = await services.updateUser(id, payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at price controller: " + error,
    });
  }
};
