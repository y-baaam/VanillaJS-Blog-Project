#!/usr/bin/sh

pnpm run build && mv ./dist/index.html ./dist/index2.html && cp -r ./public/* ./dist/ &&
rm ./dist/index.html && mv ./dist/index2.html ./dist/index.html && rm ./public/sitemap.xml
