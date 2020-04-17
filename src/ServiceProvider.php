<?php

namespace Softworx\RocXolid\UI;

use Softworx\RocXolid\AbstractServiceProvider as RocXolidAbstractServiceProvider;

/**
 * rocXolid UI package service provider.
 *
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Admin
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
}
