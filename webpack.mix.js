let mix = require('laravel-mix');

mix
   .setResourceRoot('../../../../') // this sets the path prefix to font files etc., useful for apps in subdir
   .setPublicPath('build')
   .autoload({
      jquery: [ '$', 'jQuery', 'window.jQuery' ]
   })
   .webpackConfig({
      resolve: {
         modules: [
            'bower_components',
            'node_modules',
            'rx-plugins',
         ]/*,
         alias: {
            'utils': path.resolve(__dirname, './utils')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
         }*/
      },
      stats: {
         warningsFilter: [ // doesn't work, the intention was to suppress warnings from ~/gentelella/build/css/custom.css
            './~/css-loader!./~/postcss-loader!'//./~/gentelella/build/css/custom.css'
         ]
      }/*,
      plugins: [
         new webpack.ProvidePlugin({
            'utils': 'utils'
         })
      ]*/
   });

// javascript
mix.js('resources/assets/js/index.js', 'build/js/rocXolid.js')
   .extract([ 'jquery' ])
   .sourceMaps()
   .version();

// styles
mix.sass('resources/assets/sass/rocXolid.scss', 'build/css', {
      // data: '$appUrl:\'' + process.env.MIX_AWS_URL + '\';'
   })
   .sourceMaps()
   .version();

// simply copy required assets
mix.copy('node_modules/bootstrap/dist/css/bootstrap.css.map', 'build/css')
   .copyDirectory('resources/assets/images', 'build/images');

// KEditor
mix.copyDirectory('rx-plugins/keditor/dist/css', 'build/plugins/keditor/css');

// CKEditor // summernote can't work in iframes required by keditor
mix.copyDirectory('node_modules/ckeditor4', 'build/plugins/ckeditor4')
   .copyDirectory('rx-plugins/ckeditor4', 'build/plugins/ckeditor4');  // customization