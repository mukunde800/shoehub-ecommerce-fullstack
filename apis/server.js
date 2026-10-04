require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion DB réussie');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées');
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  } catch (e) {
    console.error('❌ Erreur:', e);
    process.exit(1);
  }
})();