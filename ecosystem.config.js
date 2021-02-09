module.exports = {
  apps: [{
    name: 'm2',
    script: './Milestones/M2/Prototype/index.js'
  }],
  deploy: {
    production: {
      user: 'team06',
      host: 'ec2-54-151-120-211.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/key2.pem',
      ref: 'origin/testing',
      repo: 'git@github.com:CSC-648-SFSU/csc-648-848-04-jose-fall-2020-06.git',
      path: '/home/team06/m2',
      'post-deploy': 'npm install && pm2 startOrRestart ./Milestones/M2/Prototype/ecosystem.config.js'
    }
  }
};
