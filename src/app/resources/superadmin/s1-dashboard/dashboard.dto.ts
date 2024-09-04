import { DocsResponseDto } from "../s2-docs/docs.dto";

export class DashboardDto{
    total_docs: number;
    total_orgs: number;
    num_active_docs: number;
    num_inactive_docs: number;
    total_memory_size: number;
    pdf_size: number;
    image_size: number;
    word_size: number;
    excel_size: number;
    other_size: number;
    docs: DocsResponseDto[];
}