interface User {
  fullName: string;
  emailAddress: string;
  uid: string;
  id: number;
}
interface Session {
  user: User;
  userId: number;
}
interface Context {
  session: Session;
  utcOffset: string;
}
