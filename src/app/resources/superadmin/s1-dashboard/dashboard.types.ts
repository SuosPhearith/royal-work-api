import { DocsResponse } from "../s2-docs/docs.types";


export interface DashboardResponse{
    total_docs?: number;
    total_orgs?: number;
    num_active_docs?: number;
    num_inactive_docs?: number;
    file_size?: FileSizeRespone[];
    docs?: DocsResponse[];
}

export interface FileSizeRespone{
    totalSize: string;
    totalPNGSize: string;
    totalPDFSize: string;
    totalDOCXSize: string;
    totalXLSXSize: string;
    totalOtherSize: string;
    pngPercentage: string;
    pdfPercentage: string;
    docxPercentage: string;
    xlsxPercentage: string;
    otherPercentage: string;
}