let output = {};
let app;
let components = {};
const secureKey = 'ee9d2d324e261c42e5372a20b19c85b5ac7db7908dce804c59c911c2ae6624e1';
$(function () {
    let session_id;
    session_id = localStorage.getItem('session_id');
    let api_token;
    api_token = localStorage.getItem('api_token');
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
                        components:components,
                        data() {
                            return {
                                output: output
                            }
                        },
                        mounted() {
                            if (typeof (oValidation) != 'undefined') {
                                oValidation = new Validation();
                            }
                        }
                    }).mount('#app');
                } else {
                    h_alert('#app element가 없습니다');
                }
                console.log(output.session.id);
            }
        }
    });
});