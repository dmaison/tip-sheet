import thesaurus from '../data/thesaurus.json';
import '../css/index.css';

/**
 * Executes the code when ready
 * @param {function} cb callback function for when the document is ready
 */
const DOMReady = ( cb ) => {
	if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
		cb();
	} else {
		document.addEventListener( 'DOMContentLoaded', cb );
	}
};

/**
 * Handle note conversion
 */
const handleChange = () => {
    const { codeTextArea, noteTextArea } = document.noteConverter.elements,
    { value } = noteTextArea,
    ary = [];

    // loop through thesaurus, find synonyms
    for( const synonym in thesaurus ){
        const reg = new RegExp( `\\b(${synonym})\\b`, 'i' ),
        codes = thesaurus[ synonym ];        
        if( !!reg.test( value ) ) ary.push( ...codes );
    }
    codeTextArea.value = ary.join( ' ' );
}

/**
 * initializes click events
 */
const init = () => {
    const { noteTextArea } = document.noteConverter.elements;
    noteTextArea.addEventListener( 'paste', handleChange, true  );
    noteTextArea.addEventListener( 'change', handleChange, true  );
};

DOMReady( init );