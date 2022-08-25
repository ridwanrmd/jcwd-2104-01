module.exports = {
  apps: [
    {
      name: 'JCWD-2104-01-BE', // Format JCWD-{batchcode}-{groupnumber}
      script: './packages/server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8401, //format groupnumber and batch, ex: 8401
      },
      time: true,
    },
  ],
};
