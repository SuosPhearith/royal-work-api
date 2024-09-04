// =========================================================================>> Core Library
import { Injectable} from '@nestjs/common';
import axios from 'axios';
import Docs from 'src/models/docs/docs.model';
import Orgs from 'src/models/orgs/orgs.model';
import DocsType from 'src/models/docs/docs_type.model';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library

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

    async read(): Promise<any> {
        try {
            const total_docs = await Docs.count();
            const total_orgs = await Orgs.count();
            const num_active_docs = await Docs.count({where: {is_active: true}});
            const num_inactive_docs = await Docs.count({where: {is_active: false}});
            const docs1 = await Docs.findAll({
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
    
            });
            // Map documents to extract file metadata
            const docsWithMetadata =  docs1.map(doc => ({
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
            
            // return {docsWithSizes};
            const file_size = await this.calculateSizes();

            return{
                total_docs: total_docs || 0,
                total_orgs: total_orgs || 0,
                num_active_docs: num_active_docs || 0,
                num_inactive_docs: num_inactive_docs || 0,
                file_size: file_size,
                docs: docs,
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

