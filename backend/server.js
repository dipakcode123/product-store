import express from 'express';
import 'dotenv/config';
import path from 'path'
import { connectDB } from './db/connectDB.js';
import router from './routes/product.route.js';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use('/api/products', router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`server started on port: ${PORT}`);
})