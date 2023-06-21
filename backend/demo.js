const path = require("path")
const { spawn } =require("child_process")
const activateCommand = process.platform === 'win32' ? 'activate autogpt && ' : 'source activate myenv && ';

// const autogptProcess = spawn(activateCommand + 'python', ['-m', 'autogpt'], {
//   cwd: path.join(__dirname, '..', 'autogpt'),
//   stdio: 'inherit',
//   shell: true
// });

const batFile = path.join(__dirname, 'run_gpt.bat');

python = spawn(batFile, [], {
  cwd: path.join(__dirname, '..', 'autogpt'),
  shell: true
  
});
console.log(python)

// autogptProcess.on('exit', (code, signal) => {
//     console.log(`autogpt script exited with code ${code} and signal ${signal}`);
//   });