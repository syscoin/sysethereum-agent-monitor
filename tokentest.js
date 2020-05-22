const Jtr = require("@ptkdev/json-token-replace");
const jtr = new Jtr();


let s1 = "hello {{bob}}";
let b = { bob: "DAN"};

let json_output = jtr.replace(b, s1);

console.log(json_output);
