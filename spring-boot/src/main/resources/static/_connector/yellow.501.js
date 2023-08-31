let output;
let components = {};
$(function () {
    let session_id;
    session_id = localStorage.getItem('session_id');
    let api_token;
    api_token = localStorage.getItem('api_token');
    if (session_id) {
        requestData.session_id = session_id;
    }
    if (api_token) {
        requestData.api_token = api_token;
    }
    $.ajax({
        url: "/request.js",
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
                            $('#app').show();
                            // init();
                        }
                    }).mount('#app');
                } else {
                    alert('#app element가 없습니다');
                }
            }
        }
    });
});