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
         ]
      },
      stats: {
         warningsFilter: [ // doesn't work, the intention was to suppress warnings from ~/gentelella/build/css/custom.css
            './~/css-loader!./~/postcss-loader!'//./~/gentelella/build/css/custom.css'
         ]
      }
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
   // temporary, until a way to integrate keditor to plugin-binder is found
   .styles([
      'rx-plugins/keditor/dist/css/keditor.css',
      'rx-plugins/keditor/dist/css/keditor-components.css',
      'build/css/rocXolid.css',
   ], 'build/css/rocXolid.css')
   .version();

// simply copy required assets
mix.copy('node_modules/bootstrap/dist/css/bootstrap.css.map', 'build/css')
   .copyDirectory('resources/assets/images', 'build/images');

// CKEditor
// @todo: find a way to integrate CKEditor without this
// summernote can't work in iframes required by keditor
mix.copy('node_modules/ckeditor4/config.js', 'build/plugins/ckeditor4/config.js')
   .copy('node_modules/ckeditor4/styles.js', 'build/plugins/ckeditor4/styles.js')
   .copy('node_modules/ckeditor4/contents.css', 'build/plugins/ckeditor4/contents.css')
   .copyDirectory('node_modules/ckeditor4/skins', 'build/plugins/ckeditor4/skins')
   .copyDirectory('node_modules/ckeditor4/lang', 'build/plugins/ckeditor4/lang')
   .copyDirectory('node_modules/ckeditor4/plugins', 'build/plugins/ckeditor4/plugins')

// keditor
// temporary, until a way to integrate keditor to plugin-binder is found
// currently, document-composer requires rebuild on change (cd resources/assets/js/plugins/document-composer/ && npm run build)
mix.copy('rx-plugins/keditor/dist', 'build/plugins/keditor')
   .copy('rx-plugins/keditor/dependencies', 'build/plugins/keditor/dependencies');