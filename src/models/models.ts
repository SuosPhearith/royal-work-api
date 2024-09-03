// ============================================================>> User
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

// ============================================================>> Service
const models = [
    // ===============>> User
    Role,
    User,
    UserRole,
    // ===============>> Organization
    Orgs,
    // ===============>> File
    FileDocs,
    // ===============>> Document
    DocsType,
    Docs,
    DocsEditor,
    DocsSaved,
    DocsDeletion,

];

export default models;