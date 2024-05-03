import { secureKey, strAPIUrl } from '@/_connector/APIInfo.js';
import { axios } from '@bundled-es-modules/axios'
import { useScriptTag } from '@vueuse/core';

export const Connector = {
    aScript:['https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js','https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.min.js'],
    output:{},
    isLoading:true,
    request:(requestData,onSuccess = null, onFail = null)=>{
        console.log(typeof(requestData));
        if(typeof(requestData) == 'object') {
            requestData.secure_key = secureKey;
            let session_id = localStorage.getItem('session_id');
            let api_token = localStorage.getItem('api_token');
            if (session_id) {
                requestData.session_id = session_id;
            }
            if (secureKey) {
                requestData.secure_key = secureKey;
            }
            if (api_token) {
                requestData.api_token = api_token;
            }
            const oConnector = this;
            const finalURL = strAPIUrl.startsWith('https') ? strAPIUrl : 'https://' + strAPIUrl
            axios.post(finalURL, requestData).then(response => {
                console.log(response);
                if (response.status === 200 && response.statusText === 'OK') {
                    console.log(response.data);
                    if(response.data.redirect_url){
                        document.location.replace(response.data.redirect_url);
                    }else{
                        Connector.isLoading = false;
                    }
                    const aScript = Connector.aScript.concat(response.data.env.js);
                    // const aScript = Connector.aScript; //.concat(response.data.env.js);
                    console.log(aScript);
                    if (typeof (aScript) == 'object' && aScript.length > 0) {
                        aScript.forEach(url => {
                            useScriptTag(url, () => {
                                console.log(url + ' loaded!');
                            }, {
                                async: false,
                                defer: true
                            });
                        });
                    }
                    if (onSuccess) {
                        onSuccess(response.data);
                    }
                    let output = response.data;
                    if (output.session) {
                        let date = new Date();
                        date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
                        document.cookie = 'session_id=' + output.session.id + ';expires=' + date.toUTCString() + ';path=/';
                        document.cookie = 'api_token=' + output.session.api_token + ';expires=' + date.toUTCString() + ';path=/';
                        if (output.session.id) localStorage.setItem('session_id', output.session.id);
                        if (output.session.api_token) localStorage.setItem('api_token', output.session.api_token);
                    } else {
                        let date = new Date();
                        date.setTime(date.getTime() - 365 * 24 * 60 * 60 * 1000);
                        document.cookie = 'session_id=' + output.session.id + ';expires=' + date.toUTCString() + ';path=/';
                        document.cookie = 'api_token=' + output.session.api_token + ';expires=' + date.toUTCString() + ';path=/';
                        localStorage.removeItem('session_id');
                        localStorage.removeItem('api_token');
                    }
                } else {
                    if (onFail) {
                        onFail(response.data)
                    }
                }
                console.log('call success connector');
            })
        }
    },
    loadScript:()=>{
        console.log('script loading');
        console.log(Connector.aScript);
        Connector.aScript.forEach(function(strURL){
            console.log(strURL);
        });
        Connector.aScript.forEach(url => {
            useScriptTag(url, () => {
                console.log(url+' loaded!');
            }, {
                async: true,
                defer: true
            });
        });
    }
}