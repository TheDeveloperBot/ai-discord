const request = require('request-promise-native');
const key = settings.pandora_key || process.env.PANDORA_KEY;
let sessionid = false;
const bot_url = settings.bot_url || "https://playground.pandorabots.com/talk/meldsza/cleverbot?user_key=";
module.exports = async function (question, client_name, reset) {
    let formdata = {
        input: question
        //client_name: client_name
    };
    if (sessionid) {
        formdata.sessionid = sessionid
        formdata.recent = true;
    }
    if (reset)
        formdata = { reset: true };
    let res = await request({
        method: "POST",
        uri: bot_url + key,
        form: formdata
    })
    console.log(res);
    res = JSON.parse(res);
    sessionid = res.sessionid;
    if (res.status === "ok")
        return res.responses[0];
    else
        return "Sorry, i could not understand that";
}