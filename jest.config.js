/*moduleDirectorires: an array of directoy names  to be searched recursively up from the requiring module's location*/

module.exports = {
    moduleDirectories: ["node_modules", "bus"],
    verbose:true,
    setupFiles: ['./jest.setup.js']
}