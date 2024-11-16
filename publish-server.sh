#! /bin/bash

echo '[*] Uploading to remote machine...'
rsync -vrch --delete ./ eyaserver@142.93.190.42:/home/eyaserver/tesfa-server --exclude=node_modules
ssh -t eyaserver@142.93.190.42 '/home/eyaserver/.nvm/versions/node/v20.11.0/bin/node /home/eyaserver/.nvm/versions/node/v20.11.0/bin/pm2 restart tesfa;/home/eyaserver/.nvm/versions/node/v20.11.0/bin/node /home/eyaserver/.nvm/versions/node/v20.11.0/bin/pm2 logs tesfa'

