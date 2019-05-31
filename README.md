# nativescript-ng-packagr

Example project for using ng-packagr with NativeScript.


## Enabling devtools

Add to your `webpack.config.js`: 
```javascript
config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^ws$/, "nativescript-websockets"));
```

## Work flow

run ans any normal nativescript application. everything in the app/lib folder is to be shared and dist. 


### Build dist

`npm run build`


### Publish process

`cd dist/mylib/`

`npm publish`


### More info for ng-packagr

https://github.com/dherges/ng-packagr
