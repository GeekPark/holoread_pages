#! /bin/bash
ssh -t holoread "pwd && cd www/holoread-pages && git pull && yarn && npm run build"
