let output = {};
let app;
const secureKey = '1e3eccc4914f2b1cb1ae0459413e7b0fc51f4ac2d52f6512a9d4e91e335fee6e';
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
    console.log(api_token);
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
                output.icon = jsonForumIcon;

                let eleScript;
                if (output.env.js instanceof Array) {
                    for (let intKey in output.env.js) {
                        eleScript = document.createElement('script');
                        eleScript.setAttribute('src', output.env.js[intKey]);
                        document.head.appendChild(eleScript);
                    }
                } else if (output.env.js instanceof Object) {
                    for (let key in output.env.js) {
                        eleScript = document.createElement('script');
                        eleScript.setAttribute('src', output.env.js[key]);
                        document.head.appendChild(eleScript);
                    }
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
                            init();
                        }
                    }).mount('#app');
                } else {
                    alert('#app element가 없습니다');
                }
            }
        }
    });
});