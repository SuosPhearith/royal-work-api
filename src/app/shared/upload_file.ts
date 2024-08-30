// =========================================================================>> Core Library
import { BadRequestException } from "@nestjs/common";
// =========================================================================>> Custom Library
import { FileService } from "../services/file.service";
/* ========== Define a class to handle file uploads ========== */
export class FileUploader {

    constructor(private fileService: FileService) { }

    async uploadFile(file: any): Promise<{ fileUri: string, fileCoverUri: string, extension: string }> {

        const originalExtension = file.originalname.toLowerCase().split('.').pop();

        // create own variable to store file URIs and extension file
        let fileUri = '';
        let fileCoverUri = '';
        let extension = '.pdf';

        // if file upload is PDF
        if (file.originalname.toLowerCase().endsWith('.pdf')) {

            // call function uploadPdfToImage form file service
            const pdfResult = await this.fileService.uploadPdfToImage('cover', file);
            if (pdfResult.error) {
                throw new BadRequestException('Error saving the PDF file. Please try again.');
            } else {

                // if upload is success, we will get URLs file and cover image
                fileUri = pdfResult.file.file.uri;
                fileCoverUri = pdfResult.file.picFile.uri;
            }
        } else if (originalExtension === 'png' || originalExtension === 'jpg' || originalExtension === 'svg' || originalExtension === 'jpeg') {

            // if file not PDF
            const otherFileResult = await this.fileService.uploadSingleFile('file', file);
            if (otherFileResult.error) {
                throw new BadRequestException('Error saving the file. Please try again.');
            } else {

                // if upload is success, we get url file as file upload and return extension
                fileUri = otherFileResult.file.uri;
                fileCoverUri = otherFileResult.file.uri;
                extension = `.${originalExtension}`;
            }
        }

        // return as object of File URI
        return { fileUri, fileCoverUri, extension };
    }
}
