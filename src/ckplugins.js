import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import FileUploadInline from './store/modules/plugins/inlineFileUpload'

export default [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Alignment,
    Autoformat,
    BlockQuote,
    Heading,
    Link,
    List,
    Table,
    TableToolbar,
    TableColumnResize,
    FileUploadInline
]
