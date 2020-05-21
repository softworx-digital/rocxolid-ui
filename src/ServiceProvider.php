<?php

namespace Softworx\RocXolid\UI;

use Illuminate\Foundation\AliasLoader;
// rocXolid service providers
use Softworx\RocXolid\AbstractServiceProvider as RocXolidAbstractServiceProvider;

/**
 * rocXolid UI package primary service provider.
 *
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\UI
 * @version 1.0.0
 */
class ServiceProvider extends RocXolidAbstractServiceProvider
{
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this
            ->bindContracts()
            ->bindAliases(AliasLoader::getInstance());
    }

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this
            ->publish();
    }

    /**
     * Expose config files and resources to be published.
     *
     * @return \Softworx\RocXolid\AbstractServiceProvider
     */
    private function publish(): RocXolidAbstractServiceProvider
    {
        // assets files
        // php artisan vendor:publish --provider="Softworx\RocXolid\UI\ServiceProvider" --tag="assets" (--force to overwrite)
        // @todo: "hotfixed" - unify?
        $this->publishes([
            __DIR__ . '/../build/plugins' => public_path('vendor/softworx/rocXolid/plugins'),
            __DIR__ . '/../build/images' => public_path('vendor/softworx/rocXolid/images'),
            __DIR__ . '/../build/css' => public_path('vendor/softworx/rocXolid/css'),
            __DIR__ . '/../build/js' => public_path('vendor/softworx/rocXolid/js'),
            __DIR__ . '/../build/mix-manifest.json' => public_path('vendor/softworx/rocXolid/mix-manifest.json'),
            __DIR__ . '/../build/images/vendor' => public_path('images/vendor'),
            __DIR__ . '/../build/fonts' => public_path('fonts'),
        ], 'assets');

        return $this;
    }

    /**
     * Bind contracts / facades, so they don't have to be added to config/app.php.
     *
     * Usage:
     *      $this->app->bind(<SomeContract>::class, <SomeImplementation>::class);
     *
     * @return \Softworx\RocXolid\AbstractServiceProvider
     */
    private function bindContracts(): RocXolidAbstractServiceProvider
    {
        return $this;
    }

    /**
     * Bind aliases, so they don't have to be added to config/app.php.
     *
     * Usage:
     *      $loader->alias('<alias>', <Facade/>Contract>::class);
     *
     * @return \Softworx\RocXolid\AbstractServiceProvider
     */
    private function bindAliases(AliasLoader $loader): RocXolidAbstractServiceProvider
    {
        return $this;
    }
}
