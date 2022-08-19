from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.core import serializers
import json

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import OptionCount, User, Festival, Place, Post, Comment, Option,Profile
from .serializers import OptionCountSerializer, UserSerializer, FestivalSerializer, PlaceSerializer, PostSerializer, CommentSerializer, OptionSerializer,ProfileSerializer,PostCreateSerializer, CommentCreateSerializer
from .forms import PostForm,CommentForm

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

import datetime
#from festivalarm.festivalapp import serializers
# Create your views here. 


class FestivalsAPI(APIView):        # 페스티벌 전체목록
    def get(self,request):          # 정보가져오기
        festivals= Festival.objects.all()
        serializer = FestivalSerializer(festivals,many=True)
        serializer = json.load(serializer)

        return Response(serializer.data,status=status.HTTP_200_OK)


class FestivalAPI(APIView):        # 페스티벌 상세목록
    def get(self,request,festival_id):     # 정보가져오기
        festival= get_object_or_404(Festival,id=festival_id)
        serializer = FestivalSerializer(festival)
        return Response(serializer.data,status=status.HTTP_200_OK)


# --- 게시글 전체 목록 --- #
# 백 : 작성자 이름으로 보내주기 (현재 작성자 pk값)
class PostList(APIView):
    def get(self,request):
        posts= Post.objects.all()
        serializer = PostSerializer(posts,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)

