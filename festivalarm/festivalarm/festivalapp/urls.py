from django.urls import path
from . import views

urlpatterns = [
    path('festivals/', views.FestivalsAPI.as_view()),
    path('festival/<int:fid>', views.FestivalAPI.as_view()),
    path('posts/', views.PostsAPI.as_view()),
    #path('posts/<str:cate>', views.CategoryPostsAPI.as_view()),
    #path('post/<int:pid>', views.PostAPI.as_view()),
]
