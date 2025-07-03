const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "iamweb@dev"; //aa string thi web oken ne sign karvanu check karvama avse ke user e eni details name etc. change to nai karyu ne

// ROUTE 1: create a user using post "/api/auth/createuser" don't need to login.
router.post(
  "/createuser",
  [
    //conditions
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req); // if error then then send error with bad request.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user with this email exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists" });
      }
      // salt is passByUser + salt added by backend for extra safety
      //hash function convert password to something different so attacker get this hash he can login. but when user enter his password backend convert into hash value then compare with password into database.
      const salt = await bcrypt.genSalt(10); //salt and hash are async fun
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        //create user
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //authenticate karti vakhte  apde user ne ek token apsu.
      success = true;
      res.json({ success , authtoken });                      //jyare website access karvi hoy tyre e apdne token
      //                                              apse apde verify krsu. token:1st part type.. 2nd data of
    } catch (error) {                               //user 3rd. we will sign with some strong string.
      console.error(error.message);
      res.status(500).send("some error occured");
      // res.status(500).json({error:"some error occured"});
    }
  }
);

//ROUTE 2: login user(AUTHENTICATE). post "api/auth/login" no login require. ofc!

router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password',"password can't be blank").exists() 
],
async(req,res)=>{
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    }

    const {email,password} = req.body; //destructuring
    try {
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error: "please enter correct credentials"})
      }
      
      const passComp = await bcrypt.compare(password,user.password)
      if(!passComp){
        return res.status(400).json({error: "please enter correct credentials"})
      }

      const data = {
        user: {
          id: user.id,
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET); //authenticate karti vakhte  apde user ne ek token apsu.
      success = true;
      res.json({ success , authtoken });

    } catch (error) {
      console.error(error.message)
      res.send(500).send("Internal server error")
    }
  })

  //ROUTE 3: get logged in  user's details. post "api/auth/getuser" . login require. 
  router.post('/getuser', fetchuser, async(req,res)=>{
    try {
      const userID = req.user.id  
      const user = await User.findById(userID).select("-password")
      res.send(user)
      
    } catch (error) {
      console.error(error.message)
      res.send(500).send("Internal server error")
    }
  })
module.exports = router;
