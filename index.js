import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();
const PORT = process.env.PORT || 3080; ;
 env.config();

app.use(cors());

app.use(bodyParser.json());

// config
const configuration = new Configuration({
  organization: "org-TBcfggypBy91GlGKtxWcrq5J",
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
// listening
app.listen(PORT, () => console.log("started"));

//route
app.get("/", (req, res) => {
  res.send("hello");
});

//post route for request
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
