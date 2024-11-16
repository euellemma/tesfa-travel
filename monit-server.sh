#! /bin/bash

ssh -t eyaserver@142.93.190.42 '/home/eyaserver/.nvm/versions/node/v20.11.0/bin/node /home/eyaserver/.nvm/versions/node/v20.11.0/bin/pm2 restart tesfa;/home/eyaserver/.nvm/versions/node/v20.11.0/bin/node /home/eyaserver/.nvm/versions/node/v20.11.0/bin/pm2 logs tesfa'
