const express = require('express');
const cors = require('cors');
const { RouterOSClient } = require('routeros-client');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api', async (req, res) => {
  const client = new RouterOSClient(req.body.config);
  try {
    await client.connect();
    const data = await client.call(req.body.command, req.body.params || {});
    await client.close();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy العنكبوت شغال على بورت ${PORT}`));
