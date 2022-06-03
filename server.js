import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from './translate_man_be/configuration/database.js';
import userRoutes from './translate_man_be/routes/user-routes.js';
import wordRoutes from './translate_man_be/routes/word-routes.js';
import morgan from 'morgan';
import path from "path";

const app = express();
dotenv.config();
connectDB();
// app.get("/", (req, res) => {res.send("Hello world")});

if (process.env.NODE_ENV === 'localhost') {
  app.use(morgan('dev'));
}else if(process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/word_man_fe/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'word_man_fe', 'build', 'index.html'))
  )
}

app.use(express.json());
//app.use("/api/users/",BaseRoutes);


//app.use("/", ((req,res)=>{console.log(req,res)}));
app.use('/api/word', wordRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT||5000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
    console.log(
      `Running at ${process.env.NODE_ENV}:${PORT}`.green.bold
    );
  });
