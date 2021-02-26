"use strict";

exports.ok = function (values, res) {
  let data = {
    status: 200,
    value: values,
  };

  res.json(data);
  res.end();
};
