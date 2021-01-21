# So Pekocko #

Projet 6 de la formation de développeur web d'OpenClassrooms.

## Description ##

Contexte du projet: So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

## Technologie à utiliser ##

Framework Express, serveur NodeJS, Base de données MongoDB.
Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

## Comment lancer l'application ##

Pour faire fonctionner cette API (backend), il faut la partie frontend.
Le lien du dépôt GitHub à cloner pour la partie frontend est le suivant : ​https://github.com/OpenClassrooms-Student-Center/dwj-projet6

Puis exécutez: npm install -g npm@latest //Installez la dernière version de nodeJs
npm install -g @angular/cli@7.0.2 //c'est la version d'Angular utilisée pour développer le frontend
npm install node-sass@4.12.0 --no-save --unsafe-perm //installe sass pour faire fonctionner le frontend

Après ces installations complémentaires, tapez: ng serve sur la console de commande.
Puis ouvrez le site web sur votre navigateur: http://localhost:4200


Enfin, pour lancer le backend, exéutez dans la console: npm intall et npm install -g nodemon
Ajouter le fichier .env, envoyé à part, sur la racine du projet.
Ces dernières installations terminées, tapez nodemon server
Et voilà, c'est tout ;)
