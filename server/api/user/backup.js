router.post("/login", async (req, res) => {
  const error = {};
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("hahahah", isMatch);
    if (isMatch) {
      const payLoad = {
        id: user._id,
        email: user.email
      };
      // Sign the token
      const token = await webToken.sign(payLoad, secret, {
        expiresIn: 3600
      });
      res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  } catch (e) {}
});

router.post("/register", async (req, res) => {
  let error = {};

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      error.email = "User already exist";
      return res.status(400).json(error);
    }
    const newUser = new User({
      email: req.body.email,
      type: req.body.type,
      password: req.body.password
    });
    console.log(newUser);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    throw error;
  }
});
