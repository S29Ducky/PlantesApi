import fs, { cp } from "fs";

const headers =
	"-- SQLite\nCREATE TABLE IF NOT EXISTS flower (\nid\t\t\tINTEGER PRIMARY KEY AUTOINCREMENT,\nname\t\t\tVARCHAR(255) NOT NULL,\ndescription\t\t\tVARCHAR(4096) NOT NULL,\nstartBloom\t\t\tINTEGER NOT NULL,\nendBloom\t\t\tINTEGER NOT NULL,\nnectar\t\t\tINTEGER NOT NULL,\npollen\t\t\tINTEGER NOT NULL,\npropolis\t\t\tINTEGER NOT NULL,\nmelliferous\t\t\tINTEGER NOT NULL\n);\n\nINSERT INTO flower (name, description, startBloom, endBloom, nectar, pollen, propolis, melliferous) VALUES\n";

const buffer = fs.readFileSync("./data.tsv", { encoding: "utf-8" });
const lines = buffer.split("\n");

let data = headers;

for (let i = 1; i < lines.length; i++) {
	const columns = lines[i].split("\t");
	let str = `('${columns[0]}', ${columns[1]}, ${columns[2]}, ${columns[3]}, ${columns[4]}, ${columns[5]}, ${columns[6]}, '${columns[7]}')`;

	if (i < lines.length - 1) {
		str += "\n\n" ;
	}
	
	data += str;
}
data += ";";

console.log(data);

fs.writeFileSync("test.sql", data);
