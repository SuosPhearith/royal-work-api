// =========================================================================>> Core Library
import { Injectable} from '@nestjs/common';
import axios from 'axios';

// =========================================================================>> Third Party Library
import { Op } from 'sequelize';
// =========================================================================>> Custom Library
import Docs from 'src/models/docs/docs.model';
import Orgs from 'src/models/orgs/orgs.model';
import DocsType from 'src/models/docs/docs_type.model';

@Injectable()
export class DashboardService {
    constructor(){}
    private fileBaseUrl = process.env.FILE_BASE_URL;
    private readonly allowedMimeTypes = {
        png: 'image/png',
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };

    async readStatistics(key?: string): Promise<any> {
        try {
            const today = new Date();
            let whereCondition = {};

            if (key === 'today') {
                const startOfToday = new Date(today.setHours(0, 0, 0, 0));
                const endOfToday = new Date(today.setHours(23, 59, 59, 999));
                whereCondition = {
                    created_at: {
                        [Op.between]: [startOfToday, endOfToday],
                    },
                };
            } else if (key === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
                const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));
                whereCondition = {
                    created_at: {
                        [Op.between]: [startOfYesterday, endOfYesterday],
                    },
                };
            } else if (key === 'this_week') {
                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                startOfWeek.setHours(0, 0, 0, 0);
                const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
                endOfWeek.setHours(23, 59, 59, 999);
                whereCondition = {
                    created_at: {
                        [Op.between]: [startOfWeek, endOfWeek],
                    },
                };
            } else if (key === 'this_month') {
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                endOfMonth.setHours(23, 59, 59, 999);
                whereCondition = {
                    created_at: {
                        [Op.between]: [startOfMonth, endOfMonth],
                    },
                };
            } else if (key === 'this_year') {
                const startOfYear = new Date(today.getFullYear(), 0, 1);
                const endOfYear = new Date(today.getFullYear(), 11, 31);
                endOfYear.setHours(23, 59, 59, 999);
                whereCondition = {
                    created_at: {
                        [Op.between]: [startOfYear, endOfYear],
                    },
                };
            } else {
                whereCondition = {};
            }

            const total_docs = await Docs.count();
            const added_docs = await Docs.count({
                where: whereCondition,
            });
            const total_orgs = await Orgs.count();
            const added_orgs = await Orgs.count({
                where: whereCondition,
            });
            const num_active_docs = await Docs.count({where: {is_active: true}});
            const added_active_docs = await Docs.count({
                where: {
                    is_active: true,
                    ...whereCondition
                }
            });
            const num_inactive_docs = await Docs.count({where: {is_active: false}});
            const added_inactive_docs = await Docs.count({
                where: {
                    is_active: false,
                    ...whereCondition
                }
            });
           
            const data = {
                    total_docs: total_docs || 0,
                    added_docs: added_docs || 0,
                    total_orgs: total_orgs || 0,
                    added_orgs: added_orgs || 0,
                    num_active_docs: num_active_docs || 0,
                    added_active_docs: added_active_docs || 0,
                    num_inactive_docs: num_inactive_docs || 0,
                    added_inactive_docs: added_inactive_docs || 0,
            }

            return{
                data
            }
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    async readFileSize(): Promise<any> {
        try {

            const data = await this.calculateSizes();

            return{
                data
                }
        } catch (error) {
            throw new Error();
        }
    }

