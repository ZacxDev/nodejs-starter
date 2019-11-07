exports.up = async function(knex) {
  await knex.schema.table('user', table => {
    table.string('test');
  });
};

exports.down = async function(knex) {
  await knex.schema.table('user', table => {
    table.dropColumn('test');
  });
};
