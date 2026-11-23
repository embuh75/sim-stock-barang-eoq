import { auth } from "../../plugins/auth";
import { APIError, isAPIError } from "better-auth/api";
import { uploadsFile } from "../../utils/upload";
import { deleteFile } from "../../utils/delete-file";

export const signInEmail = async (body: any) => {
  try {
    const data = await auth.api.signInEmail({
      body: {
        email: body.email,
        password: body.password,
        rememberMe: body.rememberMe ? body.rememberMe : undefined,
      },
      asResponse: true,
    });

    return data;
  } 
  catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const signInUsername = async (body: any) => {
  try {
    const data = await auth.api.signInUsername({
      body: {
        username: body.username,
        password: body.password,
        rememberMe: body.rememberMe ? body.rememberMe : undefined,
      },
      asResponse: true,
    });

    return data;
  } 
  catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const updateUser = async (body: any, headers: any) => {
  const getUser = await auth.api.getSession({ headers });
  if (!getUser)
    throw new APIError("NOT_FOUND", {
      code: "401",
      message: "Anda Belum Login!.",
    });
  if (body.password && !body.currentPassword)
    throw new APIError("BAD_REQUEST", {
      code: "422",
      message: "Password lama wajib diisi!.",
    });

  const oldFileName = getUser.user.image;
  let newFileName: string | undefined;

  try {
    if (body.image) {
      newFileName = (await uploadsFile("avatar", "avatar", body.image))
        .fileName;
    }

    if (body.password && body.currentPassword) {
      await auth.api.changePassword({
        body: {
          newPassword: body.password,
          currentPassword: body.currentPassword,
          revokeOtherSessions: body.logoutAll ?? false,
        },
        headers,
      });
    }

    if (body.email && body.email !== getUser.user.email) {
      await auth.api.changeEmail({ body: { newEmail: body.email }, headers });
    }

    await auth.api.updateUser({
      body: {
        name: body.name,
        username: body.username,
        image: newFileName,
      },
      headers,
    });
  } catch (err) {
    if (newFileName) await deleteFile("avatar", newFileName);

    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }

  if (newFileName) await deleteFile("avatar", oldFileName);

  return { success: true, message: "Data user berhasil diperbarui" };
};

export const getMe = async (headers: any) => {
  try {
    const data = await auth.api.getSession({ headers });

    return data;
  } 
  catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }
};

export const signOut = async (headers: any) => {
  try {
    await auth.api.signOut({
      headers,
    });
  } 
  catch (err) {
    if (isAPIError(err)) {
      return { error: err?.message, status: err.status };
    }
  }

  return {success: true, message: "Logout Berhasil!."}
};
