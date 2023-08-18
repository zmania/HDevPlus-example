components.gnbComp = {
    props: ['output'],
    template: `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <a class="navbar-brand me-5 text-black" href="../index.html"><img src="https://dev.hanbnc.com/_images/common/hbnc-cube.png" class="mb-1 me-3" style="width: 2rem;"><span class="font-roboto" style="font-size: 1.2rem; font-weight: 900;">H</span><small style="font-size: 0.8rem; font-weight: 400; letter-spacing: -1px;"> : </small><small class="font-roboto" style="font-size: 0.8rem; font-weight: 400;">DEV+</small></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../main/index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../post/list.html">포럼</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../web_form/index.html">웹폼</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
            <form id="frm_post_search" class="d-flex mx-1 " method="get" action="../post/list.html">
                <input type="hidden" id="page" name="page" value="1">
                <input class="form-control me-2" type="search" name="search_keyword" :value="output.search_keyword" id="search_keyword" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <a href="../member/mypage.html" v-if="output.user.auth_flg" class="mx-1 btn btn-outline-dark">마이페이지</a>
            <button v-if="output.user.auth_flg" class="mx-1 btn btn-outline-dark h-btn-sign-out" data-return-url="../main/index.html" type="button">로그아웃</button>
            <a href="../member/login.html" v-if="!output.user.auth_flg" class="mx-1 btn btn-outline-dark">로그인</a>
            <a href="../member/join.html" v-if="!output.user.auth_flg" class="mx-1 btn btn-outline-dark">회원가입</a>
        </div>
    </div>
</nav>
    `
}