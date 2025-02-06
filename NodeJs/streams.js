const fs = require('fs');

const readStream = fs.createReadStream("./docs/blog3.txt", {encoding: "utf8"}); // either way we would be required to log chunk.toString();
const writeStream = fs.createWriteStream("./docs/blog3copy.txt");

// readStream.on ("data", (chunk) => {
//     console.log("-------- NEW CHUNK --------");
//     writeStream.write("\n-------- NEW CHUNK --------\n");
//     writeStream.write(chunk);
//     console.log(chunk);
// })

// Piping

readStream.pipe(writeStream);