#!/bin/bash
set -e

case "$1" in
"down")
  docker-compose -f docker-compose.yml down "${@:2}"
  ;;
"up")
  docker-compose -f docker-compose.yml up -d --remove-orphans --build "${@:2}"
  ;;
"build")
  docker-compose -f docker-compose.yml build --force-rm "${@:2}"
  ;;
"exec")
  docker-compose -f docker-compose.yml exec "${@:2}"
  ;;
"logs")
  echo "Attaching logs. Press Ctrl+C twice to exit."
  while sleep .5; do
    echo "Reattaching logs. Press Ctrl+C twice to exit."
    docker-compose -f docker-compose.yml logs --tail 100 --follow "${@:2}"
  done
  ;;
esac
