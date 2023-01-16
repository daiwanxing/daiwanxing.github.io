set -e

npm run build

cd dist

git init
git checkout -B main
git add .
git commit -m 'deploy'

git push -f git@github.com:daiwanxing/daiwanxing.github.io.git main