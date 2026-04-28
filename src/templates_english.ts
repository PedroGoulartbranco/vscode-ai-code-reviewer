import { calcular_media} from './utils';
import { cor_emoji_nota } from './ui-utils';

type template_json = (dados: any) => string;

export const listaTemplates_English: Record<string, template_json> = {
    'html': template_html,
    'css': template_css,
    'python': template_python,     
    'javascript': template_javascript,
    'typescript': template_typescript,
    'c': template_c,
    'java': template_java,
    'cpp': template_cpp,
    'go': template_go,
    'csharp': template_csharp,
    'lua': template_lua,
    'luau': template_luau,
    'php': template_php,
    'ruby': template_ruby,
    'sql': template_sql
};