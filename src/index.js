import "./scss/index.scss";

/*babel test */

/*async function test1() {
  return await Promise.resolve("Async working!!! 1")
}*/

async function test2() {
  return await Promise.resolve("Async working!! 2");
}

test2().then(console.log);
console.log("Script working!");
