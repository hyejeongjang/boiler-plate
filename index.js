const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");
//application/x-www-form-urlencoded 분석해서 가져올수 있게
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 분석해서 가져올 수 있도록
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) =>
  res.send("Hello World!~~안녕하세요 ~! 새해 복 많이 받으세요!!")
);

app.post("/register", (req, res) => {
  //회원가입 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  // req.body 정보들이 user 모델에 저장

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    //status(200)은 성공했다는 의미
    return res.status(200).json({
      success: true
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
