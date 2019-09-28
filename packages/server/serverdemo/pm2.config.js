module.exports = {
  apps: [
    {
      name: "fe-static",
      script: "./app.js",
      exec_mode: "cluster",
      instances: 2
    }
  ]
}
