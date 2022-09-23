import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import questionRoutes from './routes/question.js';
import contestRoutes from './routes/contests.js';
import profileRoutes from './routes/profile.js';
import taskRoutes from './routes/tasks.js';
import followersRoutes from './routes/followers.js';
const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "100mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
app.use(fileUpload({
    useTempFiles: true,
}));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/contests', contestRoutes);
app.use('/profiles', profileRoutes);
app.use('/followers', followersRoutes);
app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
    res.send('App is running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on: ${PORT}`)))
    .catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);