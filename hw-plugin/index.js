// Custom plugin
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (stats) => {
      console.log("\n------------\nHello World!\n-----------\n");
    });
  }
}

module.exports = HelloWorldPlugin;
