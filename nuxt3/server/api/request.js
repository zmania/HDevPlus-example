

export default defineEventHandler(async (event) => {
    // 클라이언트로부터 전달된 요청 데이터를 읽습니다.
    const config = useRuntimeConfig();
    const body = await readBody(event);
    body.secure_key = config.secureKey;
    try {
        // 외부 API의 응답을 클라이언트에 반환합니다.
        return await $fetch(config.public.apiUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        // 오류 발생 시 오류 메시지를 반환합니다.
        return {
            error: true,
            message: error.data || error.message,
        };
    }
});
