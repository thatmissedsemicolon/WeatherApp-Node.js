import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

app.get('/', (req, res) => {
  res.json(
    { message: "404" }
  );
});

app.get('/weather', (req, res) => {
  const q = req.query.q;
  const options = {
    method: 'GET',
    url: `${process.env.RAPID_API_URL}`,
    params: {q: `${q}`},
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
      'X-RapidAPI-Host': `${process.env.RAPID_API_HOST}`
    }
  };
      
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.status(404).json({ message: "404" });
  });
});

app.listen(process.env.PORT|| 5000);