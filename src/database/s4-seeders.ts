//==============================================================================================>> Core library
import * as readlineSync from 'readline-sync';
import { Sequelize } from 'sequelize-typescript';
import sequelizeConfig from '../config/sequelize.config';
//==============================================================================================>> Third Party
import 'colors';
import models from '../models/models';
//=====================================================================
import { UserSeeder } from './seeders/user/user.seeder';
import { OrgsSeeder } from './seeders/orgs/orgs.seeder';
import { FileSeeder } from './seeders/file/file.seeder';
import { DocsSeeder } from './seeders/docs/docs.seeder';
import { DocsTypeSeeder } from './seeders/docs/docs_type.seeder';
import { LanguageSeeder } from './seeders/language/language.seeder';
import { UIMinistrySeeder } from './seeders/ui_ministry/ui_ministry.seeder';
import { UITextSeeder } from './seeders/ui_text/ui_text.seeder';
import { LogoSeeder } from './seeders/logo/logo.seeder';
import { DocsListUiSeeder } from './seeders/docs/docs_list_ui.seeder';

async function seeds() {
  const sequelize = new Sequelize(sequelizeConfig);

  // Initialize models from each group
  sequelize.addModels(models);

  try {
    // Check if there are any existing tables in the database
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    if (tableNames.length > 0) {
      // Ask the user for confirmation
      const message =
        'This will drop and seed again. Are you sure you want to proceed?'
          .yellow;
      const confirmation = readlineSync.keyInYNStrict(message);

      if (!confirmation) {
        console.log('\nSeeders has been cancelled.'.cyan);
        process.exit(0);
      }
    }
    // drop all existing UserGroup in the database and recreate it again.
    await sequelize.sync({ force: true });

    /** @seedLanguage ======================================= */ ///////////////////////////////
    const languageSeeder = new LanguageSeeder();
    await languageSeeder.seed();

    /** @seedUser ======================================= */ ///////////////////////////////
    const userSeeder = new UserSeeder();
    await userSeeder.seed();

    /** @seedOrgs ======================================= */ ///////////////////////////////
    const orgsSeeder = new OrgsSeeder();
    await orgsSeeder.seed();

    /** @seedFile ======================================= */ ///////////////////////////////
    const fileSeeder = new FileSeeder();
    await fileSeeder.seed();

    /** @seedDocsType ======================================= */ ///////////////////////////////
    const docsTypeSeeder = new DocsTypeSeeder();
    await docsTypeSeeder.seed();

    /** @seedDocs ======================================= */ ///////////////////////////////
    const docsSeeder = new DocsSeeder();
    await docsSeeder.seed();

    /** @seedUI ======================================= */ ///////////////////////////////
    const ui_ministrySeeder = new UIMinistrySeeder();
    await ui_ministrySeeder.seed();
    const ui_textSeeder = new UITextSeeder();
    await ui_textSeeder.seed();
    const ui_logoSeeder = new LogoSeeder();
    await ui_logoSeeder.seed();
    const ui_DocsListUi = new DocsListUiSeeder();
    await ui_DocsListUi.seed();

    // console.log("\u001b[1;32m ============================================================================ ");
    // console.log("\u001b[1;32m =                                                                          = ");
    // console.log("\u001b[1;32m =                      Successfully Good Luck !!!                          = ");
    // console.log("\u001b[1;32m =                                                                          = ");
    // console.log("\u001b[1;32m ============================================================================ ");
    //End of execution
    process.exit(0);
  } catch (error) {
    // Delete all if have a errors
    await sequelize.sync({ force: true });
    console.log('\x1b[31m%s\x1b[0m', error.message);
    process.exit(0);
  }
}

///////////////////////////////////////

seeds();
