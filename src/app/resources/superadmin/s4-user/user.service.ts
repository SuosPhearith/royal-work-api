// =========================================================================>> Core Library
import { Injectable } from '@nestjs/common';
// =========================================================================>> Third Party Library
// =========================================================================>> Custom Library

@Injectable()
export class UserService {

    async read(): Promise<any> {
        try {

  
            return{

            }
        } catch (error) {
            throw new Error();
        }

    }

  
}

