/* Global Error Handling Middleware */

//Express automatically forwards errors here when `next(err)` is called.
export function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  // Send a generic error message to the client
  res.status(500).json({ error: "Internal server error" });
}
