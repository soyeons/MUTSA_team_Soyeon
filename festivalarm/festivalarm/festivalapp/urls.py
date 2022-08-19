from django.urls import path
from . import views

urlpatterns = [
    path('festival/', views.FestivalsAPI.as_view()),                    # 페스티벌 list
    path('festival/<int:festival_id>/', views.FestivalAPI.as_view()),    # 페스티벌 detail
    path('festival/<int:festival_id>/like/', views.FestivalLike.as_view()),    # 페스티벌 좋아요

    path('festival/<int:festival_id>/thema', views.OptionAPI.as_view()),
    path('festival/<int:festival_id>/total_thema', views.CountOptionAPI.as_view()),
    
    path('category/<str:category>/', views.CategoryView.as_view()),             # 카테고리별 게시글
    
    path('post/', views.PostList.as_view()),                             # 게시글 list
    path('post/create/', views.PostCreate.as_view()),                    # 게시글 작성
    path('post/<int:post_id>/', views.PostDetail.as_view()),             # 게시글 detail
    path('post/<int:post_id>/delete/', views.PostDelete.as_view()),       # 게시글 삭제

    path('comment/create/', views.CommentCreate.as_view()),                     # 댓글 작성
    path('comment/<int:comment_id>/delete/', views.CommentDelete.as_view()),    # 댓글 삭제

    path('search/post/', views.SearchPostTitleAPI.as_view()),
    path('search/festival/', views.SearchFestivalTitleAPI.as_view()),

    

]