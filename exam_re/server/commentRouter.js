const express = require('express');
const commentRouter = express.Router();
const db = require("./db.js");

// 댓글조회
// queryString을 사용할경우 parser를 함께 사용해야 함
commentRouter.get("/", async(request, response) => {
    let data = request.query.bno;
    let result = await db.connection('comment', 'commentList', data);
    response.send(result);
  });

  module.exports = commentRouter;