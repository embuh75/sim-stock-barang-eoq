import { auth } from "../../plugins/auth";
import { isAPIError } from "better-auth/api";
import { uploadsFile } from "../../utils/upload";
import { deleteFile } from "../../utils/delete-file";
import { env } from "../../utils/env";

export const createUser = async (body: any, headers: any) => {
  const folder = "avatar";
  let fileName: string | undefined;

  try {
    if (body.image) {
      fileName = (await uploadsFile(folder, "avatar", body.image)).fileName;
    }

    const data = await auth.api.createUser({
      body: {
        email: body.email,
        name: body.name,
        password: body.password,
        role: body.role,
        data: {
          username: body.username,
          image: fileName,
        },
      },
      headers,
    });

    return data;
  } catch (err) {
    // hapus file baru karena gagal
    if (fileName) await deleteFile(folder, fileName);

    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const listUser = async (query: any, headers: any) => {
  try {
    const getUsers = await auth.api.listUsers({
      query: {
        searchValue: query.name,
        searchField: "name",
        searchOperator: "contains",
        limit: query.limit,
        offset: (query.page - 1) * query.limit,
        sortBy: query.sortBy,
        sortDirection: query.sortOrder,
        filterField: "role",
        filterValue: query.roleFilter,
        filterOperator: "eq",
      },
      headers,
    });
    const avatarUrl = `${env.APP_URL}/file/avatar`;

    const users = {
      ...getUsers,
      users: getUsers.users.map((user) => ({
        ...user,
        image: `${avatarUrl}/${user.image}`,
      })),
    };

    return users;
  } catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const getUser = async (params: any, headers: any) => {
  try {
    const data = await auth.api.getUser({
      query: {
        id: params.id,
      },
      headers,
    });

    const avatarUrl = `${env.APP_URL}/file/avatar`;

    return { ...data, image: `${avatarUrl}/${data.image}` };
  } catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const updateUser = async (params: any, headers: any, body: any) => {
  const user = await auth.api.getUser({ query: { id: params.id }, headers });
  const oldFileName = user?.image;
  const folder = "avatar";
  let newFileName: string | undefined;

  try {
    if (body.newPassword) {
      await auth.api.setUserPassword({
        body: { userId: params.id, newPassword: body.newPassword },
        headers,
      });
    }

    if (body.role) {
      await auth.api.setRole({
        body: { userId: params.id, role: body.role },
        headers,
      });
    }

    if (body.image) {
      newFileName = (await uploadsFile(folder, "avatar", body.image)).fileName;
    }

    await auth.api.adminUpdateUser({
      body: {
        userId: params.id,
        data: {
          name: body.name,
          email: body.email,
          username: body.username,
          image: newFileName,
        },
      },
      headers,
    });
  } catch (err) {
    // hapus file baru karena gagal
    if (newFileName) await deleteFile(folder, newFileName);

    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }

  // hapus file lama karena berhasil
  if (newFileName) await deleteFile(folder, oldFileName);

  return {
    success: true,
    message: "Data user berhasil diperbarui!.",
  };
};
