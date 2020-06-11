const queue = require('../config/kue');
const commentMailer = require('../mailers/comments_mailer');
queue.process('emails', function(job, done) {
    console.log("Email workers is processing a job", job.data);
    commentMailer.newcomment(job.data);
    done();
})