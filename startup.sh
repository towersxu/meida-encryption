#!/bin/sh

echo "begin"

chmod 777 -R ./.

su - taox <<EOF

cd ~/project/audio-encryption

echo `pwd`

pm2 stop audio-encryption

NODE_ENV=production pm2 start .next/production-server/server.js --name "audio-encryption"

echo "restarted"

EOF