const { MikroORM } = require('@mikro-orm/core');

async function nukeDatabase() {
    const orm = await MikroORM.init(); // Loads configuration from mikro-orm.config.js by default

    // Get a list of all tables from the current database
    const generator = orm.getSchemaGenerator();
    const dropQueries = await generator.getDropSchemaSQL();

    // Drop all tables
    await generator.dropSchema();

    // Recreate the tables (optional)
    await generator.createSchema();

    await orm.close(true);

    console.log('Database nuked successfully.');
}

nukeDatabase().catch(error => {
    console.error('Error nuking the database:', error);
});
