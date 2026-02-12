 const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: [
    { waktu: "07:00 - 08:00", mapel: "Matematika" },
    { waktu: "08:00 - 09:00", mapel: "Bahasa Indonesia" }
  ],
  selasa: [
    { waktu: "07:00 - 08:00", mapel: "IPA" },
    { waktu: "08:00 - 09:00", mapel: "IPS" }
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;

  if (jadwal[hari]) {
    let responseText = `Jadwal hari ${hari}:\n`;
    jadwal[hari].forEach(item => {
      responseText += `${item.waktu} - ${item.mapel}\n`;
    });

    res.json({
      fulfillmentText: responseText
    });
  } else {
    res.json({
      fulfillmentText: `Maaf, jadwal untuk hari ${hari} tidak ditemukan.`
    });
  }
});

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});