    async readDocsList(key?: string): Promise<any> {
        try {
            let limitOption = {};

            if (key === 'show_less') {
                limitOption = { limit: 7, order: [['id', 'DESC']] };
   
            } else if (key === 'show_all') {
                limitOption = { order: [['id', 'DESC']] };

            } else{
                limitOption = {};
            }
            const docsList = await Docs.findAll({
                attributes: ['id', 'title', 'file_uri', 'extension', 'is_active', 'created_at', 'updated_at'],
                include: [
                    {
                        model: DocsType,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Orgs,
                        attributes: ['id', 'kh_name', 'en_name'],
                    }
                ],
                ...limitOption,
            });
            // Map documents to extract file metadata
            const docsWithMetadata =  docsList.map(doc => ({
                ...doc.get(),
                file_uri: doc.file_uri,
                extension: doc.extension
            }));
        
            // Calculate file sizes
            const sizes = await this.calculateSizesForDocs(docsWithMetadata);
        
            // Attach sizes to documents
            const docs = docsWithMetadata.map((doc, index) => ({
                ...doc,
                file_size: `${(sizes[index].size / (1024 * 1024)).toFixed(2)} MB`,
                
            }));

            const docs_type = await DocsType.findAll({
                attributes: ['id', 'name'],
            });

            const orgs = await Orgs.findAll({
                attributes: ['id', 'kh_name'],
            });

            const data =  {docs, docs_type, orgs};

            return{
                data
                }
        } catch (error) {
            throw new Error();
        }
    }

    async getFileMetadata(url: string, extension: string): Promise<{ size: number, type: string }> {
        try {
            const mimeType = this.allowedMimeTypes[extension] || 'application/octet-stream';
            const response = await axios({
              url,
              method: 'HEAD',
            });
      
            const fileSize = parseInt(response.headers['content-length'] || '0', 10);
            const fileType = response.headers['content-type'] || mimeType;

            return { size: fileSize, type: fileType };
          } catch (error) {
            console.error(`Failed to fetch metadata for URL ${url}:`, error);
            throw new Error('Failed to fetch file metadata');
          }
    }

    
    async calculateSizes(): Promise<any> {
        const totals = {
        png: 0,
        pdf: 0,
        docx: 0,
        xlsx: 0,
        other: 0,
        };
        const urls = await Docs.findAll({ attributes: ['file_uri', 'extension'] });
        let totalSize = 0;
        for (const url of urls) {
            
            const { file_uri, extension } = url;
            const { size, type } = await this.getFileMetadata(this.fileBaseUrl+'/'+file_uri, extension);

        if (type === this.allowedMimeTypes.png) {
            totals.png += size;
        } else if (type === this.allowedMimeTypes.pdf) {
            totals.pdf += size;
        } else if (type === this.allowedMimeTypes.docx) {
            totals.docx += size;
        } else if (type === this.allowedMimeTypes.xlsx) {
            totals.xlsx += size;
        } else {
            totals.other += size;
        }

        totalSize += size;
        }

        return {
        totalSize: `${(totalSize / (1024 * 1024)).toFixed(2)} MB`,
        totalPNGSize: `${(totals.png / (1024 * 1024)).toFixed(2)} MB`,
        totalPDFSize: `${(totals.pdf / (1024 * 1024)).toFixed(2)} MB`,
        totalDOCXSize: `${(totals.docx / (1024 * 1024)).toFixed(2)} MB`,
        totalXLSXSize: `${(totals.xlsx / (1024 * 1024)).toFixed(2)} MB`,
        totalOtherSize: `${(totals.other / (1024 * 1024)).toFixed(2)} MB`,
        pngPercentage: `${((totals.png / totalSize) * 100).toFixed(2)}%`,
        pdfPercentage: `${((totals.pdf / totalSize) * 100).toFixed(2)}%`,
        docxPercentage: `${((totals.docx / totalSize) * 100).toFixed(2)}%`,
        xlsxPercentage: `${((totals.xlsx / totalSize) * 100).toFixed(2)}%`,
        otherPercentage: `${((totals.other / totalSize) * 100).toFixed(2)}%`,
        };
    }


    async calculateSizesForDocs(docs: Array<{ file_uri: string, extension: string }>): Promise<Array<{ size: number, type: string }>> {
        return Promise.all(docs.map(doc => this.getFileMetadata(this.fileBaseUrl+'/'+doc.file_uri, doc.extension)));
      }
  
}

