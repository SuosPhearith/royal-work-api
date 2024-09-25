import Docs from "./docs/docs.model";
import DocsDeletion from "./docs/docs_deletion.model";
import DocsEditor from "./docs/docs_editor.model";
import DocsSaved from "./docs/docs_saved.model";
import DocsType from "./docs/docs_type.model";
import Orgs from "./orgs/orgs.model";
import Role from "./user/role.model";
import User from "./user/user.model";
import UserRole from "./user/user_role.model";
import FileDocs from "./file/file.model";
import OrgsType from "./orgs/orgs_type.model";
import HeaderLink from "./orgs/header_link.model";
import Language from "./language/language.model";
import MinistryLogo from "./ui_ministry/ministry_logo.model";
import MinistryTitle from "./ui_ministry/ministry_title.model";
import SearchText from "./ui_text/search_text.model";
import SearchMiddleText from "./ui_text/search_middle_text.model";
import FooterInfo from "./ui_text/footer_info.model";
import ListDocsText from "./ui_text/list_docs_text.model";
import Logo from "./logo/logo.model";
import DocsView from "./docs/docs_view.model";

// ============================================================>> Service
const models = [


    // ===============>> User
    Role,
    User,
    UserRole,

    // ===============>> Language
    Language,

    // ===============>> Organization
    HeaderLink,
    OrgsType,
    Orgs,
    // ===============>> File
    FileDocs,
    // ===============>> Document
    DocsType,
    Docs,
    DocsEditor,
    DocsSaved,
    DocsDeletion,
    DocsView,

    // ===============>> UI
    MinistryTitle,
    MinistryLogo,
    SearchText,
    SearchMiddleText,
    FooterInfo,
    ListDocsText,
    Logo

];

export default models;