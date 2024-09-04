// =========================================================================>> Core Library
import { Injectable } from '@nestjs/common';
import { DashboardDto } from './dashboard.dto';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library

@Injectable()
export class DashboardService {

    async read(): Promise<DashboardDto> {
        try {

  
            return{
                total_docs: 0,
                total_orgs: 0,
                num_active_docs: 0,
                num_inactive_docs: 0,
                total_memory_size: 0,
                pdf_size: 0,
                image_size: 0,
                word_size: 0,
                excel_size: 0,
                other_size: 0,
                docs: [],
            }
        } catch (error) {
            throw new Error();
        }

    }

  
}

