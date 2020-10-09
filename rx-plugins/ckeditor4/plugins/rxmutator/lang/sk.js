/**
 * CKEditor plugin for rocXolid CMS Document Editor integration.
 * Slovak language pack.
 *
 * @author softworx <hello@softworx.digital>
 * @version 1.0.0
 */

CKEDITOR.plugins.setLang('rxmutator', 'sk', {
    toolbar: 'Vložiť mutátor',
    contextMenu: {
        remove: 'Odstrániť mutátor',
    },
    pathName: 'mutator',
    error: {
        selection_empty: 'Pre použitie tohto prvku je potrebný výber textu alebo placeholdera.\nVýber bol prázdny.',
        selection_requires_multiple_placeholder: 'Pre použitie tohto prvku je potrebný výber aspoň jedného placeholdera.',
        selection_forbids_multiple_placeholder: 'Pre použitie tohto prvku nie je možný výber viacerých placeholderov',
        selection_invalid_wrapped: 'Vybraný text už má aplikovaný mutátor. Vnorené mutátory nie sú povolené.',
        selection_invalid_regex: 'Vybraný text obsahuje nepovolené znaky.',
        selection_invalid_expression: 'Vybraný text nepredstavuje aritmetický výraz.',
        selection_invalid_whitespace: 'Vybraný text obsahuje nepovolené znaky. Povolený je súvislý reťazec - slovo.',
    }
});