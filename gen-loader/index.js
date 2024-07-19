// Creates a custom loader: creates an error if it console.logs
module.exports = function (source) {
    if (this.mode === "production" && source.indexOf("console.log")) {
        this.emitError("console.log was discovered in the code!")
    }
    return source;
}