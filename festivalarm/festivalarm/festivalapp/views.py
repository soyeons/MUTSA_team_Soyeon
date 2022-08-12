from django.shortcuts import render,redirect
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from .models import OptionCount, User, Festival, Place, Post, Comment, Option,Profile
from .serializers import OptionCountSerializer, UserSerializer, FestivalSerializer, PlaceSerializer, PostSerializer, CommentSerializer, OptionSerializer,ProfileSerializer,PostCreateSerializer
from .forms import PostForm,CommentForm



#from festivalarm.festivalapp import serializers
# Create your views here. 

class FestivalsAPI(APIView):        # 페스티벌 전체목록
    def get(self,request):          # 정보가져오기
        festivals= Festival.objects.all()
        serializer = FestivalSerializer(festivals,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class FestivalAPI(APIView):        # 페스티벌 상세목록
    def get(self,request,fid):     # 정보가져오기
        festival= get_object_or_404(Festival,id=fid)
        serializer = FestivalSerializer(festival)
        return Response(serializer.data,status=status.HTTP_200_OK)

class PostsAPI(APIView):        # 게시글 전체목록
    def get(self,request):          # 정보가져오기
        posts= Post.objects.all()
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request): # request에 카테고리도 포함하여 포스트    # 넘겨줘야하는 값(festival_id, title, body, image, category)
        profile=get_object_or_404(Profile,user=request.user)
        festival=get_object_or_404(Festival,id=request.data.festival_id)
        serializer = PostSerializer(data= request.data,author=request.user,profile=profile,festival=festival,hits=0)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CategoryPostsAPI(APIView):           # 글 게시판별
    def get(self,request,cate):         # 글 목록 가져오기 (게시판별로)
        posts= Post.objects.filter(category=cate) # 게시판 카테고리 별로 필터링해서 가져오기
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class PostAPI(APIView):           # 글 상세
    def get(self,request,pid):         # 글 상세목록 가져오기 (id)
        post= get_object_or_404(Post,id=pid) 
        serializer = PostSerializer(post)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self, request, pid):# 글 수정
        post=get_object_or_404(Post,id=pid)
        serializer = PostSerializer(post, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pid):# 글 삭제
        post=get_object_or_404(Post,id=pid)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    
class CommentsAPI(APIView):#댓글 전체 127.0.0.1:8000/
    def get(self,request):          # 게시글에 적힌 댓글 전부 가져오기
        comments= Comment.objects.all()
        serializer = CommentSerializer(comments,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request): # 게시글에 댓글 작성   # 넘겨줘야하는 값(post_id, comment)
        profile=get_object_or_404(Profile,user=request.user)
        post=get_object_or_404(Post,id=request.data.post_id)
        serializer = CommentSerializer(data= request.data,author=request.user,profile=profile,post=post)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentAPI(APIView):# 댓글 상세
    def put(self, request, cid):# 댓글 수정
        comment=get_object_or_404(Comment,id=cid)
        serializer = CommentSerializer(comment, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, cid):# 댓글 삭제
        comment=get_object_or_404(Comment,id=cid)
        comment.delete()                                            
        return Response(status=status.HTTP_204_NO_CONTENT)    


    
class LikeAPI(APIView): 
    def post(self,request,fid):         # 페스티벌 좋아요 
        if request.user.is_authenticated:
            festival= get_object_or_404(Festival,id=fid) 
            if request.user in festival.likes.all():
               festival.likes.remove(request.user)
            else:
              festival.likes.add(request.user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
class OptionAPI(APIView):
    def get(self,request,fid):     # 페스티벌에 내가 입력한 후기 가져오기 fid 만 보내기
        festival= get_object_or_404(Festival,id=fid)
        serializer = Option.objects.filter(festival=festival,user=request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,fid): # 인자로 fid 받고 request에 옵션1~6포함   
        festival=get_object_or_404(Festival,id=fid)
        serializer = OptionSerializer(data= request.data,author=request.user,festival=festival)
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


    
class CountOptionAPI(APIView):
    def get(self,request,fid):     
        festival=get_object_or_404(Festival,id=fid)
        option_count= get_object_or_404(OptionCount,festival=festival)
        serializer = FestivalSerializer(option_count)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class MyPostAPI(APIView):
    def get(self,request):     
        myposts=Post.objects.filter(user=request.user)
        serializer = PostSerializer(myposts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class MyCommentAPI(APIView):
    def get(self,request):     
        mycomments=Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(mycomments,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class MyLikeAPI(APIView):
    def get(self,request):     
        user=request.user
        mylikes=user.like.all()
        serializer = CommentSerializer(mylikes,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class SearchPostTitleAPI(APIView):
    def get(self,request,search):       # search라는 매개변수로 검색할 내용을 받음
        posts=Post.objects.filter(title__contains = search) # __contains ==>__앞에 있는 속성안에 뒤에오는 내용이 포함된것을 필터링 
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
# class SearchPostNameAPI(APIView):
#     def get(self,request,search):       # search라는 매개변수로 검색할 내용을 받음
#         posts=Post.objects.filter(nickname__contains = search) #?? nickname 대신에 뭐가와야할까?
#         serializer = PostSerializer(posts,many=True)
#         return Response(serializer.data,status=status.HTTP_200_OK)
    

class SearchFestivalTitleAPI(APIView):
    def get(self,resquest,search):       # search라는 매개변수로 검색할 내용을 받음
        festivals=Festival.objects.filter(title__contains = search) 
        serializer = FestivalSerializer(festivals,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
#class SearchOptionAPI(APIView):
