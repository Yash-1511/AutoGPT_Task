const { spawn } = require("child_process");
const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path")
const app = express();
const cors = require("cors")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
let python = null;
let dataToSend = "";

app.get("/api/start", (_, res) => {
//   const activateCommand = process.platform === 'win32' ? 'activate autogpt && ' : 'source activate autogpt && ';
//   python = spawn(activateCommand + 'python', ['-m', 'autogpt'], {
//     cwd: path.join(__dirname, '..', 'autogpt'),
//     shell: true,
//   });
  const batFile = path.join(__dirname, 'run_autogpt.bat');

  python = spawn(batFile, [], {
    cwd: path.join(__dirname, '..', 'autogpt'),
    shell: true
  });
  python.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("error", (err) => {
    console.error(`Failed to start python process: ${err}`);
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    if (code === 0) {
      console.log("Python script executed successfully");
    } else {
      console.log("Python script execution failed");
    }
  });
  console.log("Python script started");

  res.json({ output: "Python script started" });
});

app.post("/api/init", (req, res) => {
  const yamlString = yaml.dump(req.body);
  fs.writeFileSync("../ai_settings.yaml", `${yamlString}`, "utf8");
});


app.listen(8888, () => {
  console.log("server listening at port 8888");
});
