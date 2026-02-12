const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: [
    { waktu: "08:10 - 10:10", mapel: "agama" },
    { waktu: "10:40 - 15:00", mapel: "DDA" }
  ],
  selasa: [
    { waktu: "07:30 - 09:30", mapel: "pjok" },
    { waktu: "09:30 - 11:20", mapel: "matematika" }
    { waktu: "11:20 - 15:40", mapel: "ipas" }
  ],
  rabu: [
    { waktu: "07:30 - 08:50", mapel: "sejarah" },
    { waktu: "08:50 - 13:20", mapel: "DDA" }
    { waktu: "13:40 - 15:00", mapel: "KKA"  }
  ],
  kamis: [
    { waktu: "07:30 - 08:50", mapel: "bahasa indonesia" },
    { waktu: "08:50 - 12:00", mapel: "informatika" }
    { waktu: "12:00 - 15:00", mapel: "bahasa inggris" }
  ],
  jumat: [
    { waktu: "08:10 - 09:30", mapel: "seni budaya" },
    { waktu: "09:30 - 11:20", mapel: "pkn" }
    { waktu: "11:20 - 12:40", mapel: "bahasa indonesia" }
    { waktu: "12:40  - 14:20", mapel: "bahasa bali" }
    { waktu: "14:20  - 15:40", mapel: "matematika" }
  ],
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
