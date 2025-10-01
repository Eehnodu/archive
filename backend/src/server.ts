import { createApp } from "./app";
import { config } from "./core/config";

const app = createApp();
const PORT = Number(config.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`🚀 API on http://localhost:${PORT}`);
});
