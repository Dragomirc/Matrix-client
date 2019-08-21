import express from "express";
import path from "path";
const app = express();

app.use(express.static("dist"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
});
app.listen(process.env.PORT || 8080);
