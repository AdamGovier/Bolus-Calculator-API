import axios from "axios";

export default async (req, res) => {
    // Get uptime from Uptime Robot
    const getUptime = async () => await axios.post('https://api.uptimerobot.com/v2/getMonitors', {
        api_key: process.env.uptimeRobotApiKey,
        all_time_uptime_ratio: 1,
        response_times: 1
    });

    // Select our specific monitor. i.e. this API.
    const apiStatus = (await getUptime()).data.monitors.filter(m => m.id == process.env.uptimeRobotMonitorID)[0];

    res.status(200).json({
        all_time_uptime_ratio: apiStatus.all_time_uptime_ratio,
        average_response_time: apiStatus.average_response_time,
        processUptime: process.uptime(),
        environmentBuild: process.env.environmentBuild
    });
}