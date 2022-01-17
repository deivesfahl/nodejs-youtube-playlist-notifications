const currentDateTimeWithLocalTimezone = () => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - timezoneOffset).toISOString().slice(0, -1);

    return `${localISOTime}Z`;
};

module.exports = { currentDateTimeWithLocalTimezone };
