// =========================================================================>> Core Library
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// =========================================================================>> Third Party Library
import * as bodyParser from 'body-parser'; // Json Converter
import * as cors from 'cors'; // Product Origin Request
import * as expressHandlebars from 'express-handlebars';
import { join } from 'path'; //Join all arguments together and normalize the resulting path.

// =========================================================================>> Custom Library
// Module
import { AppModule } from './app.module';

// ======================================= >> Code Starts Here << ========================== //
const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    /** @EnableCORS */
    app.use(cors());

    /** @useGlobalValidationPipe */
    app.useGlobalPipes(new ValidationPipe({
        /** @noted throw filds that we don't need */
        whitelist: true,
        /** @noted allowed transform data for response */
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));

    /** Set the limit for request bodies to 50MB*/
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // Configure views directory and template engine
    app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
    const hbs = expressHandlebars.create({
        extname: '.html', // Set the extension for your handlebars files
        layoutsDir: join(__dirname, '..', 'src/views')
    });
    app.engine('html', hbs.engine);
    app.setViewEngine('html');

    // Port app running
    const port = process.env.PORT || 1000;
    await app.listen(port);
}
bootstrap();
