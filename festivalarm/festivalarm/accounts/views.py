from os import access
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
import requests
import json

from festivalapp.models import User, Post, Comment
from tokens import *
from my_secrets import CLIENT_ID, REDIRECT_URI, SECRET_KEY

from django.contrib import auth
# from django.contrib.auth.models import User


class KakaoSignInView(View):
    def get(self, request):
        kakao_auth_api = 'https://kauth.kakao.com/oauth/authorize?response_type=code'
        
        return redirect(
            f'{kakao_auth_api}&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}'
        )

# csrf 해제
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class KakaoSignInCallBackView(View):
    def post(self, request):
        # --- 인가코드 가져오기 --- #
        data = json.loads(request.body)
        code = data.get('code', None)

        # --- 카카오 토큰 받아오기 --- #
        token_request = requests.post(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&code={code}"
        )
        token_json = token_request.json()
        access_token = token_json.get("access_token")
        refresh_token = token_json.get("refresh_token")
        
        # --- 사용자 정보 받아오기 --- #
        profile_request = requests.post(
            "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"}
        )
        profile_json = profile_request.json()

        kakao_id = profile_json.get('id')
        nickname = profile_json.get("properties")["nickname"]
        email = profile_json.get("kakao_account")["email"]
        
        # --- JWT 토큰 발급하기 --- #
        payload_value = kakao_id             # kakao_id를 payload로
        payload = {"sub": payload_value}
        jwt_access_token = generate_token(payload, "access")
        jwt_refresh_token = generate_token(payload, "refresh")

        data = {
            "jwt_token": {
                "access_token": jwt_access_token,
                "refresh_token": jwt_refresh_token,
            }
        }

        # DB에 사용자 정보가 있는경우
        if User.objects.filter(kakao_id=kakao_id).exists():
            u = User.objects.get(kakao_id=kakao_id)
            u.email = email
            u.access_token = access_token
            u.refresh_token = refresh_token
            u.save()
        # 회원가입인 경우
        else:
            User(
                kakao_id=kakao_id,
                username = nickname,
                email = email,
                access_token = access_token,
                refresh_token = refresh_token,
            ).save()


        return JsonResponse(data)

# 로그아웃
@method_decorator(csrf_exempt, name='dispatch')
class KakaoLogoutView(View):
    def post(self, request, kakao_id):
        data = json.loads(request.body)
        jwt_access_token = data.get('jwt_token')['access_token']

        jwt_decode = decode_token(jwt_access_token)
        kakao_id = jwt_decode['sub']

        token_queryset = User.objects.filter(kakao_id=kakao_id).values('access_token')
        access_token = token_queryset[0]['access_token']
        
        logout_request = requests.post(
            "https://kapi.kakao.com/v1/user/logout", headers={"Authorization": f"Bearer {access_token}"}
        )
        logout_info = logout_request.json()

        return JsonResponse({"id" : logout_info , "status": 'logout'})



# 연결끊기
@method_decorator(csrf_exempt, name='dispatch')
class KakaoUnlinkView(View):
    def post(self, request, kakao_id):
        data = json.loads(request.body)
        jwt_access_token = data.get('jwt_token')['access_token']

        jwt_decode = decode_token(jwt_access_token)
        kakao_id = jwt_decode['sub']

        token_queryset = User.objects.filter(kakao_id=kakao_id).values('access_token')
        access_token = token_queryset[0]['access_token']
        
        unlink_request = requests.post(
            f"https://kapi.kakao.com/v1/user/unlink?targetarget_id_type={'kakao_id'}&target_id={kakao_id}", headers={"Authorization": f"Bearer {access_token}"}
        )
        unlink_response = unlink_request.json()
        
        return JsonResponse({"id" : unlink_response , "status": 'unlink'})



# --- 마이페이지 --- #       
@method_decorator(csrf_exempt, name='dispatch')
class KakaoUserProfileView(View):
    def get(self, request, kakao_id):
        data = json.loads(request.body)
        jwt_access_token = data.get('jwt_token')['access_token']

        jwt_decode = decode_token(jwt_access_token)
        kakao_id = jwt_decode['sub']

        # 유저의 모든 정보 #
        user_queryset = User.objects.filter(kakao_id=kakao_id)
        user_json = json.loads(serializers.serialize('json', user_queryset))

        # user_queryset에서 username 뽑아오기
        username = user_queryset.values('username')[0]['username']

        # Post중 User의 username으로 작성된 post 가져오기
        user_post_queryset = Post.objects.filter(author__username=username)
        user_post_json = json.loads(serializers.serialize('json', user_post_queryset))
        
        title = user_post_json.get("kakao_account")["email"]
        
        # Comment중 User의 username으로 작성된 comment 가져오기
        user_comment_queryset = Comment.objects.filter(author__username=username)
        user_comment_json = json.loads(serializers.serialize('json', user_comment_queryset))


        return JsonResponse({"user_profile" : user_json, 'user_post': user_post_json, 'user_comment': user_comment_json })


# --- access_token 기간 만료시 access/refresh token 갱신 --- #
class KaKaoTokenUpdateView(View):
    def get(self, request):
        data = json.loads(request.body)
        kakao_id = data.get('kakao_id', None)
        token_queryset = User.objects.filter(kakao_id=kakao_id).values('refresh_token')
        refresh_token = token_queryset[0]['refresh_token']

        token_request = requests.post(
            f"https://kauth.kakao.com/oauth/token?grant_type={'refresh_token'}&client_id={CLIENT_ID}&refresh_token={refresh_token}",
        )
        token_json = token_request.json()

        access_token = token_json.get("access_token")
        refresh_token = token_json.get("refresh_token")

        return JsonResponse({"access_token" : access_token, 'refresh_token': refresh_token})

