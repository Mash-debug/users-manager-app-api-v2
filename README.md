Ajouter un fichier .env avec les variables suivantes : 
```bash
PORT="5000" # Port sur lequel l'application écoutera les connexions
DB_URL=URL_de_votre_base_de_données # URL de connexion à votre base de données
SECRET_KEY=votre_clé_secrète # Clé secrète utilisée pour sécuriser les sessions
CLIENT_URL="http://localhost:5173" # URL du client
```
Et enfin : 
```js
npm i
node index.js
```
pour démarrer l'application.