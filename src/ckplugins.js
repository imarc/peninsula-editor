import FileUploadInline from './store/modules/plugins/inlineFileUpload.js'
import Flmngr from "@edsdk/flmngr-ckeditor5/src/flmngr.js"

import {
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
    Image,
	Italic,
	Link,
	List,
	Paragraph,
	Table,
	TableColumnResize,
	TableToolbar,
	TextTransformation,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

export default [

    Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
    Image,
	Italic,
	Link,
	List,
	Paragraph,
	Table,
	TableColumnResize,
	TableToolbar,
	TextTransformation,

	Flmngr,
    FileUploadInline,
]
