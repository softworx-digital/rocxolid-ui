import * as translations from './lang/sk';

/**
 * @author softworx <hello@softworx.digital>
 * @package Softworx\RocXolid\Design
 * @version 1.0.0
 * @todo consider translations from packages' lang files
 */
class Translator
{
    constructor(rx, lang) {
        this.rx = rx;
        this.lang = lang;
        this.translations = {};
    }

    translate(packageName, key)
    {
        return translations[packageName][key];
    }

    load(packageName)
    {
        // dynamically load and cache files - possible?
    }
}

export { Translator };