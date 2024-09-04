// ===========================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import Docs from '../docs/docs.model';

// ===========================================================================>> Custom Library

@Table({ tableName: 'file_docs', createdAt: 'created_at', updatedAt: 'updated_at'})
class FileDocs extends Model<FileDocs> {

    // ======================================================================>> Fields
    @Column({ allowNull: false, type: DataType.STRING(100) })   name?: string;
    @Column({ allowNull: false, type: DataType.STRING(100) })   image_uri?: string;

    // ======================================================================>> One to many 
    @HasMany(() => Docs)                                        docs: Docs[];
}
export default FileDocs;