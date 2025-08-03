const app = require('./src/app');

const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});