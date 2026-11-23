import { env } from "./env";

export const sessionResponse = (user: any, session: any) => {
  const avatarUrl = `${env.APP_URL}/file/avatar`;

  return { user: { ...user, image: `${avatarUrl}/${user.image}` }, session };
};
