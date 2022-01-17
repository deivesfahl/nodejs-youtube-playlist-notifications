const Mail = require('../libs/Mail');

const sendMail = async ({ from, to, subject, html }) => {
    await Mail.sendMail({
        from: `${from.name} <${from.email}>`,
        to: `${to.name} <${to.email}>`,
        subject,
        html,
    });
};

module.exports = { sendMail };
