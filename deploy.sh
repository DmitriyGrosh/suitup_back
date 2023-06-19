echo "Switching to branch main"
git checkout main

echo "Building app..."
yarn build

echo "Deploying files to server..."
scp -r dist/* grosh@194.67.110.39:/var/www/suitup/back

echo "Done!"
