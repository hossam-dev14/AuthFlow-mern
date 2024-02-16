
// Error Handling function
export function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      // JWT authentication error
      return res.status(401).json({message: "This data is not authorized!"});
    }
  
    if (err.name === "ValidationError") {
      // Validation error
      return res.status(401).json({message: err});
    }
  
    // Default to 500 server
    return res.status(500).json(err);
}
  
