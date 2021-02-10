import express from "express";
import redis from "redis";

const app = express();
const client = redis.createClient();

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      return res.sendStatus(500);
    }
    res.send(`Number of visits: ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => console.log(`listening on port 8081`));
