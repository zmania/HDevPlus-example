import { ref } from 'vue';
import { useRoute } from 'vue-router';


export const output = ref(null);
export const avatars = ref([]);

for (let intAvatarNum = 1; intAvatarNum < 15; intAvatarNum++) {
    avatars.value.push(`/_images/face_icons_circle/face_icons-circle-${String(intAvatarNum).padStart(2, '0')}.svg`);
}
export const env = {
    "search_type":"",
    "uri":"",
    "doc_view_id":[
        ['DOCS_INSTALL', 'DOCS_DATA_STRUCTURE', 'DOCS_BUILD_PAGE', 'DOCS_VALIDATION'],
        ['DOCS_SIGN_UP', 'DOCS_SIGN_IN', 'DOCS_SIGN_OUT', 'DOCS_VIEW_PROFILE','DOCS_USER_AUTH','DOCS_CHANGE_PASSWORD', 'DOCS_MODIFY_PROFILE','DOCS_FIND_PASSWORD'],
        ['DOCS_ADD_POST', 'DOCS_POST_LIST', 'DOCS_VIEW_POST', 'DOCS_MODIFY_POST', 'DOCS_DELETE_POST'],
        ['DOCS_WRITE_WEB_FORM'],
        ['DOCS_BUILD_WIDGET']
    ],
    "avatars":avatars,
    "icons":{
        "forum_101":"/_images/icons/default/FilledGradient/93_Power_Button.svg",
        "forum_102":"/_images/icons/default/FilledGradient/93_Power_Button.svg",
        "forum_103":"/_images/icons/default/FilledGradient/93_Power_Button.svg",
        "forum_201":"/_images/icons/default/FilledGradient/32_User.svg",
        "forum_202":"/_images/icons/default/FilledGradient/32_User.svg",
        "forum_203":"/_images/icons/default/FilledGradient/32_User.svg",
        "forum_204":"/_images/icons/default/FilledGradient/32_User.svg",
        "forum_205":"/_images/icons/default/FilledGradient/32_User.svg",
        "forum_301":"/_images/icons/default/FilledGradient/63_Clipboard.svg",
        "forum_302":"/_images/icons/default/FilledGradient/63_Clipboard.svg",
        "forum_303":"/_images/icons/default/FilledGradient/63_Clipboard.svg",
        "forum_304":"/_images/icons/default/FilledGradient/63_Clipboard.svg",
        "forum_305":"/_images/icons/default/FilledGradient/63_Clipboard.svg",
        "forum_401":"/_images/icons/default/FilledGradient/15_File.svg",
        "forum_503":"/_images/icons/default/FilledGradient/42_Pencil.svg",
        "forum_504":"/_images/icons/default/FilledGradient/15_File.svg",
        "forum_505":"/_images/icons/default/FilledGradient/71_Browser.svg",
        "forum_501":"/_images/icons/default/FilledGradient/99_Idea.svg"
    }

}
export function init() {
    const router = useRouter();
    const route = useRoute();
    env.uri = route.path; // 현재 경로 설정
    env.host = "www.hdevplus.com"; // 현재 호스트
    env.protocol = "https"; // 현재 프로토콜
    router.afterEach((to, from) => {
        env.referrer = from.fullPath;
    });
    // console.log(route);
    return {
        router,
        route,
        env
    };
}

export const eventLibrary = {
    openSearchUI()
    {
        $('#div_search').slideToggle(function () {
            if ($('#div_search').is(':visible')) {
                $('#div_search #search_keyword').focus();
            }
        });
    },
    toggleTranslate()
    {
        $('#widget_translate_lang .off,#widget_translate_lang .on').toggle();
    }
}
export const commonFunction = {
    formatDate(dateString) {
        let date = new Date(dateString);
        let month = date.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더해줍니다.
        let day = date.getDate();

        // 월과 일이 10 미만이면 앞에 0을 붙여서 출력합니다.
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${month}.${day}`;
    }
}