<script setup>

import {ref} from "vue";
import navComp from '@/components/nav.vue'
const output = ref(null)
const {Connector} = defineProps({
  Connector: {
    type: Object,
    default: {}
  }
});
const requestData = {'dataID': 'GET_POST', 'page_link_url':'view.html?post_key='+new URLSearchParams(window.location.search).get('post_key'),'search_keyword': new URLSearchParams(window.location.search).get('search_keyword'), 'post_key': new URLSearchParams(window.location.search).get('post_key')};

Connector.request(requestData, (data) => {
  output.value = data; // 성공 시 데이터 저장
}, (error) => {
  console.error('Request failed:', error); // 실패 시 에러 로깅
});
</script>

<template>
  <div v-if="output" class="container">
    <navComp :output="output"/>
    <main>
      <div class="row g-5">
        <div class="col-12">
          <div class="text-center">
            <h2 class="mt-5 mb-3">게시물 상세</h2>
          </div>


          <div id="post" :data-post-key="output.post[0].post_key" class="me-3">
            <div class="py-3">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-content-between align-items-center py-3 border-bottom">
                    <div>
                      <small class="ms-1 fw-bold">{{output.post[0].bbs_name}}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center" v-if="output.user.auth_flg && output.post[0].member_seq == output.user.seq">
                      <a :href="'./modify.html?post_key='+output.post[0].post_key" class="mx-1 btn btn-dark d-flex justify-content-between align-items-center lh-1"><small class="smaller d-none d-md-block">수정</small></a>
                      <a href="#" data-return-url="./list.html" :data-post-key="output.post[0].post_key" class="h-btn-delete mx-1 btn btn-dark d-flex justify-content-between align-items-center lh-1"><small class="smaller d-none d-md-block">삭제</small></a>
                    </div>
                  </div>
                  <h1 class="fs-3 mt-4 mb-4" style="line-height: 1.5;">{{output.post[0].subject}}</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-start">
                  <div class="d-flex justify-content-start align-items-center" v-if="output.post[0].avatar_url">
                    {{output.post[0].create_date_type_ymhi}} by
                    <div class="mx-2">
                      {{ output.post[0].avatar_url }}
                      <img :src="output.post[0].avatar_url" style="max-width:1.5rem;"/>
                    </div>
                    {{output.post[0].reg_name}}
                  </div>
                  <small class="ms-2 d-block text-nowrap crop-text-1 w-100" v-else>
                    {{output.post[0].create_date_type_ymhi}} by
                    <i class="ms-2 fas fa-user-circle"></i>
                    {{output.post[0].reg_name}}
                  </small>
                </div>
              </div>
            </div>
            <div class="px-2">
              <div class="row">
                <div class="col-12">
                  <div class="my-4"><p class="text-justify" v-html="output.post[0].contents[0].content"/></div>
                  <div class="d-flex align-items-center justify-content-start my-2">
                                        <span v-for="tags in output.post[0].tags" class="badge bg-white border me-1 fw-normal text-hbnc-secondary me-2 px-3 py-2">
                                            {{tags.tag}}
                                        </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="section_comment" class="hash-link">
            <div class="comment mt-5 me-3">

              <form id="frm_comment" class="my-4">
                <div class="d-flex justify-content-between align-items-baseline"><h4>댓글</h4><small>댓글 <span class="comment-count">{{output.post[0].comment_count.toLocaleString()}}</span>개</small></div>
                <div class="py-4 border-0 border-top border-bottom">
                  <div class="input-group mb-0" v-if="output.user.auth_flg">
                    <label for="name" class="form-label visually-hidden">댓글</label>
                    <textarea id="comment" type="text" rows="1" class="form-control" name="comment" placeholder="댓글을 입력하세요" style="height: 40.8px;"></textarea>
                    <button class="btn btn-dark" type="button" id="btn_save_comment">저장</button>
                  </div>
                  <div class="input-group mb-0" v-else>
                    <label for="name" class="form-label visually-hidden">댓글</label>
                    <div class="form-control" style="height: 40.8px;">로그인 후 이용하실 수 있습니다.</div>
                    <a class="btn border-hbnc-primary bg-hanbnc-primary-3 border border-3 rounded-0" href="../member/login.html">로그인</a>
                  </div>
                </div>
              </form>
            </div>


            <div class="me-3">

              <div>
                <div class="pb-4 order-0">
                  <div class="comment-list">
                    <div class="h-div-comment" :data-comment-key="comment.comment_key" v-for="(comment, index) in output.post[0].comment_list" :key="comment.comment_key">
                      <div class="border-bottom px-1 py-3 position-relative post-comment-item">
                        <div class="d-flex justify-content-between align-items-baseline">
                          <div>
                            <strong class="me-1">{{comment.name}}</strong>
                          </div>
                          <small class="comment-date font-roboto">{{comment.create_date}}</small>
                        </div>
                        <div class="comment-body">
                          <p class="my-2 py-3 mb-0 rounded-2" v-html="comment.comment.split('\n').join('<br>')"></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <a href="#" class="h-btn-show-reply-comment" v-if="comment.reply_comment.length>0"><small>답글 {{comment.reply_comment_cnt.toLocaleString()}}개 보기</small></a>
                          <span v-else>&nbsp;</span>
                          <div class="d-flex justify-content-between align-items-center">
                            <a v-if="output.user.auth_flg && comment.member_seq == output.user.seq" href="#" class="h-btn-reply-modify btn btn-outline-dark btn-sm ms-2 my-2 small">수정</a>
                            <a v-if="output.user.auth_flg && comment.member_seq == output.user.seq" href="#" class="h-btn-reply-delete btn btn-outline-dark btn-sm ms-2 my-2 small">삭제</a>
                            <a href="#" class="h-btn-reply-comment btn btn-outline-dark btn-sm ms-2 my-2 small">답글</a>
                          </div>
                        </div>
                        <form class="my-3 h-form-reply-comment" style="display:none;">
                          <input type="hidden" name="parent_comment_key" :value="comment.comment_key"/>
                          <div class="mb-0 mt-2">
                            <textarea type="text" rows="1" class="form-control comment-textarea" name="comment" placeholder="답글을 입력하세요" style="height: 42px;"></textarea>
                          </div>
                          <div class="mb-0 mt-2 text-center">
                            <button class="h-btn-submit-reply mx-1 btn btn-outline-dark btn-sm ms-2 my-2 small" type="button">저장</button>
                            <button class="h-btn-cancel-reply mx-1 btn btn-outline-dark btn-sm ms-2 my-2 small" type="button">취소</button>
                          </div>
                        </form>
                        <div class="h-div-reply-comment-list px-2 ms-4 py-3 mt-3" style="display:none;">
                          <div class="h-div-reply-comment" :data-comment-key="reply_comment.comment_key" v-for="reply_comment in comment.reply_comment" :key="reply_comment.comment_key">
                            <div class="py-3 border-top position-relative">
                              <div class="comment-body">
                                <p class="mb-1 small">
                                  <span class="mb-2 me-2 text-primary">@{{reply_comment.to_name}}</span>
                                  <span v-html="reply_comment.comment.split('\n').join('<br>')"></span>
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                  <div>
                                    <strong class="me-2">{{reply_comment.name}}</strong>
                                    <small class="comment-date font-roboto">{{reply_comment.create_date}}</small>
                                  </div>
                                  <div>
                                    <a v-if="output.user.auth_flg && reply_comment.member_seq == output.user.seq" href="#" class="h-btn-reply-modify d-inline-block btn btn-outline-dark btn-sm ms-2 my-2 small"><i class="fas fa-user-edit"></i> 수정</a>
                                    <a v-if="output.user.auth_flg && reply_comment.member_seq == output.user.seq" href="#" class="h-btn-reply-delete d-inline-block btn btn-outline-dark btn-sm ms-2 my-2 small"><i class="fas fa-trash-alt"></i> 삭제</a>
                                    <a href="#" class="h-btn-reply-comment btn-outline-secondary d-inline-block btn btn-outline-dark btn-sm ms-2 my-2 small"><i class="far fa-comment"></i> 답글</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <form class="my-3 h-form-reply-comment" style="display:none;">
                              <input type="hidden" name="parent_comment_key" :value="reply_comment.comment_key"/>
                              <div class="mb-0 mt-2">
                                <textarea type="text" rows="1" class="form-control comment-textarea" name="comment" placeholder="답글을 입력하세요" style="height: 42px;"></textarea>
                              </div>
                              <div class="mb-0 mt-2 text-center">
                                <button class="h-btn-submit-reply mx-1 btn btn-outline-dark btn-sm ms-2 my-2 small" type="button">저장</button>
                                <button class="h-btn-cancel-reply mx-1 btn btn-outline-dark btn-sm ms-2 my-2 small" type="button">취소</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="mt-4">
                <nav>
                  <ul class="pagination justify-content-center mb-0">
                    <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.first.link" v-bind:data-page="output.pagination.paging.first.number"><i class="fas fa-angle-double-left"></i></a></li>
                    <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.prev.link" v-bind:data-page="output.pagination.paging.prev.number"><i class="fas fa-angle-left"></i></a></li>
                    <li class="page-item h-page-numbers" v-if="output.pagination.paging.page" v-for="page in output.pagination.paging.page"><a :class="{'page-link':true, 'active': output.pagination.page == page.number }" v-bind:href="page.link" v-bind:data-page="page.number">{{page.number}}</a></li>
                    <li class="page-item" v-else><a class="border-0 page-link">1</a></li>
                    <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.next.link" v-bind:data-page="output.pagination.paging.next.number"><i class="fas fa-angle-right"></i></a></li>
                    <li class="page-item"><a class="page-link border-0 bg-transparent" v-bind:href="output.pagination.paging.end.link" v-bind:data-page="output.pagination.paging.end.number"><i class="fas fa-angle-double-right"></i></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    <div><a href="/post/list">목록으로</a></div>
  </div>
</template>