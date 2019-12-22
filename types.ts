interface Session {
  userId: number;
}
interface ApolloContext {
  session: Session;
  clients: object;
  knex: Function;
}
