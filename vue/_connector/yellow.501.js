let output = {};
let app;
const secureKey = '385533ef360e89d7c5c898b00963c1d5a83b426bb7a48da52c37fe1410329bb1';
$(function () {
    let session_id;
    session_id = localStorage.getItem('session_id');
    if(!session_id) {
        session_id = document.cookie.match('(^|;) ?session_id=([^;]*)(;|$)');
        session_id = session_id ? session_id[2] : null;
    }
    let api_token;
    api_token = localStorage.getItem('api_token');
    if(!api_token) {
        api_token = document.cookie.match('(^|;) ?api_token=([^;]*)(;|$)');
        api_token = api_token ? api_token[2] : null;
    }
    if (session_id) {
        requestData.session_id = session_id;
    }
    if (secureKey) {
        requestData.secure_key = secureKey;
    }
    if (api_token) {
        requestData.api_token = api_token;
    }
    $.ajax({
        url: "https://api.hanbnc.com/request.js",
        crossDomain: true,
        dataType: 'json',
        type: 'post',
        data: requestData,
        success: function (jsonResult) {
            output = jsonResult;
            let boolA = true;
            if(output.redirect_url){
                document.location.href = output.redirect_url;
            }else{
                let eleScript;
                if (Array.isArray(output.env.js)) {
                    for (let intKey in output.env.js) {
                        eleScript = document.createElement('script');
                        eleScript.setAttribute('src', output.env.js[intKey]);
                        document.head.appendChild(eleScript)
                    }
                } else {
                    eleScript = document.createElement('script');
                    eleScript.setAttribute('src', output.env.js);
                    document.head.appendChild(eleScript)
                }

                if ($('#app').length > 0) {
                    const {createApp} = Vue
                    app = createApp({
                        data() {
                            return {
                                output: output
                            }
                        },
                        mounted() {
                            if (typeof (oValidation) != 'undefined') {
                                oValidation = new Validation();
                            }
                            $('#app').show();
                        }
                    }).mount('#app');
                } else {
                    alert('#app element가 없습니다');
                }
            }
        }
    });
});