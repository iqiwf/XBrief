export function fail(status, message) {
  const err = new Error(message);
  err.status = status;
  err.expose = true;
  return err;
}
