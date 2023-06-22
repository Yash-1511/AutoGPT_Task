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
  const batFile = path.join(__dirname, 'run_autogpt.bat');

  python = spawn(batFile, [], {
    cwd: path.join(__dirname, '..', 'autogptweb'),
    shell:true
  });

  python.stdout.on("data", function (data) {
    console.log(data.toString());
    dataToSend = dataToSend + data.toString()

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
  fs.writeFileSync("../autogptweb/ai_settings.yaml", `${yamlString}`, "utf8");
});

app.post("/api/download", (req, res) => {
  const file = `../autogptweb/auto_gpt_workspace/${req.body.filename}`;
  res.download(file); // Set disposition and send it.
});
app.get("/api/data", (req, res) => {
  res.json({ output: dataToSend })
  dataToSend = ""
})

app.get("/api/stop",(req,res)=>{
  python.kill();
  res.json({output: "python script stopped"})
})

// kill python process on exit
process.on("exit", () => {
  python.kill()
  console.log("Python script killed")
})
app.listen(8888, () => {
  console.log("server listening at port 8888");
});
