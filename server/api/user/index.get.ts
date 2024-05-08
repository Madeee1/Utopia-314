export default defineEventHandler(async (event) => {
  // get query
  const query = getQuery(event).userId;

  // Connect to the database
  try {
    const user = await userSchema.findOne({ id: query });
    return {
      ok: true,
      value: user,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
});
