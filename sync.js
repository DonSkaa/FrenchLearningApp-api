const db = require("./models")

const UserPrograms = db.UserPrograms;
const sequelize = db.sequelize;

(async () => {
    try {
        // Synchronisation uniquement pour le modèle user_programs_decks
        await UserPrograms.sync({ alter: true });
        console.log('Table user_programs_decks synchronized successfully.');
    } catch (error) {
        console.error('Error syncing user_programs_decks:', error);
    } finally {
        // Fermer la connexion à la base de données
        await sequelize.close();
    }
})();

