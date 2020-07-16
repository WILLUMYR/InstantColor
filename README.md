# InstantColor
### React app for our </SALT> Hackday

Run the backend server by using 
```javascript 
npm start
````
*This will install all dependecies needed and start the server on port 5000*

Then enter client with
```javascript
cd client
````
and run 
```javascript
yarn start
```
*This will install all dependecies needed and start the React application*


# Description

InstantColor is a React application where you can input a hex (#) color code and the app will generate a color palette that fits the original color.

You are also able to change what kind of palette you want. You can choose between:
* **Monochrome** (default) - Will return a regular palette of colors in the same shade
* **Monochrome Dark** - Returns a palette with 3 darker shades and 2 light greys to match.
* **Monochrome Light** - Returns a palette with 3 light shades and 2 dark greys
* **Complement** - Returns a palette with 3 shades of the original color, and 2 shades that complement the original color well.

* **Analogic** - Return a palette with different shades that are near each other on the color wheel, starting from your original color.
* **Analogic-Complement** - Returns a palette with 3 analogic colors, and 2 colors that compliment these colors well.



