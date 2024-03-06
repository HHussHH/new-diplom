import { db } from "../db.js";

export const getLinks = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM links WHERE cat=?"
    : "SELECT * FROM links";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const addLink = (req, res) => {
  console.log("work");
  const q =
    "INSERT INTO links (`title`, `desc`, `img`, `cat`,`original`, `uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.original,
    req.body.uid,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Link has been created.");
  });
};

// export const addLink = (req, res) => {
//   console.log("workd");
//   const q = "INSERT INTO links(`title`, `desc`) VALUES (?)";
//   const values = [req.body.title, req.body.desc];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("User has been created.");
//   });
// };