# --- 게시글 생성 --- #
# 프론트 : 게시글 만들 때 유저(kakao_id) & 어떤 게시글(festival_id) 보내줘
class PostCreate(APIView):
    @method_decorator(csrf_exempt, name='dispatch')
    def post(self, request):
        """
        data = json.loads(request.body)
        kakao_id = data.get('kakao_id', None)

        user_queryset = User.objects.filter(kakao_id=kakao_id)
        username = user_queryset.values('username')[0]['username']
        """
        serializer = PostCreateSerializer(data=request.data)

        # festival = Festival.objects.get(id=request.data['festival_id'])        
        festival = Festival.objects.get(id=1)        

        if serializer.is_valid():
            post = Post.objects.create(
                author = User.objects.get(username='준영'),    # 임시 user 추가
                title = request.data['title'],
                body = request.data['body'],
                hits = 0,
                festival = festival,
                category = request.data['category'],
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- 게시글 삭제 --- #
class PostDelete(generics.DestroyAPIView):
    @method_decorator(csrf_exempt, name='dispatch')
    def post(self, request, post_id):
        post = get_object_or_404(Post,pk=post_id)
        post.delete()

        return Response({"status" : 200})


# --- 게시글 상세목록 --- #
class PostDetail(APIView):
    def get(self, request, post_id): 
        # 게시글 조회
        post= get_object_or_404(Post,pk=post_id)
        serializer = PostSerializer(post)
        post_data = serializer.data
        # 해당 게시글의 댓글 조회
        comment_queryset = Comment.objects.filter(post_id=post_id)
        comment_data = json.loads(serializers.serialize('json', comment_queryset))
    
        return Response({"post":post_data, "comment":comment_data})

# --- 게시글 수정 --- #
# 백 : 구현해야됨
# 프론트 : 수정할 데이터 보내기 
class PostAPI(APIView):           # 글 상세
    def put(self, request, post_id):# 글 수정
        post=get_object_or_404(Post,id=post_id)
        serializer = PostSerializer(post, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- 게시글 카테고리 분류 --- #
class CategoryView(APIView):
    @method_decorator(csrf_exempt, name='dispatch')
    def get(self,request,category):
        posts_queryset= Post.objects.filter(category=category)
        category_post = json.loads(serializers.serialize('json', posts_queryset))

        return Response({"post":category_post})


# --- 댓글 작성 --- #
# 프론트 : 댓글 작성할 때 유저(kakao_id) & 작성날짜 및 시간(date) 보내줘
class CommentCreate(APIView):
    @method_decorator(csrf_exempt, name='dispatch')
    def post(self, request):
        """
        data = json.loads(request.body)
        kakao_id = data.get('kakao_id', None)

        user_queryset = User.objects.filter(kakao_id=kakao_id)
        username = user_queryset.values('username')[0]['username']
        """
        serializer = CommentCreateSerializer(data=request.data) 
        post= get_object_or_404(Post,id=request.data['post'])
        
        if serializer.is_valid():
            comment = Comment.objects.create(
                author = User.objects.get(username='준영'),    # 임시 user 추가
                post = post,
                comment = request.data['comment'],
                # date = request.data['date'],
            )
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- 댓글 삭제 --- #
class CommentDelete(generics.DestroyAPIView):
    @method_decorator(csrf_exempt, name='dispatch')
    def post(self, request, comment_id):
        comment = get_object_or_404(Comment,pk=comment_id)
        comment.delete()

        return Response({"status" : 200})


# --- 댓글 수정 --- #
# 백 : 구현해야됨
# 프론트 : 수정할 데이터 보내기
class CommentAPI(APIView):# 댓글 상세
    def put(self, request, comment_id):# 댓글 수정
        comment=get_object_or_404(Comment,id=comment_id)
        serializer = CommentSerializer(comment, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FestivalLike(APIView): # 127.0.0.1:8000/festivalapp/festival/<int:festiaval_id>/likes
    def post(self,request,festival_id):         # 페스티벌 좋아요 
        if request.user.is_authenticated:
            festival= get_object_or_404(Festival,id=festival_id) 
            if request.user in festival.likes.all():
               festival.likes.remove(request.user)
            else:
              festival.likes.add(request.user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class OptionAPI(APIView): # 127.0.0.1:8000/festivalapp/festival/<int:festiaval_id>/thema
    # def get(self,request,festival_id):     # 페스티벌에 내가 입력한 후기 가져오기 fid 만 보내기
    #     festival= get_object_or_404(Festival,id=festival_id)
    #     serializer = Option.objects.filter(festival=festival,user=request.user)
    #     return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,festival_id): # 인자로 fid 받고 request에 옵션1~6포함 + kakao_id   
        festival=get_object_or_404(Festival,id=festival_id)
        user=get_object_or_404(User,kakao_id=request.data.kakao_id)
        serializer = OptionSerializer(data= request.data,user=user,festival=festival)
        if serializer.is_valid():
            serializer.save()
            option_count=get_object_or_404(OptionCount,festival=festival)
            num=option_count.check_num
            countoption1 = (option_count.option1 * num + serializer.option1)/ (option_count.check_num +1)
            countoption3 = (option_count.option3 * num + serializer.option3)/ (option_count.check_num +1)
            countoption2 = (option_count.option2 * num + serializer.option2)/ (option_count.check_num +1)
            countoption4 = (option_count.option4 * num + serializer.option4)/ (option_count.check_num +1)
            countoption5 = (option_count.option5 * num + serializer.option5)/ (option_count.check_num +1)
            countoption6 = (option_count.option6 * num + serializer.option6)/ (option_count.check_num +1)
            num += 1
            countserializer=OptionCountSerializer(option_count,check_num=num,option1=countoption1,option2=countoption2,option3=countoption3,option4=countoption4,option5=countoption5,option6=countoption6)
            countserializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request,fid):#  인자로 fid 받음
        festival=get_object_or_404(Festival,id=fid)
        option=get_object_or_404(Option,festival=festival,user=request.user)
        
        option_count=get_object_or_404(OptionCount,festival=festival)
        num=option_count.check_num
        countoption1 = (option_count.option1 * num - option.option1)/ (option_count.check_num -1)
        countoption3 = (option_count.option3 * num - option.option3)/ (option_count.check_num -1)
        countoption2 = (option_count.option2 * num - option.option2)/ (option_count.check_num -1)
        countoption4 = (option_count.option4 * num - option.option4)/ (option_count.check_num -1)
        countoption5 = (option_count.option5 * num - option.option5)/ (option_count.check_num -1)
        countoption6 = (option_count.option6 * num - option.option6)/ (option_count.check_num -1)
        num -= 1
        countserializer=OptionCountSerializer(option_count,check_num=num,option1=countoption1,option2=countoption2,option3=countoption3,option4=countoption4,option5=countoption5,option6=countoption6)
        countserializer.save()
            
        option.delete()                                            
        return Response(status=status.HTTP_204_NO_CONTENT)    


class CountOptionAPI(APIView): #127.0.0.1:8000/festivalapp/festival/<int:festiaval_id>/total_thema
    def get(self,request,festival_id):     
        festival=get_object_or_404(Festival,id=festival_id)
        option_count= get_object_or_404(OptionCount,festival=festival)
        serializer = FestivalSerializer(option_count)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class SearchPostTitleAPI(APIView): # 127.0.0.1:8000/festivalapp/search/post/
    def get(self,request):       # search라는 매개변수로 검색할 내용을 받음 request.data 안에 search로 주기
        posts=Post.objects.filter(title__contains = request.data.search) # __contains ==>__앞에 있는 속성안에 뒤에오는 내용이 포함된것을 필터링 
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
# class SearchPostNameAPI(APIview):
#     def get(self,request,search):       # search라는 매개변수로 검색할 내용을 받음
#         posts=Post.objects.filter(nickname__contains = search) #?? nickname 대신에 뭐가와야할까?
#         serializer = PostSerializer(posts,many=True)
#         return Response(serializer.data,status=status.HTTP_200_OK)
    

class SearchFestivalTitleAPI(APIView):
    def get(self,request):       # search라는 매개변수로 검색할 내용을 받음 request.data 안에 search로 주기
        festivals=Festival.objects.filter(title__contains =request.data.search) 
        serializer = FestivalSerializer(festivals,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
#class SearchOptionAPI(APIview):
