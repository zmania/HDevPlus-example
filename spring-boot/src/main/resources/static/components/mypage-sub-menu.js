components.mypageSubMenu = {
    props: ['output'],
    template: `
<div class="position-relative border-top border-bottom">
    <ul class="nav nav-underline">
        <li class="nav-item">
            <a href="/member/mypage.html" class="pe-4 py-3 nav-link">Activity </a>
        </li>
        <li class="nav-item">
            <a href="/member/profile.html" class="pe-4 py-3 nav-link active">Profile </a>
        </li>
        <li class="nav-item">
            <a href="/member/post.html" class="pe-4 py-3 nav-link">My Post </a>
        </li>
    </ul>
    <div class="position-absolute end-0 top-0 mt-4">
        <a href="#" class="h-btn-sign-out smaller" onclick="return(false);">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out </a>
    </div>
</div>
`
}