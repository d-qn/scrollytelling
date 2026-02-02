#' Script de déploiement SFTP pour le Boilerplate Scrollytelling
#' Utilise le package 'ssh'
# install.packages("ssh")

library(ssh)

# --- CONFIGURATION ---
host <- "votre-serveur.ch"
user <- "votre-username"
remote_dir <- "/var/www/labs/mon-projet-scrolly" # Chemin sur le serveur
local_build_dir <- "build" # Dossier généré par 'npm run build'

# 1. Connexion au serveur
# (Nécessite une clé SSH configurée ou demandera le mot de passe dans la console R)
cat("Connecion à", host, "...\n")
session <- ssh_connect(paste0(user, "@", host))

# 2. Création du dossier distant s'il n'existe pas
# ssh_exec_wait(session, command = paste("mkdir -p", remote_dir))

# 3. Transfert des fichiers
cat("Transfert des fichiers de", local_build_dir, "vers", remote_dir, "...\n")

# Note: scp_upload télécharge tout le contenu du dossier
scp_upload(session, local_build_dir, to = dirname(remote_dir))

# Si le dossier build est uploadé comme 'build', on peut le renommer
# ssh_exec_wait(session, command = paste("mv", file.path(dirname(remote_dir), "build"), remote_dir))

# 4. Déconnexion
ssh_disconnect(session)

cat("Déploiement terminé avec succès !\n")
